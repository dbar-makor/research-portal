import axios from 'axios';
export const BASE_URL = process.env.REACT_APP_BASE_URL;
export const ASSETS_URL = process.env.REACT_APP_ASSETS_URL + '/';

export const END_POINT = {
	AUTH: '/auth',
	PUBLICATION: '/publication',
	FILE: '/file',
	CONTRACT: '/contract',
	SUBSCRIPTION: '/subscription',
	COMPANY: '/company',
	CATEGORIES: '/category',
	UTILS: '/utils',
	USER: '/user',
	UPGRADE: '/upgrade',
	ASSETS: '/assets',
	INVOICE: '/invoice',
	PROSPECT: '/prospect',
	COMMENT: '/comment',
	PUBLISH: '/publish',
	SETTINGS: '/settings',
};

export const setAuthToken = (token) => {
	if (token) {
		axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	} else {
		delete axios.defaults.headers.common['Authorization'];
	}
};

export const storageKeys = {
	userToken: 'token',
	userContent: 'content',
};
