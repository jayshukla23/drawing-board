import initState from './initState';

const reducer = (state = initState, action) => {  
  switch(action.type) {
    case 'SET_CURRENT_BRUSH':    
      return {
        ...state,
        currentBrush: action.brush
      }      

    case 'SET_CURRENT_STROKE_SIZE':
      return {
        ...state,
        currentStrokeSize: action.value
      }    

    case 'SET_STROKE_COLOR':
      return {
        ...state,
        currentStrokeColor: action.color
      }
      
    default:
      return state;      
  }
}

export default reducer;