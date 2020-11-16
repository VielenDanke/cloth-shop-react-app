import React from 'react'
import ClothHeader from "../cloth-header"
import ClothList from "../cloth-list"
import { Route } from 'react-router-dom'
import WithClothService from "../hoc"

const App = ({clothService}) => {
  return (
    <div className="app">
      <ClothHeader/>
      <Route path="/clothes">
        <ClothList clothes={clothService.getClothes()}/>
      </Route>
      <Route path={"/clothes/man"}>
        <ClothList clothes={clothService.getClothesBySex("MAN")}/>
      </Route>
      <Route path={"/clothes/woman"}>
        <ClothList clothes={clothService.getClothesBySex("WOMAN")}/>
      </Route>
    </div>
  );
}

export default WithClothService()(App)
