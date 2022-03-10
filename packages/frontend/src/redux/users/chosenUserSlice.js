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

//selectors

export const selectChosenUserData = (state) => state.chosenUser.chosenUser;

//action thunk

export const getUserByIdAsync = (id) => async (dispatch) => {
	try {
		const res = await axios.get(`${BASE_URL}${END_POINT.USER}/${id}`);
		if (res.status === 200) {
			console.log('res DARTA', res.data);
			dispatch(changeChosenUser(res.data));
		}
	} catch (error) {
		console.log(error, error.message);
	}
};

// export const deleteUserAsync = (id) => async (dispatch) => {

//   try{
//     console.log("delete")
//     console.log(`${BASE_URL}${END_POINT.COMPANY}/${id}`)
//     const res = await axios.delete(`${BASE_URL}${END_POINT.USER}/${id}`);
//     console.log("res", res)
//     if(res.status === 200){
//         console.log("delete successful");
//         dispatch(setChosenUser(null));
//     }
//   }catch(err){
//     console.log(err.message);
//   }
// }

export const { changeChosenUser, setLoading } = chosenUserSlice.actions;

export default chosenUserSlice.reducer;
