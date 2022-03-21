import React from 'react';
import { Grid } from '@material-ui/core';
import { useStyles } from '../../../../styles/MainStyles';
import TableComponent from '../../reusables/TableComponent/TableComponent';

const SalesUserInfoContainerView = (props) => {
  const classes = useStyles();
  return (
		props.companiesData.length && (
			<Grid
				item
				xs={6}
				className={classes.scrollableTableContainer}
				// onWheel={(e) => setWheel(e.nativeEvent.wheelDelta)}
				onScroll={(e) => props.handleScroll(e)}
			>
				<TableComponent data={props.companiesData} pageType="companies" scrollIndex={props.scrollIndex} />
			</Grid>
		)
	);
};

SalesUserInfoContainerView.displayName = 'SalesUserInfoContainerView';
SalesUserInfoContainerView.defaultProps = {};

export default React.memo(SalesUserInfoContainerView);
