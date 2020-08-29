/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import brushes from '../../util/brushes';

function Canvas(props) {  
  const { 
    currentBrush,     
    currentStrokeSize,
    currentStrokeColor,    
    setCurrentBrush, 
  } = props;    
  
  const contextList = useRef([]);
  const offset = useRef({ offsetLeft: 0, offsetTop: 0 });
  const prevPos = useRef({ x: null, y: null });  
  const currentPos = useRef({ x: null, y: null });
  const shouldDraw = useRef(false);
  const context = useRef(null);

  useEffect(() => {
    mounted();
  }, []);

  useEffect(() => {    
    watchCurrentBrush();
  }, [currentBrush]);  

  useEffect(() => {    
    watchStrokeSize();
  }, [currentStrokeSize]);

  useEffect(() => {
    watchStrokeColor();
  }, [currentStrokeColor])

  function mounted() {
    const penCanvas = document.querySelector('#penCanvas');  
    const markerCanvas = document.querySelector('#highlighterCanvas');  
    
    const penCxt = initCanvas(penCanvas);
    const markerCxt = initCanvas(markerCanvas, true);

    penCxt.brush = brushes.pencil;
    markerCxt.brush = brushes.marker;          
    
    setContextList([penCxt, markerCxt]);     
    setCurrentBrush(brushes.pencil);      
  }    

  function watchCurrentBrush() {
    let newContext = null;     
    if(currentBrush === brushes.marker) {
      newContext = contextList.current.find(cxt => cxt.brush === brushes.marker);
      newContext.globalAlpha = 0.1;      
    } else {
      newContext = contextList.current.find(cxt => cxt.brush === brushes.pencil);
      newContext.globalAlpha = 1;      
    }
    setCurrentContext(newContext); 
  }

  function watchStrokeSize() {    
    const currentContext = context.current;
    currentContext.lineWidth = currentStrokeSize;
    setCurrentContext(currentContext); 
  }

  function watchStrokeColor() {
    const currentContext = context.current;
    currentContext.strokeStyle = currentStrokeColor;
  }

  function setContextList(list) {    
    contextList.current = list;
  }

  function setCanvasOffset({ offsetLeft = 0, offsetTop = 0 }) {    
    offset.current = { offsetLeft, offsetTop };
  }

  function setCurrentPosition({ x = 0, y = 0 }) {
    currentPos.current = { x, y };
  }

  function setPreviousPosition({ x = 0, y = 0 }) {
    prevPos.current = { x, y };
  }

  function setCurrentContext(cxt) {    
    context.current = cxt;
  }

  function toggleShouldDraw(value = false) {
    shouldDraw.current = value;
  }

  function toggleDraw(value = false) {
    const currentContext = context.current;    
    if(value) {      
      clearMarkerCanvas();
      currentContext.beginPath();
    } else {
      currentContext.closePath();
    }
    toggleShouldDraw(value);
  }  

  function clearMarkerCanvas() {    
    const canvas = document.querySelector('#highlighterCanvas');
    if(canvas) {      
      const markerCxt = contextList.current.find(cxt => cxt.brush === brushes.marker);
      markerCxt.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
  
  function drawStroke(x, y) {
    const currentContext = context.current;
    
    // Make path stroke    
    currentContext.moveTo(prevPos.x, prevPos.y);
    currentContext.lineTo(x, y);            
    currentContext.stroke();
  }

  function trackCursor(event) {    
    // Initialise starting coordinates  
    const { offsetLeft, offsetTop } = offset.current;
    if(!prevPos.current.x && !prevPos.current.y) {            
      const prevX = event.clientX - offsetLeft;
      const prevY = event.clientY - offsetTop;
      setPreviousPosition({ x: prevX, y: prevY });      
    }

    // Update coordinates based on cursor movement
    const currX = event.clientX - offsetLeft;
    const currY = event.clientY - offsetTop;        

    setCurrentPosition({ x: currX, y: currY });

    // Draw along with cursor movement
    if(shouldDraw.current) {        
      drawStroke(currX, currY);
    }

    // Update cursor position for next stroke
    setPreviousPosition({ x: currX, y: currY });     
  }

  function initCanvas(canvas, shouldBindEventListeners = false) {        
    const canvasEl = document.querySelector('.canvas__container');    
    setCanvasOffset({ 
      offsetLeft: canvasEl.offsetLeft, 
      offsetTop: canvasEl.offsetTop 
    });             
    canvas.width = canvasEl.offsetWidth;
    canvas.height = canvasEl.offsetHeight;  
    var ctx = canvas.getContext('2d');      
    ctx.lineCap = 'round';    

    if(shouldBindEventListeners) {
      canvas.onmousedown = (e) => {toggleDraw(true)}
      canvas.onmousemove = trackCursor;
      canvas.onmouseup = () => {toggleDraw(false)}
      canvas.onmouseleave = () => {toggleDraw(false)}; 
    }          

    return ctx;                      
  }

  return (
    <div className="canvas__container">    
      <canvas id="penCanvas"></canvas>
      <canvas id="highlighterCanvas"></canvas>
    </div>       
  )
}

const mapStateToProps = state => {
  return {  
    currentBrush: state.currentBrush,
    currentStrokeSize: state.currentStrokeSize,
    currentStrokeColor: state.currentStrokeColor
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setCurrentBrush: brush => { dispatch({ type: 'SET_CURRENT_BRUSH', brush }) },    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);