import React, {Component} from 'react'
import ClothHeader from "../cloth-header"
import ClothList from "../cloth-list"
import { Route, Redirect } from 'react-router-dom'
import WithClothService from "../hoc"
import LoginForm from "../login"
import {connect} from 'react-redux'
import Cabinet from '../cabinet'
import FrontPage from "../front-page"

class App extends Component {

  render() {
    const {clothService, categoryService, token, roles} = this.props

    const loginForm = token && roles ? 
      <div>
        <Route path="/cabinet" component={Cabinet}/>
        <Route path="/logout">
          <Redirect to="/" exact/>
        </Route>
      </div> : 
      <Route path="/login" component={LoginForm}/>

    return (
      <div className="app">
        <ClothHeader categoryService={categoryService} clothService={clothService}/>
        <Route exact path="/" render={({match, location}) => {
          return <FrontPage match={match} location={location} clothService={clothService}/>
        }}/>
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
