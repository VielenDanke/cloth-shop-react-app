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
        <Route path="/clothes/all" exact render={({location}) => {
          return <ClothList pathVariable={location.pathname} fetchedClothList={clothService.getClothes()}/>
        }}/>
        <Route path="/clothes/man" exact render={({location}) => {
          return <ClothList pathVariable={location.pathname} 
          fetchedClothList={clothService.getClothesBySex("MAN")}/>
        }}/>
        <Route path="/clothes/woman" exact render={({location}) => {
          return <ClothList pathVariable={location.pathname}  fetchedClothList={clothService.getClothesBySex("WOMAN")}/>
        }}/>
        <Route path='/categories/:category' render={({match, location}) => {
            const {category} = match.params;
            return <ClothList pathVariable={location.pathname} fetchedClothList={clothService.getClothesByCategory(category)}/>}}/>
      </div>
    );
  }
}

export default WithClothService()(App)
