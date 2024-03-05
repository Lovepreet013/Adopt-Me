import { createSlice } from "@reduxjs/toolkit";

export const adoptedPetSlice = createSlice({
  name: "adoptedPet",
  initialState: {
    value: null,
  },
  reducers: {
    adopt: (state, action) => {
      //THIS ONE <--
      state.value = action.payload;
    },
  },
});

export const { adopt } = adoptedPetSlice.actions; //creating adopt action of adopt from reducer, THAT ONE
export default adoptedPetSlice.reducer;
