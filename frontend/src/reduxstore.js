import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authslice'
import adminReducer from './adminslice'

export default configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer
  },
})
