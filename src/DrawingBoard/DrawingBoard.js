import React from 'react';

import BrushControlBox from '../components/BrushControlBox/BrushControlBox';
import Canvas from '../components/Canvas/Canvas';
import StrokeControlBox from '../components/StrokeControlBox/StrokeControlBox';

import './styles.scss';

function DrawingBoard() {
  return (
    <div className="board__container">
      <BrushControlBox  />     
      <Canvas /> 
      <StrokeControlBox />
    </div>
  )
}

export default DrawingBoard;