import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, END_POINT } from '../../utils/constants';

export const chosenUserSlice = createSlice({
	name: 'chosenUser',
	initialState: {
		chosenUser: null,
	},
	reducers: {
		changeChosenUser: (state, action) => {
			state.chosenUser = action.payload;
		},
	},
});

export const { changeChosenUser, setLoading } = chosenUserSlice.actions;


//selectors

export const selectChosenUserData = (state) => state.chosenUser.chosenUser;

//action thunk

export const getUserByIdAsync = (id) => async (dispatch) => {
	try {
		const res = await axios.get(`${BASE_URL}${END_POINT.USER}/${id}`);
		if (res.status === 200) {
			dispatch(changeChosenUser(res.data));
		}
	} catch (error) {
		console.log(error, error.message);
	}
};


export default chosenUserSlice.reducer;
