import { Grid,	IconButton, Popper, Paper, Typography, ClickAwayListener, MenuList } from '@material-ui/core';
import { useState, useRef } from 'react';
import AlertNotification from '../../../components/Notifications/AlertNotification';
import { ReactComponent as Notification } from '../../../assets/icons/Notifiaction.svg';
import { ReactComponent as Greendot } from '../../../assets/icons/greenDot.svg';

const BellNotifications = ({
	handleToggle,
	notifications,
	handleListKeyDown,
	handleClose,
	openNotification,
	setOpenNotification,
}) => {
	const notifyRef = useRef(null);
	// eslint-disable-next-line no-unused-vars
	const [newNotification, setNewNotification] = useState(false);

	const id = openNotification ? 'simple-popper' : undefined;
	const [countAlerts, setCountAlerts] = useState(0);

	const redirect = (type) => {
		switch (type) {
			case 'all_notfications':
				history.push('/all_notfications');
				setOpenNotification(false);
		}
	};

	return (
		<>
			<IconButton
				size="small"
				ref={notifyRef}
				aria-controls={open ? 'composition-menu' : undefined}
				aria-expanded={open ? 'true' : undefined}
				aria-haspopup="true"
				onClick={() => handleToggle('notify')}
			>
				<Notification style={{ position: 'relative' }} />
				{newNotification ? <Greendot style={{ position: 'absolute', top: 2, left: 13 }} /> : null}
			</IconButton>
			<Popper
				id={id}
				open={openNotification}
				anchorEl={notifyRef.current}
				role={undefined}
				placement="bottom"
				transition
				disablePortal
				onKeyDown={(e) => handleListKeyDown(e, 'notify')}
                style={{zIndex: 1200}}
				modifiers={{
					offset: {
						enabled: true,
						offset: 'none, 12',
					},
				}}
			>
				<ClickAwayListener onClickAway={(e) => handleClose(e, 'notify')}>
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
														{countAlerts > 0 ? `${countAlerts} New` : 'No New'}
													</Typography>
												</Grid>
											</Grid>
										</Grid>
									</Grid>
								</Grid>
								{notifications &&
									notifications.map((notifi, index) => {
										return (
											<AlertNotification
												key={index}
												handleClose={handleClose}
												notifi={notifi}
												setCountAlerts={setCountAlerts}
											/>
										);
									})}
								<Grid
									item
									align="center"
									onClick={() => redirect('all_notfications')}
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

export default BellNotifications;
