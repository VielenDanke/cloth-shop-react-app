import React from 'react'
import WithClothService from "../hoc"
import ClothHeader from "../cloth-header"
import ClothList from "../cloth-list"

const App = ({clothService}) => {
  return (
    <div className="app">
      <ClothHeader clothService={clothService}/>
      <ClothList clothService={clothService}/>
    </div>
  );
}

export default WithClothService()(App)
