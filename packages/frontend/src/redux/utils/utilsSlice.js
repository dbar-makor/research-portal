import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, END_POINT } from '../../utils/constants';

export const utilsSlice = createSlice({
	name: 'utils',
	initialState: {
		utils: {},
	},
	reducers: {
		setUtils: (state, action) => {
			state.utils = action.payload;
		},
	},
});

export const { setUtils } = utilsSlice.actions;

export const getUtilsAsync = () => async (dispatch) => {
	try {
		const res = await axios.get(`${BASE_URL}${END_POINT.UTILS}`);
		if (res.status === 200) {
			dispatch(setUtils(res.data));
		}
	} catch (error) {
		console.log(error, error.message);
	}
};


export default utilsSlice.reducer;
