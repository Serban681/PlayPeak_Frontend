
import userReducer from './userSlice';
import storage from 'redux-persist/lib/storage'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

export const makeStore = () => {
  return configureStore({
    reducer: persistReducer(persistConfig, combineReducers({
        user: userReducer
    })
    ),
    // reducer: combineReducers({
    //       user: userReducer
    //   }),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  })
}
  

// export const makeStore = () => {
//     return configureStore({
//         reducer: {
//             user: userReducer
//         }  
//     })
// }

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
