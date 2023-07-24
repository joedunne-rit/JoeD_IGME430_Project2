const React = require('react');
const ReactDOM = require('react-dom');
const socket = io();

let id;

//React component containing game display
const GameBoard = (props) => {
    let tiles = [];

    //As a default, return basic tile layout
    if (props.playerList === undefined){
        return (
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
        )
    }

    //When playerList is given, runs through each individual tile to see what to render
    //playerCheck helps by ensuring only 1 player is rendered per tile
    let playerCheck = false;
    for (let i = 0; i < 4; i++){
        for (let j = 0; j < 4; j++){
            //If someone in playerList matches current coordinates, render that player
            for (let player of props.playerList){
                if (player.x === j && player.y === i && !playerCheck)
                {
                    //add image of player character
                    tiles.push((<img class='tile' src={player.image} alt=''></img>));
                    playerCheck = true;
                }
            }
            //If no player is on current coordinate, render a default tile
            //Color of tile is dependent on coordinates
            if (!playerCheck) {
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
            playerCheck = false;
        }
    }

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
    const info = {id, direction}
    socket.emit('move', info)
}

//React component containing player controls
const Controls = (props) => {
    return(
        <div id='controller'>
            <img class='control' id="up" src='/assets/img/up.png' alt='' onClick={(e) => moveInput(e, 0)}></img>
            <img class='control' id="left" src='/assets/img/left.png' alt='' onClick={(e) => moveInput(e, 1)}></img>
            <img class='control' id="right" src='/assets/img/right.png' alt='' onClick={(e) => moveInput(e, 2)}></img>
            <img class='control' id="down" src='/assets/img/down.png' alt='' onClick={(e) => moveInput(e, 3)}></img>
        </div>
    );
};

//Rerenders game display using new player data
const updateDisplay = (playerList) => {
    ReactDOM.render(
        <GameBoard playerList={playerList}/>,
        document.getElementById('gameWindow')
    )
}

//When page loads, gets user's equipped appearance form database & stores it on client
//Afterwards, sends event notifying server that they have joined, including their appearance and id
const openGame = async () => {
    const response = await fetch('/getEquipped');
    const data = await response.json();
    const image = data.item[0].equipped;
    const userData = await fetch('/getID');
    const temp = await userData.json();
    const newID = temp.id;
    id = newID;
    const info = {image, id}
    socket.on('update', (playerList) => updateDisplay(playerList))
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