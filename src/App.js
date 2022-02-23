import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Users from './Users';

class App extends React.Component {
  render() {
    return(
      <div className='container App'>
      <Routes>
        <Route path='/' element={<Users />}/>
      </Routes>
      </div>
      
    )
  }
}

export default App;
