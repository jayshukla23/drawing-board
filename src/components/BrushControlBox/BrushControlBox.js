import React from 'react';
import { connect } from 'react-redux';

import ControlItem from '../ControlItem/ControlItem';

import brushes from '../../util/brushes';

function BrushControlBox(props) {  
  const { currentBrush, setCurrentBrush } = props;

  const controls = [
    {
      value: brushes.pencil,
      image: 'images/pencil_brush.svg',
      name: 'pencil'
    },
    {
      value: brushes.marker,
      image: 'images/highlighter_brush.svg',
      name: 'marker'
    },
    {
      value: brushes.eraser,
      image: 'images/eraser_brush.svg',
      name: 'eraser'
    }
  ];
  
  function changeBrush(brush) {
    setCurrentBrush(brush.value);
  }

  return (    
    <div className="control__box brush__box">   
      {
        controls.map(control => {
          return (
            <ControlItem 
              key={control.value}
              control={control}
              changeListener={changeBrush}
              active={control.value === currentBrush} 
            />
          );
        })
      } 
    </div>    
  )
}

const mapStateToProps = state => ({
  currentBrush: state.currentBrush
});  


const mapDispatchToProps = dispatch => ({
  setCurrentBrush: brush => { dispatch({ type: 'SET_CURRENT_BRUSH', brush }) }
});


export default connect(mapStateToProps, mapDispatchToProps)(BrushControlBox);