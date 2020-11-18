import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux"
import store from "./store"
import ErrorBoundry from "./components/error-boundry"
import ClothServiceContext from "./components/cloth-service-context"
import ClothService from "./services/clothService"
import CategoryService from "./services/categoryService"
import UserService from "./services/userService"
import {BrowserRouter as Router} from "react-router-dom"
import App from './components/app'
import 'bootstrap/dist/css/bootstrap.min.css'

const clothService = new ClothService()
const categoryService = new CategoryService()
const userService = new UserService()

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundry>
      <ClothServiceContext.Provider 
      value={{clothService: clothService, categoryService: categoryService, userService: userService}}>
        <Router>
          <App/>
        </Router>
      </ClothServiceContext.Provider>
    </ErrorBoundry>
  </Provider>,
  document.getElementById('root')
)
