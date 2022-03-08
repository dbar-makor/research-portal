import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';

// import * as actionSnackBar from '../SnackBar/action';

//Slice
export const subscribersSlice = createSlice({
  name: 'subscribers',
  initialState: {
    subscribers: [],
    loading : false, //TO SHOW THE USER THAT DATA IS LOADING
    chosenSubscriber: null,
  },
  reducers: {
    getSubscribers: (state, action) => {
      state.subscribers = action.payload;
      console.log(state.subscribers , 'from REDUX')
    },
    setChosenSubscriber: (state, action) => {
      state.chosenSubscriber = action.payload;
    },

  },
});

//Thunk
export const getSubscribersAsync = () => async (dispatch) => {
    
  try {
    const res = await axios.get('subscribersDummyData.json');
    console.log(res.data, 'DATA FROM GET SUBSCRIBERS' , res.status);
    if (res.status === 200 && res.data) {
        dispatch(getSubscribers(res.data.subscribers));
    }
  } catch (error) {
    if (error.response && error.response !== undefined) {
    //dispacth(actionSnackBar.setSnackBar('error', 'No subs found'));
    alert("No subs found")
    } else {
    //dispatch(actionSnackBar.setSnackBar('error', 'Server error', 2000));
    }
  }
};


// Extract and export each action creator by name
export const { getSubscribers, setChosenSubscriber } = subscribersSlice.actions;

export default subscribersSlice.reducer;
