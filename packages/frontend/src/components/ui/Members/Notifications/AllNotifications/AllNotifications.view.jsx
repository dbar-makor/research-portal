import React from 'react';

import { Grid, Typography } from '@material-ui/core';
import ControlBar from '../ControlBar/ControlBar';
import NotificationBox from '../NotificationBox/NotificationBox';
import { ReactComponent as BlueShape } from '../../../../../assets/icons/blueBorder.svg';

const AllNotificationsView = (props) => {
	return (
		<Grid container className={props.classes.page}>
			<Grid item xs={2} className={props.classes.sideColumn}>
				<Grid container className={props.classes.sideColumnContainer}>
					<Grid item>
						<BlueShape />
					</Grid>
					<Grid item>
						<Typography className={props.classes.pageTitle}>Notifications</Typography>
					</Grid>
				</Grid>
			</Grid>

			<Grid item xs={6} className={props.classes.mainColumn}>
				<Grid container className={props.classes.mainColumnContainer}>
					<Grid item xs={12}>
						<ControlBar setSearchTerm={props.setSearchTerm} makeAllRead={props.makeAllRead} />
					</Grid>

					<Grid item xs={12}>
						<Grid container className={props.classes.notListContainer}>
							{props.filteredNotifications.length &&
								props.filteredNotifications.map((item) => {
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
};

AllNotificationsView.displayName = 'AllNotificationsView';
AllNotificationsView.defaultProps = {};

export default React.memo(AllNotificationsView);
