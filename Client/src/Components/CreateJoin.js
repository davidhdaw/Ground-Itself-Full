import './CreateJoin.css'
import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import GameList from "./GameList";

function CreateJoin({setGame, socket, games}) {
    const navigate = useNavigate();
    const params = useParams();

    const gameTemplate = {
        location: '',
        password: '',
        roomCreator: '',
        playLength: '',
        phase: 1,
        establishingOptions: [
          "What was this place in the past? How long ago was that?",
          "What was the greatest moment in this place's history? (An innovation? A discovery? A revolution? A new sapling? The emergence of a cycle of cicadas?)",
          "If there are inhabitants, what are the visions for the future that they hold?",
          "Who lives here? What is an average person like in this place? What do they look like? What do they wear? -OR- Describe the flora and fauna. What is the landscape like? What animals and plants call it home?",
          "Who or what (a person, landmark, society) has been in this place the longest? How did they come to be here?",
          "What stories are told in or about this place? Does it have legends or myths? Does it have religion?",
          "What is this placed named or called? Who named it, and for what reason?",
          "What is valued in this place? What is it known to have in excess?",
          "Who or what is in power here? (Is it a ruler? An apex predator? A series of laws that govern society? The weather?)",
          "What are the threats to this place? Are these threats to the materiality of the place, or the people that live in it?",
          "What was the greatest tragedy in this place’s past? How is it remembered?",
          "If there are multiple people who live here, what are they divided on? What are the points of contention that are fought over? -OR- If there are not multiple people, what resources do the plants, animals, or visitors to our place vie for?"
        ],
        establishingDrawn: [],
        questions: [
          ['What re the plants like in our place? The rocks? The Soil?', 'It is time to plant "the seedlings." What are the seedlings and where are they planted? What is the harvest that is hoped for?', 'The harvest day has arrived. What is being harvested, for what purpose, and how is it being stored?', 'Sometimes change is so slow that the world shifts unnoticed. What is the groundswell that has been taking place so quietly?'],
          ['Name a monument, marker, statue, or other physicalized memory that exists in our place. What does it mark?', 'What is produced in our place right now, and how does it make its way into the wider world? (Is this export a physical good? Knowledge? Something else?)', 'A major modification is made to the enviroment of our place? What is this change? Was it made my someone or did is simply come to pass?', 'A breakthrough moment (in technology, arts, politics, philosophy, or daily life) tips the scales of a power balance. What was this breakthrough, and how does it play our socially?'],
          ['What do people listen to and perform here? What is considered folk art?', 'What do people in our place argue about for fun (whether at the bar, in the square, or in other social spaces?)', 'A new style, fad, or devotion sweeps our place. What is it? Who cares about it?', 'A bad decision leaves marks on the land. What was this decision, and what trace does it leave?'],
          ['What is the primary building or natural material in our place?', '"The bar" opens their doors to all. What is the bar and who is a regular there? - OR - "The church" changes a core mandate. What is the church, and what about their worldview has shifted?', 'Something new has been constructed, and stands where there was once something else. What was once there, and what has replaced it?', 'A creative or artistic achievement is unveiled. What is it? How is it received?'],
          ['What are the stars like in our place? The sky? The weather?', 'What secrets are kept in our place? Why are they kept? By who and from whom?', 'There is a union. Is it political? Emotional? Marital? What is newly aligned?', 'Someone is found guilty and is punished. What did they do, and what is the punishment?'],
          ['What is the most horrible thing in or about our place', 'Someone returns to our place changed. Who are they, and how are they different?', 'Something small but noticable is destroyed. What was it, and who or what destroyed it.', 'A natural or architechtural disaster strikes with no warning, leaving something in ruins. What was this disaster?'],
          ['What is the most beautiful thing in or about our place', 'Invent a specific street, building, corner, overlook, or meeting-place. What is it called officially, and what do the locals call it?', 'A forgotten aspect to our place is recovered. What is it? A corner? A basement? A hidden garden?', 'A previous alliance shows cracks. There is bickering and infighting. Who is fighting? What are they fighting about'],
          ['What does success look like in our place? What do the inhabitants want?', 'The news is dramatic, and tensions are high. What is the news? How is this reaction physicalized in space?', 'Someone (or a group of people) comes to our place. Who are they, and why have they come? Do they bring anything with them?', 'The future feels unsure, and the talk of our place has turned to preperations. What preparations are being taken and for what?'],
          ['What do people eat and drink here? What is considered traditional?', 'Someone (or a group) leaves our place. Who are they, and why are they going? What do they take with them and what do they leave behind?', 'There si planning going into a celebration. Is it a festival, holidal, or remembrance? What is it celebrating?', 'New information about a past event is uncovered, casting it in a dramatically different light. What was found and how does it change how the past is perceived?']
        ],
        chat: [],
        questionsDrawn: [],
        tenFlag: false,
        cycle: 1
      }

    const [form, setForm] = useState('choosing')
    const [location, setLocation] = useState('')
    const [password, setPassword] = useState('')

    const createGame = () => {
        let newGame = {...gameTemplate, 
        location: location,
        password: password,
        roomCreator: socket.username
        }
        socket.emit("make_room", newGame)
    }

    const gameCheck = () => {
      socket.emit('game_check')
      setForm('join')
    }


      socket.on('game_update', (data) => {
        setGame(data)
        console.log(data)
        if (data.id && params.id !== data.id) {
          navigate("/" + data.id)
        }
      })

    return (
      <div className='CreateJoin'>
        {form === 'choosing' && 
        <div className='choosingForm'>
            <button onClick={gameCheck}>Join Existing Game</button> 
            <button onClick={() => setForm('create')}>Create New Game</button>
        </div>
        }
        {form === 'join' && 
          <GameList games={games} setForm={setForm} />
        }
        {/* {form === 'joinroom' &&
        <div className='joinform'>
            <p>Enter Game Location:</p>
            <input type='text' 
            className='locationInput' 
            value={location} 
            onChange={e => setLocation(e.target.value)}
            ></input>
            <p>Game Password (Can Be Left Blank):</p>
            <input type='text' 
            className='passwordInput' 
            value={password} 
            onChange={e => setPassword(e.target.value)}
            ></input>
            <hr></hr>
            <button onClick={createGame}>Create Game</button>


        </div>

        } */}

        {form === 'create' && 
        <div className='createForm'>
            <p>Enter Game Location:</p>
            <input type='text' 
            className='locationInput' 
            value={location} 
            onChange={e => setLocation(e.target.value)}
            ></input>
            <p>Game Password (Can Be Left Blank):</p>
            <input type='text' 
            className='passwordInput' 
            value={password} 
            onChange={e => setPassword(e.target.value)}
            ></input>
            <hr></hr>
            <button onClick={createGame}>Create Game</button>
        </div>
        }
      </div>
    );
  }


export default CreateJoin