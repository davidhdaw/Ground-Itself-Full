import './Nav.scss'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { IconButton, Menu, MenuItem } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';

import { useEffect, useState } from 'react'
import HowToPlay from './HowToPlay';

function Nav({game, setGame, socket, setUsernameSelected}) {
  useEffect(() => {
    console.log(game.phase);
  },[game])

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [rulesModal, setRulesModal] = useState(false)
  const modeOpen = Boolean(anchorEl);
  const navigate = useNavigate()

  const openModal = () => {
    setRulesModal(true)
  }

  const closeModal = () => {
    setRulesModal(false)
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const disconnectGame = () => {
    //send signal 
    //remove from room
    //Set player to disconnected
    handleClose()
    socket.emit('leave_game', game.id)
    //erase local storage gameID
    localStorage.removeItem('gameID')
    localStorage.removeItem('password')
    setGame({phase: 0})
    navigate("/")
  }

  const disconnectUser = () => {
    game.id && socket.emit('leave_game', game.id)
    socket.disconnect()
    localStorage.removeItem('gameID')
    localStorage.removeItem('userID')
    localStorage.removeItem('password')
    localStorage.removeItem('sessionID')
    setUsernameSelected(false)
    handleClose()
    setGame({phase: 0})
    navigate("/")
  }

    return (
      <section className="Nav">
        <div className="nav-cont">
        <section className="gameInfo">
          {
            game.location &&
            <div className='infoContainer'>
              <p className='infoLabel'>GAME LOCATION</p>
              <p className='infoData'>{game.location}</p>
            </div>
          }
          {
            game.playLength &&
            <div className='infoContainer'>
              <p className='infoLabel'>CYCLE LENGTH</p>
              <p className='infoData'>{game.playLength}</p>
            </div>
          }
          {
            game.phase!== 0 &&
            <div className='infoContainer'>
              <p className='infoLabel'>GAME PHASE</p>
              <p className='infoData'>{game.phase}</p>
            </div>
          }
          {
            (game.phase === 3 || game.phase === 4) &&
            <div className='infoContainer'>
              <p className='infoLabel'>CURRENT TURN</p>
              <p className='infoData'>{game.players[0].username}</p>
            </div>
          }
          {
            game.phase === 3 &&
            <div className='infoContainer'>
              <p className='infoLabel'>CURRENT CYCLE</p>
              <p className='infoData'>{game.cycle}</p>
            </div>
          }
        </section>
        <section className='userInfo'>
            <p className="howTo" onClick={openModal}>How to Play</p>
            {socket.auth && <p>Username: {socket.username}</p>}
            <IconButton 
              aria-label="settings"
              size='medium' 
              id="settings-positioned-button"
              aria-controls={modeOpen ? 'settings-positioned-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={modeOpen ? 'true' : undefined}
              onClick={handleClick}
            >
              <MenuIcon fontSize='medium' />
            </IconButton>
        <Menu
        id="settings-positioned-menu"
        aria-labelledby="settings-positioned-button"
        anchorEl={anchorEl}
        open={modeOpen}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={disconnectUser}>Log Out</MenuItem>
        {game.id && <MenuItem onClick={disconnectGame}>Exit Game</MenuItem>}
      </Menu>
        </section>    
        </div>
        {rulesModal && <HowToPlay setRulesModal={setRulesModal}/>}
        {rulesModal && <div className='modalBackground' onClick={closeModal}></div>}
      </section>
    );
  }


export default Nav