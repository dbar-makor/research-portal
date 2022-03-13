import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, END_POINT } from '../../utils/constants';

export const contractSlice = createSlice({
	name: 'contract',
	initialState: {
		loading: false,
		contractData: [],
	},
	reducers: {
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
		getContractData: (state, action) => {
			state.contractData = action.payload;
			state.loading = false;
		},
	},
});
export const { getContractData, setLoading } = contractSlice.actions;

//selectors

export const selectContractData = (state) => state.contract.companiesData;
export const selectContractLoading = (state) => state.contract.loading;

//action thunk

export const getContractDataAsync = () => async (dispatch) => {
	dispatch(setLoading(true));

	try {
		const res = await axios.get(BASE_URL + END_POINT.CONTRACT);
		if (res.status === 200) {
			dispatch(getContractData(res.data.contract));
		}
	} catch (error) {
		dispatch(setLoading(false));
	}
};

export default contractSlice.reducer;
