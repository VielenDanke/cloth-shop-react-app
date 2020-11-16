import React from 'react'
import ClothHeader from "../cloth-header"
import ClothList from "../cloth-list"
import { Route } from 'react-router-dom'

const App = () => {
  return (
    <div className="app">
      <ClothHeader/>
      <Route path={["/clothes", "/clothes/man", "/clothes/woman"]} component={ClothList}/>
    </div>
  );
}

export default App
