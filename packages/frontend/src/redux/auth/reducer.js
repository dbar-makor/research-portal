import {
	TOW_FA_STEP_ONE_SIX_DIGIT,
	SET_LOADING_INDICATOR_2FA,
	TOW_FA_STEP_ONE_MOBILE_APPLICATION,
	LOGIN_SUCCESS,
	SET_LOADING_INDICATOR_AUTH,
	SET_CREDENTIALS_2FA,
	CLEAR_2FA,
	LOGOUT_SUCCESS,
} from './constants';
import StorageService from '../../services/storage';

const initialState = {
	token: '',
	isAuthenticated: false,
	loadingIndicator: false,
	userContent: {},
	twoFactAuth: {
		username: null,
		password: null,
		token: null,
		hiddenEmail: null,
		loadingIndicator2FA: false,
		deviceId: null,
		digitAnswer: null,
		userId: null,
	},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
	switch (action.type) {
		case TOW_FA_STEP_ONE_SIX_DIGIT:
			return {
				...state,
				twoFactAuth: {
					...state.twoFactAuth,
					deviceId: null,
					digitAnswer: null,
					userId: null,
					token: action.payload.token,
					hiddenEmail: action.payload.email,
				},
			};
		case TOW_FA_STEP_ONE_MOBILE_APPLICATION:
			return {
				...state,
				twoFactAuth: {
					...state.twoFactAuth,
					token: null,
					deviceId: action.payload.device_id,
					digitAnswer: action.payload.digitAnswer,
					hiddenEmail: action.payload.email,
					userId: action.payload.user_id,
				},
			};
		case SET_CREDENTIALS_2FA:
			return {
				...state,
				twoFactAuth: {
					...state.twoFactAuth,
					username: action.payload.username,
					password: action.payload.password,
				},
			};
		case CLEAR_2FA:
			return {
				...state,
				twoFactAuth: {
					...initialState.twoFactAuth,
				},
			};
		case SET_LOADING_INDICATOR_AUTH:
			return {
				...state,
				loadingIndicator: action.payload,
			};
		case SET_LOADING_INDICATOR_2FA:
			return {
				...state,
				twoFactAuth: {
					...state.twoFactAuth,
					loadingIndicator2FA: action.payload,
				},
			};
		case LOGIN_SUCCESS:
			return {
				...state,
				isAuthenticated: true,
				userContent: action.payload.userContent,
				token: action.payload.token,
				twoFactAuth: {
					token: null,
					hiddenEmail: null,
					loadingIndicator2FA: false,
					deviceId: null,
					digitAnswer: null,
					userId: null,
				},
			};
		case LOGOUT_SUCCESS:
			return {
				...state,
				token: '',
				isAuthenticated: false,
				loadingIndicator: false,
				userContent: {},
			};
		// StorageService.clear()
		// return initialState
		default:
			return state;
	}
};
