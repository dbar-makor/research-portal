import React from 'react';
import { Grid,	IconButton, Popper, Paper, Typography, ClickAwayListener, MenuList } from '@material-ui/core';
import { ReactComponent as Notification } from '../../../../assets/icons/Notifiaction.svg';
import { ReactComponent as Greendot } from '../../../../assets/icons/greenDot.svg';
import AlertNotification from '../../../Notifications/AlertNotification';

//import useStyles from './BellNotifications.style';

const BellNotificationsView = (props) => {

  return (
		<>
			<IconButton
				size="small"
				ref={props.notifyRef}
				aria-controls={props.open ? 'composition-menu' : undefined}
				aria-expanded={props.open ? 'true' : undefined}
				aria-haspopup="true"
				onClick={() => props.handleToggle('notify')}
			>
				<Notification style={{ position: 'relative' }} />
				{props.newNotification ? <Greendot style={{ position: 'absolute', top: 2, left: 13 }} /> : null}
			</IconButton>
			<Popper
				id={props.id}
				open={props.openNotification}
				anchorEl={props.notifyRef.current}
				role={undefined}
				placement="bottom"
				transition
				disablePortal
				onKeyDown={(e) => props.handleListKeyDown(e, 'notify')}
                style={{zIndex: 1200}}
				modifiers={{
					offset: {
						enabled: true,
						offset: 'none, 12',
					},
				}}
			>
				<ClickAwayListener onClickAway={(e) => props.handleClose(e, 'notify')}>
					<Paper elevation={1} style={{ position: 'relative', width: '297px' }}>
						<div
							style={{
								position: 'absolute',
								transform: 'rotate(45deg) translateX(-50%)',
								transformOrigin: 'center',
								backgroundColor: '#fff',
								top: 19,
								width: 50,
								height: 50,
								zIndex: -1,
								left: '48%',
								borderRadius: 3,
							}}
						></div>
						<MenuList>
							<Grid container direction="row" spacing={2} justifyContent="center">
								<Grid item xs={11}>
									<Grid
										container
										justifyContent="space-between"
										alignItems="center"
										style={{
											borderBottom: '1px solid #EDEFF3',
											paddingBottom: 8,
										}}
									>
										<Grid item>
											<Typography style={{ fontSize: 14 }}>Notifications</Typography>
										</Grid>

										<Grid item>
											<Grid container>
												<Grid
													item
													style={{
														backgroundColor: '#1C67FF',
														color: '#fff',
														borderRadius: 11,
														paddingInline: 10,
													}}
												>
													<Typography style={{ fontSize: 12 }}>
														{props.countAlerts > 0 ? `${props.countAlerts} New` : 'No New'}
													</Typography>
												</Grid>
											</Grid>
										</Grid>
									</Grid>
								</Grid>
								{props.notifications &&
									props.notifications.map((notifi, index) => {
										return (
											<AlertNotification
												key={index}
												handleClose={props.handleClose}
												notifi={notifi}
												setCountAlerts={props.setCountAlerts}
											/>
										);
									})}
								<Grid
									item
									align="center"
									onClick={() => props.redirect('all_notfications')}
									style={{ cursor: 'pointer' }}
								>
									<Typography
										style={{
											fontSize: 14,
											color: '#000',
											fontWeight: 'bold',
											textDecoration: 'none',
										}}
									>
										View All
									</Typography>
								</Grid>
							</Grid>
						</MenuList>
					</Paper>
				</ClickAwayListener>
			</Popper>
		</>
	);
};

BellNotificationsView.displayName = 'BellNotificationsView';
BellNotificationsView.defaultProps = {};

export default React.memo(BellNotificationsView);
