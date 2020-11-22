import {createStore} from 'redux'
import {persistStore, persistReducer} from 'redux-persist'
import reducer from "./reducers"
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, reducer)

let store = createStore(persistedReducer)
let persistor = persistStore(store)

export {
    store, persistor
}