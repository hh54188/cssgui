import React from 'react';
import './App.css';
import 'react-linear-gradient-picker/dist/index.css';
import SizePanel from './components/size-panel';
import PositionPanel from './components/position-panel';
import BoxShadowPanel from './components/box-shadow-panel';
import BackgroundPanel from './components/background-panel';
import BorderPanel from './components/border-panel';
import TransformPanel from './components/transform-panel';
import ActionPanel from './components/action-panel';
import Canvas from './components/canvas';

function App() {
  return (
    <div className="App">
      <Canvas></Canvas>
      <div className="control-panel">
        <div className="control-panel-content">
          <ActionPanel></ActionPanel>
          <SizePanel />
          <PositionPanel></PositionPanel>
          <BackgroundPanel />
          <TransformPanel ></TransformPanel>
          <BorderPanel></BorderPanel>
          <BoxShadowPanel></BoxShadowPanel>
        </div>
      </div>
    </div >
  );
}

export default App;
