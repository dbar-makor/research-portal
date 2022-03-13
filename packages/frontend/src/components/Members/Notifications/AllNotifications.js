import { useState, useEffect } from 'react';
import { Grid, Typography } from '@material-ui/core';
import * as webSocketService from '../../../services/websocket';
import { useSelector } from 'react-redux';
import { useStyles } from '../../../styles/AllNotificationStyle';
import ControlBar from './ControlBar';
import NotificationBox from './NotificationBox';
import { ReactComponent as BlueShape } from '../../../assets/icons/blueBorder.svg';

function AllNotifications() {
	const token = useSelector((state) => state.auth.token);
	const [notifications, setNotifications] = useState([]);
	const [filteredNotifications, setFilteredNotifications] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [markAsRead, setMarkAsRead] = useState(0);
	const classes = useStyles();

	useEffect(() => {
		const message = {
			type: 'get-all-notiofications',
		};
		const ws = webSocketService.sendEvent(message, token);
		ws.onmessage = (event) => {
			const data = JSON.parse(event.data);
			let allNotifications;
			switch (data.type) {
				case 'notifcations':
					allNotifications = data.notifications;
					setNotifications([...allNotifications]);
					break;
				default:
					break;
			}
		};
	}, [markAsRead]);

	useEffect(() => {
		if (searchTerm === '') {
			setFilteredNotifications(notifications);
		} else {
			const filteredResults = notifications.filter((notification) => {
				const title = JSON.parse(notification.content).title?.toLowerCase();
				return title?.includes(searchTerm?.toLowerCase());
			});
			setFilteredNotifications(filteredResults);
		}
	}, [searchTerm, notifications]);

	const makeAllRead = () => {
		const data = {
			type: 'mark-all-read',
		};
		webSocketService.sendEvent(data, token);
		setMarkAsRead((prev) => prev + 1);
	};

	return (
		<Grid container className={classes.page}>
			<Grid item xs={2} className={classes.sideColumn}>
				<Grid container className={classes.sideColumnContainer}>
					<Grid item>
						<BlueShape />
					</Grid>
					<Grid item>
						<Typography className={classes.pageTitle}>Notifications</Typography>
					</Grid>
				</Grid>
			</Grid>

			<Grid item xs={6} className={classes.mainColumn}>
				<Grid container className={classes.mainColumnContainer}>
					<Grid item xs={12}>
						<ControlBar setSearchTerm={setSearchTerm} makeAllRead={makeAllRead} />
					</Grid>

					<Grid item xs={12}>
						<Grid container className={classes.notListContainer}>
							{filteredNotifications.length &&
								filteredNotifications.map((item) => {
									const content = JSON.parse(item.content);
									return (
										<NotificationBox
											key={item.id}
											content={content}
											isRead={item.is_read}
										/>
									);
								})}
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}

export default AllNotifications;
