import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    city:null
  },
  reducers: {
    setUserData: (state, actions) => {
      state.userData = actions.payload;
    },
    setCity: (state,actions)=>{
      state.city = actions.payload
    }
  },
});

export const { setUserData,setCity } = userSlice.actions;
export default userSlice.reducer;
