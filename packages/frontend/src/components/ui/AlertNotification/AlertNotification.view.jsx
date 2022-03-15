import React from 'react';

import { Grid, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const AlertNotificationView = (props) => {
	return (
		<Grid
			item
			xs={11}
			key={props.key}
			style={{
				borderBottom: '1px solid #EDEFF3',
				paddingBottom: 8,
				backgroundColor: props.notifi.is_read ? '#FFFFFF' : '#F3F7FF',
			}}
		>
			<Link
				to={{
					pathname: `/article/${props.content.publication_id}`,
				}}
				style={{ textDecoration: 'none' }}
				onClick={(e) => props.setAsRead(e)}
			>
				<Grid container>
					<Grid item xs={12}>
						<Grid container direction="column" justifyContent="center" alignItems="flex-start">
							<Grid item>
								<Typography
									style={{
										color: '#1C67FF',
										fontSize: '14px',
										textTransform: 'capitalize',
									}}
								>
									{props.content.type}
								</Typography>
							</Grid>
							<Grid item>
								<Typography style={{ fontSize: '16px' }}>{props.content.title}</Typography>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<Grid container direction="column" justifyContent="center" alignItems="flex-end">
							<Grid item>
								<Typography style={{ fontSize: '12px', color: '#B8C3D8' }}>
									{props.TimeAgo(props.content.time)}
								</Typography>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Link>
		</Grid>
	);
};

AlertNotificationView.displayName = 'AlertNotificationView';
AlertNotificationView.defaultProps = {};

export default React.memo(AlertNotificationView);
