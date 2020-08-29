import React from 'react';
import { Provider } from 'react-redux';
import DrawingBoard from './DrawingBoard/DrawingBoard';
import store from './store';

function App() {
  return (
    <div className="App">   
      <Provider store={store}>
        <DrawingBoard />   
      </Provider>      
    </div>
  );
}

export default App;
