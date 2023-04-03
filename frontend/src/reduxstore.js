import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reduxslice'

export default configureStore({
  reducer: {
    auth: authReducer,
  },
})
