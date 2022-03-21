import React from 'react';
import { useStyles } from '../../../styles/MainStyles';
import { Grid } from '@material-ui/core';
import BellNotifications from '../topbarParts/BellNotifications/BellNotifications';
import UserIcon from '../topbarParts/UserIcon/UserIcon';
import TradingHourUnit from '../topbarParts/TradingHourUnit/TradingHourUnit';

const TradingHoursView = (props) => {
	const classes = useStyles();

	return (
		<Grid container className={classes.topTopWrapper}>
			<Grid item xs={9} container direction="row" className={classes.cityWrapper}>
				{props.formattedData.map((item, key) => {
					return <TradingHourUnit key={key} item={item} classes={classes} />;
				})}
			</Grid>
			<Grid
				item
				xs={3}
				container
				alignItems="center"
				justifyContent="flex-end"
				className={classes.userBarWrapper}
			>
				<Grid item xs={1}>
					<BellNotifications
						handleToggle={props.handleToggle}
						notifications={props.notifications}
						openNotification={props.openNotification}
						setOpenNotification={props.setOpenNotification}
						handleListKeyDown={props.handleListKeyDown}
						handleClose={props.handleClose}
					/>
				</Grid>
				<Grid item xs={3}>
					<UserIcon
						ref={props.anchorRef}
						handleToggle={props.handleToggle}
						userType={props.userType}
						handleClose={props.handleClose}
						setOpen={props.setOpen}
						open={props.open}
					/>
				</Grid>
			</Grid>
		</Grid>
	);
};

TradingHoursView.displayName = 'TradingHoursView';
TradingHoursView.defaultProps = {};

export default React.memo(TradingHoursView);
