import React, { useState } from 'react';

import WorldMapSingleView from './WorldMapSingle.view';

const WorldMapSingle = ({ d, x, y, citiesStatus }) => {
	const [tooltipState, setTooltipState] = useState(false);

	return (
		<WorldMapSingleView
			tooltipState={tooltipState}
			setTooltipState={setTooltipState}
			d={d}
			x={x}
			y={y}
			citiesStatus={citiesStatus}
		></WorldMapSingleView>
	);
};

WorldMapSingle.displayName = 'WorldMapSingle';
WorldMapSingle.defaultProps = {};

export default React.memo(WorldMapSingle);
