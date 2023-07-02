const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io')
const server = http.createServer(app)
const cors = require('cors')
const crypto = require('crypto')
app.use(cors());

let games = {}
let completedGames = {}

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000'
    },
})

const randomId = () => crypto.randomBytes(8).toString('hex')
const { InMemorySessionStore } = require('./sessionStore')
const sessionStore = new InMemorySessionStore();

io.use((socket, next) => {
    const sessionID = socket.handshake.auth.sessionID;
    if (sessionID) {
        const session = sessionStore.findSession(sessionID)
        console.log(session)
        if (session) {
            socket.sessionID = sessionID;
            socket.userID = session.userID;
            socket.username = session.username;
            return next();
        }
    }
    const username = socket.handshake.auth.username;
    if (!username) {
      return next(new Error("invalid username"));
    }
    socket.sessionID = randomId();
    socket.userID = randomId();
    socket.username = username;
    next();
})


io.on('connection', (socket) => {
    sessionStore.saveSession(socket.sessionID, {
        userID: socket.userID,
        username: socket.username,
        connected: true,
      });
    socket.emit('session', {
        sessionID: socket.sessionID,
        userID: socket.userID,
        username: socket.username
    })
    socket.emit('games_list', games)
    console.log('User Connected ' + socket.username)

    socket.on('disconnecting', () => {
        console.log(socket.rooms)
        socket.rooms.forEach(room => {
            if (games[room]) {
                const index = games[room].players.findIndex(player => player.userID === socket.userID)
                games[room].players[index].connected = false
                const rollIt = () => {
                    if (!games[room].players[0].connected) {
                        games[room].players.push(games[room].players.shift())
                        rollIt()
                    }
                }
                rollIt()
                io.to(room).emit("game_update", games[room])
            }
        })
    })

    socket.on('join_game', (joinForm) => {
      const gameToJoin = games[joinForm.id]
      const index = gameToJoin.players.findIndex(player => player.userID === socket.userID)
      console.log(index)
      if (!games[joinForm.id]) {
        return new Error("no matching game")
      }
      if (games[joinForm.id] && joinForm.password === gameToJoin.password) {
        socket.join(joinForm.id)
        if (index === -1) {
            const playerObject = {
                connected: true,
                userID: socket.userID,
                username: socket.username
            }
            games[joinForm.id].players.push(playerObject)
        } else if(gameToJoin.players[index].connected === false) {
            console.log('firing?')
            gameToJoin.players[index].connected = true
        }
        io.to(joinForm.id).emit("game_update", gameToJoin)
      } else {
        return new Error("password match")
      }
    })


    socket.on('find_game', (id) => {
        const game = games[id]
        socket.emit('game_update', game)
    })

    socket.on('send_message', (data) => {
        let messageObject = {
            user: socket.username,
            message: data.message
        }
        games[data.id].chat.push(messageObject)
        io.to(data.id).emit("game_update", games[id])
    })

    socket.on('game_check', () => {
       socket.emit('games_list', games)
    })


    socket.on('draw_establishing', (id) => {
        let thisGame = games[id]
        const randomIndex = [Math.floor(Math.random()*(thisGame.establishingOptions.length))]
        thisGame.establishingDrawn.push(thisGame.establishingOptions[randomIndex])
        thisGame.establishingOptions.splice(randomIndex, 1)
        games[id] = thisGame
        io.to(thisGame.id).emit('game_update', thisGame)
    })

    socket.on('reconnect', (id) => {
        if (games[id]) {
            const index = games[id].players.findIndex(player => player.userID === socket.userID)
            games[id].players[index].connected = true
            socket.join(id)
        }
    })

    socket.on('leave_game', (id) => {
        socket.leave(id)        
        if (games[id]) {
            const index = games[id].players.findIndex(player => player.userID === socket.userID)
            games[id].players[index].connected = false
            const rollIt = () => {
                if (!games[id].players[0].connected) {
                    games[id].players.push(games[id].players.shift())
                    rollIt()
                }
            }
            rollIt()
        }
        socket.emit('games_list', games)
    })


    socket.on('focused_situation', (id) => {
        let thisGame = games[id]
        thisGame.focusedFlag = true
        games[id] = thisGame
        io.to(id).emit('game_update', thisGame)
    })

    socket.on('draw_question', (id) => {
        let thisGame = games[id]
        thisGame.tenFlag = false
        thisGame.focusedFlag = false

        const getQuestion = () => {
            const randomIndex = Math.floor(Math.random()*10)
            console.log(randomIndex)
            if (randomIndex === 9) {
                thisGame.cycle++
                if (thisGame.cycle === 5) {
                    thisGame.phase = 4
                }
                thisGame.roll = Math.ceil(Math.random()*6)
                thisGame.tenFlag = true
            } else if (thisGame.questions[randomIndex].length !== 0) {
                thisGame.questionsDrawn.push(thisGame.questions[randomIndex].shift())
            } else {
                getQuestion()
            }
        }    
        getQuestion()
        thisGame.players.push(thisGame.players.shift())

        const rollIt = () => {
            if (!thisGame.players[0].connected) {
                thisGame.players.push(thisGame.players.shift())
                rollIt()
            }
        }
        rollIt()
        games[id] = thisGame
        io.to(thisGame.id).emit('game_update', thisGame)
    })

    socket.on('update_game', (gameObject) => {
        games[id] = gameObject
        io.to(gameObject.id).emit('game_update', gameObject)
    })

    socket.on('end_game', (gameId) => {
        const endingGame = games[gameId]
        io.to(gameId).emit('reset')
        io.in(gameId).disconnectSockets()
        endingGame.players.forEach(player => {
            player.connected = false
        })
        completedGames[gameId] = endingGame
        delete games[gameId]
        //game object is put into complete games
        //game object is removed from games object

    })

    socket.on('10_phase', (gameID) => {
        io.to(gameID).emit('phase_10')
    })

    socket.on('generate_time', (id) => {
        const timeLengths = ["Days", "Weeks", "Years", "Decades", "Centuries", "Millenia"]
        const newTime = timeLengths[Math.floor(Math.random()*6)]
        io.to(id).emit("time_update", newTime)
    })

    socket.on('make_room', (data) => {
        id = crypto.randomUUID()
        socket.join(id)
        data.id = id
        socket.username = data.roomCreator
        data.players = []
        const playerObject = {
            connected: true,
            userID: socket.userID,
            username: socket.username
        }
        data.players.push(playerObject)
        games[id] = data
        socket.emit('store_game', {
            gameID: id,
            password: data.password
        } )
        io.to(id).emit("game_update", games[id])
    })
})

server.listen(3001, () => {
    console.log('server is running!')
})