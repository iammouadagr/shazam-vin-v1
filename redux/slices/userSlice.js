import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  uid: null,
  username: null,
  isAdmin: false
}

export const userSlice  = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUid: (state,action) => {
     
      state.uid = action.payload;
      
    },
    setUserName: (state,action) => {
     
      state.username = action.payload;
      
    },
    setIsAdmin: (state,action) => {
     
      state.isAdmin = action.payload;
      
    }, 

    
  },
})

// Action creators are generated for each case reducer function
export const { setUid,setUserName,setIsAdmin } = userSlice.actions;

// Selectors
export const selectCurrentUser = (state) => state.user;
export const selectAdmin = (state) => state.user.isAdmin;


export default userSlice.reducer