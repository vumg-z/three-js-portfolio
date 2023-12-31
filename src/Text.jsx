import React from 'react';
import { AiFillGithub } from 'react-icons/ai';
import './Text.css';

function Text() {
  return (
    <div id="text">
      <div className="text-card text-white text-center p-5 space-y-4 font-plex-mono">
        <h2 className="text-3xl font-regular">Victor Mendoza</h2>
        
        <a href="https://github.com/vumg-z" target="_blank" rel="noopener noreferrer" className="github-link">
          <AiFillGithub className="github-icon" />
        </a>

        <p className="font-extralight">victormendoza@verlo.co</p>

        <p className="font-extralight">
          Front-end developer specialized in interactive websites, <br /> react, 3D visualization, and team leadership.
        </p>

        <div className="flex items-center justify-center space-x-2"></div>
      </div>
    </div>
  );
}

export default Text;
