import React from 'react';

function ControlBox(props) {  
  const { control, changeListener, active, classes = [] } = props;

  function clickHandler() {    
    changeListener(control);
  }

  return (
    <div 
      className={`control__item ${active ? 'active' : ''} ${classes.join(' ')}`} 
      onClick={clickHandler} 
    > 
    {
      control.image ? (
        <img className="control__img" src={control.image} alt={control.name} />
      ) : control.text ? (
        <span className="control__text">{control.text}</span>
      ) : (
        <div className={`control__color tile ${control.color}`} />
      )                   
    }      
    </div>
  )
}

export default ControlBox;