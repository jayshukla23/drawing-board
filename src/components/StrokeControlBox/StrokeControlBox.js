import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import strokeSizeMap from '../../util/strokeSizeMap';
import strokeColorMap from '../../util/strokeColorMap';

import ControlItem from '../ControlItem/ControlItem';
import brushes from '../../util/brushes';

function StrokeControlBox(props) {
  const { 
    currentBrush, 
    currentStrokeSize, 
    setCurrentStrokeSize, 
    currentStrokeColor,
    setCurrentStrokeColor 
  } = props;
  
  const [strokeSizes, setSizesList] = useState([]);
  const [strokeColors, setColorsList] = useState([]);

  useEffect(() => {
    const sizes = [];
    const colors = [];

    const sizeMap = strokeSizeMap[currentBrush];    
    for(let key in sizeMap) {
      sizes.push({ value: key, text: sizeMap[key] });
    }
    if(sizes.length) {        
      setCurrentStrokeSize(+sizes[0].value);
    }
    setSizesList(sizes);  
    
    const colorMap = strokeColorMap[currentBrush];
    for(let key in colorMap) {
      colors.push({ value: key, color: colorMap[key] });
    }
    if(colors.length) {        
      setCurrentStrokeColor(colors[0].value);
    }
    setColorsList(colors);
  }, [currentBrush]);

  function changeStrokeSize(size) {    
    setCurrentStrokeSize(+size.value)
  }

  function changeStrokeColor(color) {
    setCurrentStrokeColor(color.value);
  }

  if(currentBrush !== brushes.eraser) {
    return (
      <div className="control__box-container">
        <div className="control__box stroke__box">
          {strokeSizes.map(control => {
            return (
              <ControlItem 
                control={control} 
                key={control.value} 
                changeListener={changeStrokeSize}
                classes={['text__control']}
                active={+control.value === currentStrokeSize} 
              />
            )
          })}   
        </div>
        
        <div className="control__box stroke__box">
          {strokeColors.map(control => {
            return (
              <ControlItem
                control={control} 
                key={control.value} 
                changeListener={changeStrokeColor}
                classes={['color__control']}
                active={control.value === currentStrokeColor}
              />
            )
          })}
        </div>      
      </div>
    )
  }
  return null;
  
}

const mapStateToProps = state => ({
  currentBrush: state.currentBrush,
  currentStrokeSize: state.currentStrokeSize,
  currentStrokeColor: state.currentStrokeColor
});  


const mapDispatchToProps = dispatch => ({  
  setCurrentStrokeSize: value => { dispatch({ type: 'SET_CURRENT_STROKE_SIZE', value }) },
  setCurrentStrokeColor: color => { dispatch({ type: 'SET_STROKE_COLOR', color }) }
});

export default connect(mapStateToProps, mapDispatchToProps)(StrokeControlBox);