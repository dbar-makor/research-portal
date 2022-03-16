import React, { useState, useEffect, useCallback } from 'react';
import { BASE_URL, END_POINT } from '../../../../../utils/constants';
import axios from 'axios';

import AllPublicationsTabsView from './AllPublicationsTabs.view';

const AllPublicationsTabs = ({ fetchStatistics }) => {
	const [value, setValue] = useState(0);
	const [publications, setPublications] = useState([]);

	const [openNewPublication, setOpenNewPublication] = useState(false);

	const handleCloseNewPublication = useCallback(() => {
		setOpenNewPublication(false);
	});

	const handleOpenNewPublication = useCallback(() => {
		setOpenNewPublication(true);
	});

	const fetchPublications = useCallback(async () => {
		try {
			const res = await axios.get(`${BASE_URL}${END_POINT.USER}/publication`);
			if (res.status === 200) {
				setPublications(res.data);
			}
		} catch (error) {
			/* eslint no-console: 0 */
			console.log(error, error.message);
		}
	});

	useEffect(() => {
		fetchPublications();
	}, []);

	const handleChange = useCallback((event, newValue) => {
		setValue(newValue);
	});

	return (
		<AllPublicationsTabsView
			publications={publications}
			value={value}
			handleChange={handleChange}
			handleOpenNewPublication={handleOpenNewPublication}
			handleCloseNewPublication={handleCloseNewPublication}
			fetchPublications={fetchPublications}
			fetchStatistics={fetchStatistics}
			openNewPublication={openNewPublication}
		/>
	);
};

AllPublicationsTabs.displayName = 'AllPublicationsTabs';
AllPublicationsTabs.defaultProps = {};

export default React.memo(AllPublicationsTabs);
