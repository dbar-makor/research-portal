import { createSlice } from '@reduxjs/toolkit';
import researches from '../../config/researchesConfig.json';

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
export const { getResearchesData } = researchesSlice.actions;

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

export default researchesSlice.reducer;
