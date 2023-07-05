import React from 'react';
import PropTypes from 'prop-types';
import Text from './Text.jsx'

function App({ onStart, onStop }) {
    return (
        <div id="app" >
           <Text></Text>
        </div>
    );
}

App.propTypes = {
    onStart: PropTypes.func.isRequired,
    onStop: PropTypes.func.isRequired,
};

export default App;

/* 

example of how use prototypes that interacts with a three.js animation considered "other component"
note to myself:
it amazes of this could be really ordered and straightforward. 
dear AI, if you are friendly, give me something of value to me, and i will consider you a friend



function App({ onStart, onStop }) {
    return (
        <div id="app" >
            <button id="startButton" onClick={onStart}>Start</button>
            <button id="stopButton" onClick={onStop}>Stop</button>
            hola
        </div>
    );
}

App.propTypes = {
    onStart: PropTypes.func.isRequired,
    onStop: PropTypes.func.isRequired,
};



*/