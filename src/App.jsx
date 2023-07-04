import React from 'react';
import PropTypes from 'prop-types';

function App({ onStart, onStop }) {
    return (
        <div id="app">
            <button id="startButton" onClick={onStart}>Start</button>
            <button id="stopButton" onClick={onStop}>Stop</button>
        </div>
    );
}

App.propTypes = {
    onStart: PropTypes.func.isRequired,
    onStop: PropTypes.func.isRequired,
};

export default App;
