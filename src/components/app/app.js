import React, {Component} from 'react'
import ClothHeader from "../cloth-header"
import ClothList from "../cloth-list"
import { Route, Redirect } from 'react-router-dom'
import WithClothService from "../hoc"
import LoginForm from "../login"
import {connect} from 'react-redux'
import AdminCabinet from '../admin-cabinet'
import UserCabinet from "../user-cabinet"
import FrontPage from "../front-page"
import RegistrationForm from "../registration-form"

class App extends Component {

  render() {
    const {categoryService, clothService, token, roles} = this.props

    const loginForm = token && roles ? 
      <div>
        <Route path="/cabinet/admin" component={AdminCabinet}/>
        <Route path="/cabinet/user" component={UserCabinet}/>
        <Route path="/logout">
          <Redirect to="/" exact/>
        </Route>
      </div> : 
      <div>
        <Route path="/login" component={LoginForm}/>
        <Route path="/registration" component={RegistrationForm}/>
      </div>

    return (
      <div className="app">
        <ClothHeader categoryService={categoryService} clothService={clothService}/>
        <Route exact path="/" render={({match, location}) => {
          return <FrontPage match={match} location={location} clothService={clothService}/>
        }}/>
        <Route path="/clothes/man/:category" render={({match, location}) => {
          const gender = "MAN"
          const {category} = match.params
          return <ClothList pathVariable={location.pathname} category={category} gender={gender}/>
        }}/>
        <Route path="/clothes/woman/:category" render={({match, location}) => {
          const gender = "WOMAN"
          const {category} = match.params
          return <ClothList pathVariable={location.pathname} category={category} gender={gender}/>
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
