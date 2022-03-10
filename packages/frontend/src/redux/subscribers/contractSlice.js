import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, END_POINT } from '../../utils/constants';
import { createSelector } from 'reselect';

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
		sendContract: (state, action) => {},
		// deleteCompany: (state, action) => {
		//   const companies =  state.companiesData
		//   companies =  companies.filter(company => company.id !== action.payload)
		// }
	},
});

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
		console.log(error, error.message);
		dispatch(setLoading(false));
	}
};

// export const deleteContractAsync = (id) => async (dispatch) => {

//   try{
//     console.log("delete")
//     console.log(`${BASE_URL}${END_POINT.CONTRACT}/${id}`)
//     const res = await axios.delete(`${BASE_URL}${END_POINT.CONTRACT}/${id}`);
//     console.log("res", res)
//     if(res.status === 200){
//         console.log("delete successful");
//         dispatch(getCompaniesDataAsync());
//     }
//   }catch(err){
//     console.log(err.message);
//   }
// }

export const { getContractData, setLoading } = contractSlice.actions;

export default contractSlice.reducer;
