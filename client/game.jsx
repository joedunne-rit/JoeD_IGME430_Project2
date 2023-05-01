const helper = require('./helper.js');
const React = require('react');
const ReactDOM = require('react-dom');
const socket = io();

let image;

const GameBoard = (props) => {
    return(
        <div id='gameboard'>
            <img class='tile' src='/assets/img/white.png' alt=''></img>
            <img class='tile' src='/assets/img/grey.png' alt=''></img>
            <img class='tile' src='/assets/img/white.png' alt=''></img>
            <img class='tile' src='/assets/img/grey.png' alt=''></img>
            <img class='tile' src='/assets/img/grey.png' alt=''></img>
            <img class='tile' src='/assets/img/white.png' alt=''></img>
            <img class='tile' src='/assets/img/grey.png' alt=''></img>
            <img class='tile' src='/assets/img/white.png' alt=''></img>
            <img class='tile' src='/assets/img/white.png' alt=''></img>
            <img class='tile' src='/assets/img/grey.png' alt=''></img>
            <img class='tile' src='/assets/img/white.png' alt=''></img>
            <img class='tile' src='/assets/img/grey.png' alt=''></img>
            <img class='tile' src='/assets/img/grey.png' alt=''></img>
            <img class='tile' src='/assets/img/white.png' alt=''></img>
            <img class='tile' src='/assets/img/grey.png' alt=''></img>
            <img class='tile' src='/assets/img/white.png' alt=''></img>
        </div>
    );
};

const moveInput = (e, direction) => {
    e.preventDefault();
    const id = 'defaultid';
    const info = {id, direction}
    socket.emit('move', info)
}

const Controls = (props) => {
    return(
        <div id='controller'>
            <img class='control' src='/assets/img/up.png' alt='' onClick={(e) => moveInput(e, 0)}></img>
            <img class='control' src='/assets/img/left.png' alt='' onClick={(e) => moveInput(e, 1)}></img>
            <img class='control' src='/assets/img/right.png' alt='' onClick={(e) => moveInput(e, 2)}></img>
            <img class='control' src='/assets/img/down.png' alt='' onClick={(e) => moveInput(e, 3)}></img>
        </div>
    );
};

const openGame = async () => {
    const response = await fetch('/getEquipped');
    const data = await response.json();
    const image = data.item[0].equipped;
    const id = 'defaultid';
    const info = {image, id}
    socket.emit('add', info);
}

const init = () => {
    ReactDOM.render(
        <GameBoard />,
        document.getElementById('gameWindow')
    );
    ReactDOM.render(
        <Controls />,
        document.getElementById('controls')
    );

    openGame();
}

window.onload = init;