import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authslice'
import adminReducer from './adminslice'

// Redux store for redux slices global variables
export default configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer
  },
})
