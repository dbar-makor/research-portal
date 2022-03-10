import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, END_POINT } from '../../utils/constants';
// import researches from '../../config/researchConfig.json'
import researches from '../../config/researchesConfig.json';
// import subsc from '../../config/subscribersDummyData.json'

// Slice
export const researchesSlice = createSlice({
	name: 'researches',
	initialState: {
		articles: [],
	},
	reducers: {
		getResearchesData: (state, action) => {
			console.log('action', action.payload);
			state.articles = action.payload;
		},
	},
});

export const getResearchesDataAsync = () => async (dispatch) => {
	try {
		// const res = await axios.get(BASE_URL + END_POINT.DASHBOARD)
		const res = researches;
		// if (res.status === 200) {
		console.log('ressss', res);
		await dispatch(getResearchesData(res.researches));
		// }
	} catch (error) {}
};

export const { getResearchesData } = researchesSlice.actions;

export default researchesSlice.reducer;
