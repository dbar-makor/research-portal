import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';

//Slice
export const subscribersSlice = createSlice({
	name: 'subscribers',
	initialState: {
		subscribers: [],
		//TO SHOW THE USER THAT DATA IS LOADING
		loading: false,
		chosenSubscriber: null,
	},
	reducers: {
		getSubscribers: (state, action) => {
			state.subscribers = action.payload;
		},
		setChosenSubscriber: (state, action) => {
			state.chosenSubscriber = action.payload;
		},
	},
});

// Extract and export each action creator by name
export const { getSubscribers, setChosenSubscriber } = subscribersSlice.actions;

//Thunk
export const getSubscribersAsync = () => async (dispatch) => {
	try {
		const res = await axios.get('subscribersDummyData.json');
		if (res.status === 200 && res.data) {
			dispatch(getSubscribers(res.data.subscribers));
		}
	} catch (error) {
		if (error.response && error.response !== undefined) {
			alert('No subs found');
		} else {
			//dispatch(actionSnackBar.setSnackBar('error', 'Server error', 2000));
		}
	}
};

export default subscribersSlice.reducer;
