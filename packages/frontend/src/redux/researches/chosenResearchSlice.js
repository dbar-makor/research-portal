import { createSlice } from '@reduxjs/toolkit'
import { BASE_URL, END_POINT } from "../../utils/constants";
import axios from 'axios'

//reducer

export const chosenResearchSlice = createSlice({ 
  name: 'chosenResearch',
  initialState:  null,
  reducers: {
    changeChosenResearch: (state, action) => {
        console.log('action', action.payload)
       return state = action.payload;
    }
  }
})

export const getChosenResearchAsync = (id) => async (dispatch) => {
    if(id === ""){
      console.log("no id")
        dispatch(changeChosenResearch(null));
    }

  try {
    const res = await axios.get(`${BASE_URL}${END_POINT.PUBLICATION}/${id}`)
    if (res.status === 200 || res.status === 201) {
      console.log('RES data', res.data)
        dispatch(changeChosenResearch(res.data));
        
    }
  } catch (error) {
    console.log(error, error.message);
  }
}


//selectors

export const selectChosenResearch = state => state.chosenResearch;


export const { changeChosenResearch } =
chosenResearchSlice.actions

export default chosenResearchSlice.reducer;
