import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, END_POINT } from '../../utils/constants';
import { createSelector } from 'reselect';
import { setParams } from '../../utils/helpers/helperFunctions';

export const companiesSlice = createSlice({
	name: 'companies',
	initialState: {
		search: '',
		loading: false,
		limit: 15,
		offset: 0,
		hasMore: false,
		companiesData: [],
		metaData: {},
		type: '',
		status: '',
	},
	reducers: {
		setCompanyProperty: (state, action) => {
			if (action.payload.subProperty) {
				state.company[action.payload.mainProperty][action.payload.subProperty] =
					action.payload.updatedValue;
			} else {
				state.company[action.payload.mainProperty] = action.payload.updatedValue;
			}
		},
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
		getCompaniesData: (state, action) => {
			state.companiesData = action.payload;
			state.loading = false;
		},
		setProperty: (state, action) => {
			state[action.payload.key] = action.payload.value;
		},
		setHasMore: (state, action) => {
			state.hasMore = action.payload;
		},
	},
});

export const { getCompaniesData, setLoading, deleteCompany, setProperty, setCompanyProperty, setHasMore } =
	companiesSlice.actions;

//selectors

export const selectCompaniesData = (state) => state.companies.companiesData;
export const selectCompaniesMetaData = (state) => state.companies.metaData;
export const selectCompaniesLoading = (state) => state.companies.loading;
export const selectSearch = (state) => state.companies.search;
export const selectType = (state) => state.companies.type;
export const selectStatus = (state) => state.companies.status;
export const selectOffset = (state) => state.companies.offset;
export const selectLimit = (state) => state.companies.limit;
export const selectHasMore = (state) => state.companies.hasMore;

export const selectProspectCompanies = createSelector([selectCompaniesData], (companies) =>
	companies.filter((company) => company.status === 'prospect'),
);

export const selectPayingCompanies = createSelector([selectCompaniesData], (companies) =>
	companies.filter((company) => company.status === 'client'),
);

//action thunk

export const getCompaniesDataAsync = (offset, limit, search, type, status) => async (dispatch, getState) => {
	dispatch(setLoading(true));
	const state = getState();

	try {
		const res = await axios.get(
			BASE_URL + END_POINT.COMPANY,
			setParams(offset, limit, search, type, status),
		);
		if (res.status === 200) {
			dispatch(setProperty({ key: 'metaData', value: res.data.meta_data }));
			dispatch(setLoading(false));
			if (res.data.meta_data.sum_rows > state.companies.companiesData.length) {
				dispatch(setHasMore(true));
			} else {
				dispatch(setHasMore(false));
			}

			if (offset === 0) {
				dispatch(getCompaniesData(res.data.company));
			}
			if (offset !== 0 && res.data.meta_data.sum_rows > state.companies.companiesData.length) {
				const dataCopy = [...state.companies.companiesData];
				dataCopy.push(...res.data.company);
				dispatch(getCompaniesData(dataCopy));
			}
		}
	} catch (error) {
		dispatch(setLoading(false));
	}
};

export const deleteCompanyAsync = (id) => async (dispatch) => {
	try {
		const res = await axios.delete(`${BASE_URL}${END_POINT.COMPANY}/${id}`);
		if (res.status === 200) {
			dispatch(getCompaniesDataAsync());
		}
	} catch (err) {
				/* eslint no-console: "off" */
		console.log(err.message);
	}
};

export default companiesSlice.reducer;
