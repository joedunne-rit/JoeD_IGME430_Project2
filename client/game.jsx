const helper = require('./helper.js');
const React = require('react');
const ReactDOM = require('react-dom');
const socket = io();

let image;
let tile1 = '/assets/img/white.png';
let tile2 = '/assets/img/grey.png';

const GameBoard = (props) => {
    let tiles = [];

    for (let i = 0; i < 4; i++){
        for (let j = 0; j < 4; j++){
            for (let player of props.playerList){
                if (player.x === i && player.y === j)
                {
                    //add image of player character
                    tiles.push((<img class='tile' src={player.image} alt=''></img>))
                }
                else {
                    //add default tile image (white or grey, depending on space)
                    if(i%2 === 0){
                        if(j%2 === 0){
                            tiles.push((<img class='tile' src='/assets/img/white.png' alt=''></img>));
                        } else {
                            tiles.push((<img class='tile' src='/assets/img/grey.png' alt=''></img>));
                        }
                    } else {
                        if(j%2 === 0){
                            tiles.push((<img class='tile' src='/assets/img/grey.png' alt=''></img>));
                        } else {
                            tiles.push((<img class='tile' src='/assets/img/white.png' alt=''></img>));
                        }
                    }
                }
            }
        }
    }

    /*<img class='tile' src='/assets/img/white.png' alt=''></img>
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
            <img class='tile' src='/assets/img/white.png' alt=''></img>*/

    return(
        <div id='gameboard'>
            {tiles}
        </div>
    );
};

//Function that is tied to directional images
//When an image is clicked, sends a respective direction input to server
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

const updateDisplay = () => {
    ReactDOM.render(
        <GameBoard />,
        document.getElementById('gameWindow')
    )
}

//When page loads, gets user's equipped appearance form database & stores it on client
//Afterwards, sends event notifying server that they have joined
const openGame = async () => {
    const response = await fetch('/getEquipped');
    const data = await response.json();
    const image = data.item[0].equipped;
    //Need to retrieve session info from server
    //That means send request to server then come back here w/ info to place in id
    const id = 'defaultid';
    const info = {image, id}
    socket.on('update', updateDisplay)
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