import React, { useState, useEffect } from "react";
import Viewer from "./components/Viewer";
import { IoSettingsSharp } from "react-icons/io5";
import { FaPlay, FaPause, FaForward, FaBackward } from "react-icons/fa"; // Playback control icons
import { FiSkipBack, FiSkipForward } from "react-icons/fi"; // Skip icons

import pan from "./assets/imgs/pan.png";
import rotate from "./assets/imgs/rotate.png";
import zoom from "./assets/imgs/zoom.png";
import zoomout from "./assets/imgs/zoom-out.png";
import brightness from "./assets/imgs/brightness.png";
import Attach from "./assets/imgs/Attach.png";
import upper from "./assets/imgs/upper.png";
import top from "./assets/imgs/top.png";
import right from "./assets/imgs/right.png";
import front from "./assets/imgs/front.png";
import left from "./assets/imgs/left.png";
import bottom from "./assets/imgs/bottom.png";
import lower from "./assets/imgs/lower.png";
import Split from "./assets/imgs/Spit.png";
import IPR from "./assets/imgs/IPR.png";
import Elastic from "./assets/imgs/Elastic.png";

import "./App.css";

function App() {
  const [view, setView] = useState("Front");
  const [mode, setMode] = useState("None");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const totalFrames = 42; // Total frames for playback
  const playInterval = 100; // Playback speed in milliseconds
  const [actions, setActions] = useState({
    enablePan: false,
    enableRotate: true,
    enableZoom: false,
  });
  const [background, setBackground] = useState("#808080"); // Define the background state here

  const handleBrightnessChange = (e) => {
    const newColor = `rgba(${e.target.value}, ${e.target.value}, ${e.target.value}, 1)`;
    setBackground(newColor);
  };

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentFrame((prevFrame) =>
          prevFrame < totalFrames ? prevFrame + 1 : totalFrames
        );
      }, playInterval);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentFrame]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleBackward = () => {
    setCurrentFrame((prevFrame) => Math.max(prevFrame - 1, 0));
  };

  const handleForward = () => {
    setCurrentFrame((prevFrame) => Math.min(prevFrame + 1, totalFrames));
  };

  const handleFrameChange = (e) => {
    setCurrentFrame(Number(e.target.value));
  };

  const handleViewChange = (view) => setView(view);
  const handleModeChange = (mode) => setMode(mode);

  return (
    <div className="App w-full h-screen flex flex-col bg-gray-100">
      {/* Toolbar */}
      <div className="w-full flex justify-between items-center p-2 bg-white shadow-lg border-b border-gray-300">
        {/* View Buttons */}
        <div className="flex space-x-2 items-center">
          <div className="flex space-x-1 items-center">
            <button
              className={`flex flex-col items-center justify-center px-3 py-1 text-sm hover:bg-gray-200 ${
                view === "Upper" ? "border-b-2 border-black font-bold" : ""
              }`}
              onClick={() => handleViewChange("Upper")}
            >
              <img src={upper} className="w-6" /> Upper
            </button>
            <button
              className={`flex flex-col items-center justify-center px-3 py-1 text-sm hover:bg-gray-200 ${
                view === "Top" ? "border-b-2 border-black font-bold" : ""
              }`}
              onClick={() => handleViewChange("Top")}
            >
              <img src={top} className="w-6" /> Top
            </button>
            <button
              className={`flex flex-col items-center justify-center px-3 py-1 text-sm hover:bg-gray-200 ${
                view === "Right" ? "border-b-2 border-black font-bold" : ""
              }`}
              onClick={() => handleViewChange("Right")}
            >
              <img src={right} className="w-6" /> Right
            </button>
            <button
              className={`flex flex-col items-center justify-center px-3 py-1 text-sm hover:bg-gray-200 ${
                view === "Front" ? "border-b-2 border-black font-bold" : ""
              }`}
              onClick={() => handleViewChange("Front")}
            >
              <img src={front} className="w-6" /> Front
            </button>
            <button
              className={`flex flex-col items-center justify-center px-3 py-1 text-sm hover:bg-gray-200 ${
                view === "Left" ? "border-b-2 border-black font-bold" : ""
              }`}
              onClick={() => handleViewChange("Left")}
            >
              <img src={left} className="w-6" /> Left
            </button>
            <button
              className={`flex flex-col items-center justify-center px-3 py-1 text-sm hover:bg-gray-200 ${
                view === "Bottom" ? "border-b-2 border-black font-bold" : ""
              }`}
              onClick={() => handleViewChange("Bottom")}
            >
              <img src={bottom} className="w-6" /> Bottom
            </button>
            <button
              className={`flex flex-col items-center justify-center px-3 py-1 text-sm hover:bg-gray-200 ${
                view === "Lower" ? "border-b-2 border-black font-bold" : ""
              }`}
              onClick={() => handleViewChange("Lower")}
            >
              <img src={lower} className="w-6" /> Lower
            </button>
          </div>
        </div>

        {/* Mode Buttons */}
        <div className="flex space-x-2 items-center">
          <button
            className={`flex flex-col items-center justify-center px-3 py-1 text-sm hover:bg-gray-200 ${
              mode === "Attach" ? "border-b-2 border-black font-bold" : ""
            }`}
            onClick={() => handleModeChange("Attach")}
          >
            <img src={Attach} className="w-6" /> Attach
          </button>
          <button
            className={`flex flex-col items-center justify-center px-3 py-1 text-sm hover:bg-gray-200 ${
              mode === "IPR" ? "border-b-2 border-black font-bold" : ""
            }`}
            onClick={() => handleModeChange("IPR")}
          >
            <img src={IPR} className="w-6" /> IPR
          </button>
          <button
            className={`flex flex-col items-center justify-center px-3 py-1 text-sm hover:bg-gray-200 ${
              mode === "Elastics" ? "border-b-2 border-black font-bold" : ""
            }`}
            onClick={() => handleModeChange("Elastics")}
          >
            <img src={Elastic} className="w-6" /> Elastics
          </button>
          <button
            className={`flex flex-col items-center justify-center px-3 py-1 text-sm hover:bg-gray-200 ${
              mode === "Split" ? "border-b-2 border-black font-bold" : ""
            }`}
            onClick={() => handleModeChange("Split")}
          >
            <img src={Split} className="w-6" /> Split
          </button>
          <button
            className={`flex flex-col items-center justify-center px-3 py-1 text-sm hover:bg-gray-200 ${
              mode === "Tools" ? "border-b-2 border-black font-bold" : ""
            }`}
            onClick={() => handleModeChange("Tools")}
          >
            <IoSettingsSharp size={24} />
            Tools
          </button>
        </div>
      </div>

      {/* 3D Viewer */}
      <div className="w-full flex-1 flex items-center justify-center bg-gray-100">
        <Viewer
          view={view}
          mode={mode}
          actions={actions}
          background={background}
        />
      </div>

      {/* Timeline and Playback Controls */}
      <div className="w-full p-4 bg-white shadow-lg border-t border-gray-300 flex items-center space-x-4">
        <button onClick={() => setCurrentFrame(0)}>
          <FiSkipBack size={24} />
        </button>
        <button onClick={handleBackward}>
          <FaBackward size={24} />
        </button>
        <button onClick={handlePlayPause}>
          {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
        </button>
        <button onClick={handleForward}>
          <FaForward size={24} />
        </button>
        <button onClick={() => setCurrentFrame(totalFrames)}>
          <FiSkipForward size={24} />
        </button>
        <input
          type="range"
          min="0"
          max={totalFrames}
          value={currentFrame}
          onChange={handleFrameChange}
          className="w-full"
        />
        <span>{currentFrame}</span>
      </div>
    </div>
  );
}

export default App;
