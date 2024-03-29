import React from 'react';
import {Helmet} from "react-helmet";
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
      <Helmet>
        <title>CSS GUI</title>
      </Helmet>
      <Canvas></Canvas>
      <div className="control-panel">
        <div className="control-panel-content">
          <ActionPanel></ActionPanel>
          <SizePanel />
          <BackgroundPanel />
          <BoxShadowPanel></BoxShadowPanel>
          <PositionPanel></PositionPanel>
          <TransformPanel ></TransformPanel>
          <BorderPanel></BorderPanel>
        </div>
      </div>
    </div >
  );
}

export default App;
