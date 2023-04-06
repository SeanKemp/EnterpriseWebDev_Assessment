import { createSlice } from '@reduxjs/toolkit'

// Redux slice for user authentication global variable
export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    value: false,
  },
  reducers: {
    setAuthBool: (state) => {
      state.value = true
    },
    unsetAuthBool: (state) => {
      state.value = false
    }
  },
})

// Action creators are generated for each case reducer function
export const { setAuthBool, unsetAuthBool } = authSlice.actions

export const getAuthBool = (state) => state.auth.value

export default authSlice.reducer