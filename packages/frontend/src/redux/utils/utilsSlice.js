import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { BASE_URL, END_POINT } from "../../utils/constants";

// import { BASE_URL, END_POINT } from '../../utils/constants'
// import researches from '../../config/researchConfig.json'
//import researches from '../../config/researchesConfig.json';
// import subsc from '../../config/subscribersDummyData.json'


export const utilsSlice = createSlice({
  name: 'utils',
  initialState: {
    utils: {}
  },
  reducers: {
    setUtils: (state, action) => {
      state.utils = action.payload
    }
}})


export const getUtilsAsync = () => async (dispatch) => {
  try {

    const res = await axios.get(`${BASE_URL}${END_POINT.UTILS}`)
    if (res.status === 200) {
        console.log('UTILS', res)
        dispatch(setUtils(res.data))
    }
  } catch (error) {
    console.log(error, error.message)
  }
}



export const { setUtils } =
utilsSlice.actions

export default utilsSlice.reducer
