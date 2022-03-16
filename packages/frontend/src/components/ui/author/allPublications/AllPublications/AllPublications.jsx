import React, { useEffect, useState, useCallback  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL, END_POINT } from '../../../../../utils/constants';
import * as utilsAction from '../../../../../redux/utils/utilsSlice';

import AllPublicationsView from './AllPublications.view';

const AllPublications = () => {
	const dispatch = useDispatch();
	const [statistics, setStatistics] = useState({});
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

	useEffect(() => {
		if (isAuthenticated) {
			dispatch(utilsAction.getUtilsAsync());
		}
	}, []);

	const fetchStatistics = useCallback(async () => {
		try {
			const res = await axios.get(`${BASE_URL}${END_POINT.USER}/statistics`);
			if (res.status === 201 || res.status === 200) {
				setStatistics(res.data);
			}
		} catch (error) {}
	});

	useEffect(() => {
		fetchStatistics();
	}, []);

	return <AllPublicationsView statistics={statistics} fetchStatistics={fetchStatistics}/>;
};

AllPublications.displayName = 'AllPublications';
AllPublications.defaultProps = {};

export default React.memo(AllPublications);
