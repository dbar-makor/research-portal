import React, { useState, useEffect } from 'react';

import ControlBarView from './ControlBar.view';

const ControlBar = ({ setSearchTerm, makeAllRead }) => {
	const [localSearch, setLocalSearch] = useState('');
	const handleSearch = (e) => {
		if (e.key && e.key === 'Enter' && localSearch !== '') {
			setSearchTerm(localSearch);
		}
	};

	const handleClick = () => {
		makeAllRead();
	};

	useEffect(() => {
		if (localSearch === '') {
			setSearchTerm('');
		}
	}, [localSearch]);
	return (
		<ControlBarView
			setLocalSearch={setLocalSearch}
			handleSearch={handleSearch}
			handleClick={handleClick}
			localSearch={localSearch}
		></ControlBarView>
	);
};

ControlBar.displayName = 'ControlBar';
ControlBar.defaultProps = {};

export default React.memo(ControlBar);
