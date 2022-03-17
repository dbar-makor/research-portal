import { Grid } from '@material-ui/core';
import tradingHoursData from '../../components/layout/dummy.json';
import { useStyles } from '../../styles/MainStyles';
import BellNotifications from '../../components/layout/topbarParts/BellNotifications/BellNotifications';
import UserIcon from '../../components/layout/topbarParts/UserIcon/UserIcon';
import TradingHourUnit  from '../../components/layout/topbarParts/TradingHourUnit/TradingHourUnit';

const TradingHours = ({
	handleToggle,
	notifications,
	openNotification,
	setOpenNotification,
	handleListKeyDown,
	handleClose,
	anchorRef,
	userType,
	setOpen,
	open,
}) => {
	const classes = useStyles();
	const data = tradingHoursData.data;
	const formattedData = Object.entries(data).map(([key, value]) => {
		return { country: key, status: value.status, time: value.local_time.substring(11, 16) };
	});
	return (
		<Grid container className={classes.topTopWrapper}>
			<Grid item xs={9} container direction="row" className={classes.cityWrapper}>
				{formattedData.map((item) => {
					return <TradingHourUnit item={item} classes={classes} key={item.city} />;
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
						handleToggle={handleToggle}
						notifications={notifications}
						openNotification={openNotification}
						setOpenNotification={setOpenNotification}
						handleListKeyDown={handleListKeyDown}
						handleClose={handleClose}
						open={open}
					/>
				</Grid>
				<Grid item xs={3}>
					<UserIcon
						ref={anchorRef}
						handleToggle={handleToggle}
						userType={userType}
						handleClose={handleClose}
						setOpen={setOpen}
						open={open}
					/>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default TradingHours;
