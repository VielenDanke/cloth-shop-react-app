import React from 'react'
import WithClothService from "../hoc"
import ClothHeader from "../cloth-header"
import ClothList from "../cloth-list"
import { Route } from 'react-router-dom'

const App = ({clothService}) => {
  return (
    <div className="app">
      <ClothHeader clothService={clothService}/>
      <Route path={["/clothes", "/clothes/man", "/clothes/woman"]} render={() => {
        return <ClothList clothService={clothService}/>
      }}/>
    </div>
  );
}

export default WithClothService()(App)
