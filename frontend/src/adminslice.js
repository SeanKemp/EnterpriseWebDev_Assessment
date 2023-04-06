import { createSlice } from '@reduxjs/toolkit'

// Redux slice for admin authentication global variable
export const adminSlice = createSlice({
    name: 'admin',
    initialState: {
      value: false,
    },
    reducers: {
      setAdminBool: (state) => {
        state.value = true
      },
      unsetAdminBool: (state) => {
        state.value = false
      }
    },
})
  
export const { setAdminBool, unsetAdminBool } = adminSlice.actions
export const getAdminBool = (state) => state.admin.value

export default adminSlice.reducer