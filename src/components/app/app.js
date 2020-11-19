import React, {Component} from 'react'
import ClothHeader from "../cloth-header"
import ClothList from "../cloth-list"
import { Route } from 'react-router-dom'
import WithClothService from "../hoc"
import LoginForm from "../login"
import {connect} from 'react-redux'
import Cabinet from '../cabinet'

class App extends Component {

  render() {
    const {clothService, categoryService, token, roles} = this.props

    const loginForm = token && roles ? <Route path="/cabinet" component={Cabinet}/> : <Route path="/login" component={LoginForm}/>

    return (
      <div className="app">
        <ClothHeader categoryService={categoryService} clothService={clothService}/>
        <Route path="/clothes/man/:category" render={({match, location}) => {
          const {category} = match.params
          return <ClothList pathVariable={location.pathname} 
          fetchedClothList={clothService.getClothesByCategoryAndSex("MAN", category)}/>
        }}/>
        <Route path="/clothes/woman/:category" render={({match, location}) => {
          const {category} = match.params
          return <ClothList pathVariable={location.pathname}  
          fetchedClothList={clothService.getClothesByCategoryAndSex("WOMAN", category)}/>
        }}/>
        {loginForm}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
      token: state.token,
      roles: state.roles
    }
}

export default WithClothService()(connect(mapStateToProps)(App))
