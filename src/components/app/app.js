import React, {Component} from 'react'
import ClothHeader from "../cloth-header"
import ClothList from "../cloth-list"
import { Route } from 'react-router-dom'
import WithClothService from "../hoc"
import CategoryList from "../category-list"

class App extends Component {

  render() {
    const {clothService, categoryService} = this.props

    return (
      <div className="app">
        <ClothHeader/>
        <Route path="/clothes/all">
          <ClothList fetchedClothList={clothService.getClothes()}/>
        </Route>
        <Route path={"/clothes/man"}>
          <ClothList fetchedClothList={clothService.getClothesBySex("MAN")}/>
        </Route>
        <Route path={"/clothes/woman"}>
          <ClothList fetchedClothList={clothService.getClothesBySex("WOMAN")}/>
        </Route>
        <CategoryList categoryService={categoryService} clothService={clothService}/>
      </div>
    );
  }
}

export default WithClothService()(App)
