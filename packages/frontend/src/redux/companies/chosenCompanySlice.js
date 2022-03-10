import { createSlice } from '@reduxjs/toolkit';
import { BASE_URL, END_POINT } from '../../utils/constants';
import axios from 'axios';

//reducer

export const chosenCompanySlice = createSlice({
	name: 'chosenCompany',
	initialState: {
		chosenCompany: null,
	},
	reducers: {
		changeChosenCompany: (state, action) => {
			state.chosenCompany = action.payload;
		},
	},
});

export const getChosenCompanyAsync = (id) => async (dispatch) => {
	console.log(`${BASE_URL}${END_POINT.COMPANY}/${id}`);
	try {
		const res = await axios.get(`${BASE_URL}${END_POINT.COMPANY}/${id}`);
		if (res.status === 200) {
			dispatch(changeChosenCompany(res.data));
		}
	} catch (error) {
		console.log(error, error.message);
	}
};

//selectors

export const selectChosenCompany = (state) => state.chosenCompany.chosenCompany;

export const { changeChosenCompany } = chosenCompanySlice.actions;

export default chosenCompanySlice.reducer;
