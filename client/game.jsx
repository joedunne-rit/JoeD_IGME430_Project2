const helper = require('./helper.js');
const React = require('react');
const ReactDOM = require('react-dom');

const GameBoard = (props) => {
    return(
        <div>This is where the game will appear</div>
    );
};

const Controls = (props) => {
    return(
        <div>This is where controls will appear</div>
    );
};

const init = () => {
    ReactDOM.render(
        <GameBoard />,
        document.getElementById('gameWindow')
    );
    ReactDOM.render(
        <Controls />,
        document.getElementById('controls')
    );
}

window.onload = init;