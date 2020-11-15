import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux"
import store from "./store"
import ErrorBoundry from "./components/error-boundry"
import ClothServiceContext from "./components/cloth-service-context"
import ClothService from "./services/clothService"
import {BrowserRouter as Router} from "react-router-dom"
import App from './components/app'

const clothService = new ClothService()

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundry>
      <ClothServiceContext.Provider value={clothService}>
        <Router>
          <App/>
        </Router>
      </ClothServiceContext.Provider>
    </ErrorBoundry>
  </Provider>,
  document.getElementById('root')
)
