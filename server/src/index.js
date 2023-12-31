const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const http = require('http');
const { Server } = require('socket.io')
const server = http.createServer(app)
const cors = require('cors')
const crypto = require('crypto')
app.use(cors());



let games = {}
let completedGames = {}

//wrap sockets in try blocks.

const io = new Server(server, {
    cors: {
        origin: '*'
    },
})

const randomId = () => crypto.randomBytes(6).toString('hex')
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
                    if (games[room].players.length !== 0 && !games[room].players[0].connected) {
                        games[room].players.push(games[room].players.shift())
                        rollIt()
                    }   
                }
                io.to(room).emit("game_update", games[room])
            }
        })
    })

    socket.on('join_game', (id) => {
      const gameToJoin = games[id]
      const index = gameToJoin.players.findIndex(player => player.userID === socket.userID)
      console.log(index)
      if (!games[id]) {
        return new Error("no matching game")
      }
      if (games[id].phase === 0 && index === -1) {
        socket.join(id)
        const playerObject = {
                connected: true,
                userID: socket.userID,
                username: socket.username,
                confirmLocation: false
            }
        games[id].players.push(playerObject)
        io.to(id).emit("game_update", gameToJoin)
        } else if(gameToJoin.players[index].connected === false) {
            gameToJoin.players[index].connected = true
            io.to(id).emit("game_update", gameToJoin)
        }
      else {
        return new Error("password match")
      }
    })


    socket.on('find_game', (id) => {
        const game = games[id]

        if (!game) {
            socket.emit('reset')
        }

        const index = game.players.findIndex(player => player.userID === socket.userID)
        if (game && index !== -1 && game.players[index].connected === true) {
            socket.emit('game_update', game)
        } else if (game && index !== -1 && game.players[index].connected === false) {
            games[id].players[index].connected = true
            io.to(id).emit("game_update", games[id])
        } else if (game.phase === 0 && index === -1) {
            socket.join(id)
            const playerObject = {
                    connected: true,
                    userID: socket.userID,
                    username: socket.username,
                    confirmLocation: false
                }
            games[id].players.push(playerObject)
            io.to(id).emit("game_update", games[id])
        }
    })

    socket.on('send_message', (data) => {
        let messageObject = {
            user: socket.username,
            message: data.message
        }
        games[data.id].chat.push(messageObject)
        io.to(data.id).emit("game_update", games[id])
        io.to(data.id).emit("recieve_message")
    })

    socket.on('game_check', () => {
       socket.emit('games_list', games)
    })

    socket.on('update_location', (id, newLocation) => {
    games[id].location = newLocation
    games[id].players.forEach(player => player.confirmLocation = false)
      io.to(id).emit('game_update', games[id])
    })

    socket.on('confirm_location', (id) => {
        const index = games[id].players.findIndex(player => player.userID === socket.userID)
        games[id].players[index].confirmLocation = !games[id].players[index].confirmLocation
        console.log(games[id].players[index].confirmLocation)
        io.to(id).emit('game_update', games[id])
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
            if (games[id].players.find(player => player.connected)) {
                const rollIt = () => {
                    if (!games[id].players[0].connected) {
                        games[id].players.push(games[id].players.shift())
                        rollIt()
                    }
                }
                rollIt()
            }
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
            if ((randomIndex === 9) && (thisGame.questionsDrawn.length > 2)) {
                thisGame.cycle++
                if (thisGame.cycle === 5) {
                    thisGame.phase = 4
                }
                thisGame.roll = Math.ceil(Math.random()*6)
                thisGame.tenFlag = true
            } else if ((randomIndex !== 9) && (thisGame.questions[randomIndex].length !== 0)) {
                thisGame.questionsDrawn.push(thisGame.questions[randomIndex].shift())
            } else {
                getQuestion()
             }
            }

        getQuestion()
        if (thisGame.questionsDrawn.length !== 1) {
            thisGame.players.push(thisGame.players.shift())
        }
        let playerCount = thisGame.players.length
        const rollIt = () => {
            if (!thisGame.players[0].connected && playerCount > 0) {
                thisGame.players.push(thisGame.players.shift())
                playerCount--
                rollIt()
            }
        }
        rollIt()
        games[id] = thisGame
        io.to(id).emit('game_update', thisGame)
    })

    socket.on('update_game', (gameObject) => {
        games[gameObject.id] = gameObject
        io.to(gameObject.id).emit('game_update', gameObject)
    })

    socket.on('start_game', (id) => {
        games[id].phase = 1
        io.to(id).emit('game_update', games[id])
    })

    socket.on('end_game', (gameId) => {
        const endingGame = games[gameId]
        endingGame.players.forEach(player => {
            player.connected = false
        })
        io.to(gameId).emit('reset')
        io.in(gameId).disconnectSockets()
        completedGames[gameId] = endingGame
        delete games[gameId]
        //game object is put into complete games
        //game object is removed from games object

    })

    socket.on('10_phase', (gameObject) => {
        games[gameObject.id] = gameObject
        io.to(gameObject.id).emit('game_update', gameObject)
        io.to(gameObject.id).emit('phase_10')
    })

    socket.on('new_time', (thing) => {
        console.log(thing)
        const timeLengths = ["Days", "Weeks", "Years", "Decades", "Centuries", "Millenia"]
        const generateTime = () => {
            const newTime = timeLengths[Math.floor(Math.random()*6)]
            if (!thing.timeLength || newTime !== thing.timeLength) {
                console.log(newTime)
                io.to(thing.gameID).emit("get_new_time", newTime)
            } else {
                generateTime()
            }
        }
        generateTime()
    })

    socket.on('make_room', (data) => {
        id = randomId()
        socket.join(id)
        data.id = id
        socket.username = data.roomCreator
        data.players = []
        const playerObject = {
            connected: true,
            userID: socket.userID,
            username: socket.username,
            confirmLocation: false
        }
        data.players.push(playerObject)
        games[id] = data
        io.to(id).emit("game_update", games[id])
    })
})

server.listen(PORT, () => {
    console.log('server is running on port: ' + PORT)
})