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
        <CategoryList categoryService={categoryService} clothService={clothService}/>
        <Route path="/clothes/all" exact>
          <ClothList fetchedClothList={clothService.getClothes()}/>
        </Route>
        <Route path={"/clothes/man"} exact>
          <ClothList fetchedClothList={clothService.getClothesBySex("MAN")}/>
        </Route>
        <Route path={"/clothes/woman"} exact>
          <ClothList fetchedClothList={clothService.getClothesBySex("WOMAN")}/>
        </Route>
        <Route path='/categories/:category' exact render={({match}) => {
            const {category} = match.params;
            return <ClothList pathVariable={category} fetchedClothList={clothService.getClothesByCategory(category)}/>}}/>
      </div>
    );
  }
}

export default WithClothService()(App)
