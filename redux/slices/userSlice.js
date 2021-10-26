import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userId: null,
  username: null,
  profil: null
}

export const userSlice  = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signIn: (state) => {
     
      
    },
    signOut: (state) => {
     
      
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { signIn, signOut } = userSlice.actions

export default userSlice.reducer