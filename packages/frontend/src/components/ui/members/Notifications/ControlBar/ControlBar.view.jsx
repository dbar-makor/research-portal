import React from 'react';

import { useStyles } from '../../../../../styles/AllNotificationStyle';
import { StyledTextField } from '../../../../../styles/MainStyles';
import { Grid, Typography } from '@material-ui/core';
import { ReactComponent as SearchIcon } from '../../../../../assets/icons/IconSearch.svg';

const ControlBarView = (props) => {
	const classes = useStyles();
	return (
		<Grid container className={classes.controlBarContainer}>
			<Grid item>
				<Typography className={classes.link} onClick={props.handleClick}>
					Mark All as Read
				</Typography>
			</Grid>
			<Grid item>
				<StyledTextField
					value={props.localSearch}
					onChange={(e) => props.setLocalSearch(e.target.value)}
					onKeyDown={props.handleSearch}
					variant="outlined"
					fullWidth
					placeholder="Search"
					InputProps={{
						endAdornment: (
							<SearchIcon
								className={classes.searchIcon}
								onClick={() => {
									props.setSearchTerm(props.localSearch);
								}}
							/>
						),
					}}
				/>
			</Grid>
		</Grid>
	);
};

ControlBarView.displayName = 'ControlBarView';
ControlBarView.defaultProps = {};

export default React.memo(ControlBarView);
