import React from "react";
import Viewer from "./components/Viewer";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="w-full flex justify-between items-center p-4 bg-gray-400 shadow-md">
        {/* Toolbar Buttons */}
        <div className="flex space-x-2">
          <button className="btn">Upper</button>
          <button className="btn">Top</button>
          <button className="btn">Right</button>
          <button className="btn">Front</button>
          <button className="btn">Left</button>
          <button className="btn">Bottom Lower</button>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button className="btn">Attach</button>
          <button className="btn">IPR</button>
          <button className="btn">Elastics</button>
          <button className="btn">Split</button>
          <button className="btn">Tools</button>
        </div>
      </div>

      {/* 3D Viewer */}
      <div className="w-screen flex-1 flex items-center justify-center bg-gray-800 p-4">
        <Viewer />
      </div>

      {/* Timeline and Playback Controls */}
      <div className="w-full p-4 bg-gray-400 shadow-md flex justify-between items-center">
        <div className="flex space-x-2 items-center">
          {/* Playback Controls */}
          <button className="btn">&#9664;</button>
          <button className="btn">&#9654;</button>
          <span>19 / 42</span>
        </div>
        {/* Timeline Slider */}
        <input type="range" min="0" max="42" value="19" className="slider" />
      </div>
    </div>
  );
}

export default App;
