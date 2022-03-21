import React from 'react';
import TradingHourUnitView from './TradingHourUnit.view';

const TradingHourUnit = (props) => {
	const { item, classes } = props;
	return <TradingHourUnitView item={item} classes={classes}></TradingHourUnitView>;
};
TradingHourUnit.displayName = 'TradingHourUnit';
TradingHourUnit.defaultProps = {};

export default React.memo(TradingHourUnit);
