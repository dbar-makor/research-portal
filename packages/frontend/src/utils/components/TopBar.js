import {
	AppBar,
	Avatar,
	Button,
	ClickAwayListener,
	Grid,
	IconButton,
	makeStyles,
	MenuItem,
	Paper,
	Popover,
	Popper,
	Toolbar,
	Typography,
	withStyles,
	Grow,
	MenuList,
	FormControl,
	InputLabel,
} from '@material-ui/core';
import { ReactComponent as SearchIcon } from '../../assets/icons/IconSearch.svg';
import { StyledTextField } from '../../styles/MainStyles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as actionAuth from '../../redux/auth/action';
import { ReactComponent as MakorLogo } from '../../assets/icons/makorLogo.svg';
import { ReactComponent as Greendot } from '../../assets/icons/greenDot.svg';
import { ReactComponent as Notification } from '../../assets/icons/Notifiaction.svg';
import { useEffect, useRef, useState } from 'react';
import * as webSocketService from '../../services/websocket';
import AlertNotification from '../../components/Notifications/AlertNotification';
import TradingHours from './TradingHours';
import SelectInputUnit from '../../components/Reusables/SelectInputUnit';

function TopBar(props) {
	const history = useHistory();
	const classes = useStyles();
	const dispatch = useDispatch();
	const member = useSelector((state) => state.auth.userContent);
	const token = useSelector((state) => state.auth.token);

	const anchorRef = useRef(null);
	const [open, setOpen] = useState(false);

	const notifyRef = useRef(null);
	const [openNotification, setOpenNotification] = useState(false);

	const userMgmtRef = useRef(null);
	const [openUserMgmt, setOpenUserMgmt] = useState(false);

	const [newNotification, setNewNotification] = useState(false);

	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const userType = useSelector((state) => state.auth.userContent?.type);
	const [anchorEl, setAnchorEl] = useState(null);
	const id = openNotification ? 'simple-popper' : undefined;
	const [notifications, setNotifications] = useState([]);
	const [countAlerts, setCountAlerts] = useState(0);
	const [region, setRegion] = useState('Region1');
	const options = [
		{ value: 'region1', name: 'Region1' },
		{ value: 'region2', name: 'Region2' },
		{ value: 'region3', name: 'Region3' },
	];
	const webSocket = useRef(null);

	useEffect(() => {
		console.log('rerender');
		webSocket.current = webSocketService.connectWS(token);
		webSocket.current.onopen = (e) => {
			console.log('Connection established!');
			let message = {
				type: 'get-notifications',
			};
			message = JSON.stringify(message);
			webSocket.current.send(message);
		};
		webSocket.current.onmessage = (message) => {
			message = JSON.parse(message.data);
			switch (message.type) {
			case 'alert':
				console.log('NOTIFICATIONS', message.notifications);
				setNotifications([...message.notifications]);
				break;
			case 'succeed':
				console.log('succeed');
				break;
			default:
				let send = {
					type: 'get-notifications',
					is_new: true,
					id: message.id,
				};
				send = JSON.stringify(send);
				webSocket.current.send(send);
				setCountAlerts((counter) => counter + 1);
				setNewNotification(true);
				break;
			}
		};
		return () => webSocket.current.close();
	}, []);

	console.log('notifications', notifications);

	const handleToggle = (type) => {
		if (type === 'user') {
			setOpen((prevOpen) => !prevOpen);
			setOpenNotification(false);
			setOpenUserMgmt(false);
		} else if (type === 'notify') {
			setOpenNotification((prevOpen) => !prevOpen);
			setNewNotification(false);
			setOpen(false);
			setOpenUserMgmt(false);
		} else if (type == 'user_mgmt') {
			setOpenUserMgmt((prevOpen) => !prevOpen);
			setOpen(false);
			setOpenNotification(false);
		}
	};

	const handleClose = (event, type) => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return;
		}
		if (type === 'user') {
			setOpen(false);
		} else if (type === 'notify') {
			setOpenNotification(false);
		} else if (type === 'user_mgmt') {
			setOpenUserMgmt(false);
		}
	};
	const handleLogout = () => {
		// dispatch({type: LOGOUT_SUCCESS})
		dispatch(actionAuth.logout());
	};

	function handleListKeyDown(event) {
		console.log(event.key, 'KEY');
		if (event.key === 'Tab') {
			event.preventDefault();
			setOpen(false);
		} else if (event.key === 'Escape') {
			setOpen(false);
		}
	}

	function adminGoTo(pathName) {
		setOpenUserMgmt(false);
		history.push(pathName);
	}
	const hendleBarOptions = (userType) => {
		switch (userType) {
		case 'admin':
			return null;
		case 'client' || 'prospect':
			return (
				<Grid item xs={8}>
					<Grid container>
						<Grid item xs={4}>
							<Grid container style={{ marginTop: '10px', marginLeft: '-25px' }}>
								<Grid item xs={4}>
									<Link to="/home" className={classes.link}>
										<Typography className={classes.title}>Home</Typography>
									</Link>
								</Grid>
								<Grid item xs={4}>
									<Link to={'/'} className={classes.styledLinks}>
											Ideas
									</Link>
								</Grid>
								<Grid item xs={4}>
									<Link to={'/'} className={classes.styledLinks}>
											Mkt Calendar
									</Link>
								</Grid>
							</Grid>
						</Grid>
						<Grid item xs={7}>
							<Grid
								container
								direction="row"
								justifyContent="flex-end"
								alignItems="center"
								style={{ marginLeft: '-25px' }}
							>
								<Grid item xs={3} style={{ paddingLeft: '50px' }}>
									<SelectInputUnit
										className={classes.select}
										mode="minimalistic"
										variant="standard"
										optionLabelField="name"
										valueField="value"
										placeholder="All Regions"
										optionsArray={options}
									></SelectInputUnit>
								</Grid>

								<Grid item xs={8} style={{ paddingRight: '250px' }}>
									<StyledTextField
										className={classes.search}
										// value={localSearch}
										// onChange={(e) => setLocalSearch(e.target.value)}
										// onKeyDown={(e) => (e.key === 'Enter' ? dispatch(setProperty({ key: 'search', value: localSearch })) : null)}
										variant="filled"
										fullWidth
										placeholder="Idea/Ticker"
										InputProps={{
											endAdornment: (
												<SearchIcon
													className={classes.searchIcon}
													style={{ cursor: 'pointer' }}
												/>
											),
										}}
									/>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			);
		case 'sales':
			return (
				<Grid item xs={3} style={{ marginRight: 113 }}>
					<Grid container justifyContent="space-between">
						<Grid item>
							<Link to={'/companies'} className={classes.styledLinks}>
									Companies
							</Link>
						</Grid>
						<Grid>
							<Link to={'/contracts'} className={classes.styledLinks}>
									Contracts
							</Link>
						</Grid>
						<Grid>
							<Link to={'/invoices'} className={classes.styledLinks}>
									Invoices
							</Link>
						</Grid>
					</Grid>
				</Grid>
			);
		case 'author':
			return (
				<Grid item xs={3} style={{ marginRight: 113 }}>
					<Grid container justifyContent="flex-end">
						<Grid item>
							<Link to={'/researches'} className={classes.styledLinks}>
									My Articles
							</Link>
						</Grid>
					</Grid>
				</Grid>
			);
		case 'admin':
			return (
				<Grid item xs={3} style={{ marginRight: 113 }}>
					<Grid container justifyContent="flex-end">
						<Grid item>
							<Grid container alignItems="center">
								<Grid item>
									<Typography
										style={{
											fontSize: 16,
											color: '#fffff',
											cursor: 'pointer',
											fontWeight: 300,
										}}
										onClick={() => handleToggle('user_mgmt')}
									>
											Users Managment
									</Typography>
								</Grid>
								<Grid item>
									<IconButton
										size="small"
										ref={userMgmtRef}
										aria-controls={openUserMgmt ? 'composition-menu' : undefined}
										aria-expanded={openUserMgmt ? 'true' : undefined}
										aria-haspopup="true"
										onClick={() => handleToggle('user_mgmt')}
									>
										{openUserMgmt ? (
											<ExpandLessIcon style={{ color: '#ffff' }} />
										) : (
											<ExpandMoreIcon style={{ color: '#ffff' }} />
										)}
									</IconButton>
								</Grid>
							</Grid>
							<Popper
								open={openUserMgmt}
								anchorEl={userMgmtRef.current}
								role={undefined}
								placement="bottom"
								transition
								disablePortal
								modifiers={{
									offset: {
										enabled: true,
										offset: userType === 'client' ? '-150, 10' : '-80, 10',
									},
								}}
							>
								{({ TransitionProps, placement }) => (
									<Grow
										{...TransitionProps}
										style={{
											transformOrigin:
													placement === 'bottom-start'
														? 'right top'
														: 'right bottom',
										}}
									>
										<Paper>
											<ClickAwayListener
												onClickAway={(e) => handleClose(e, 'user_mgmt')}
											>
												<MenuList
													autoFocusItem={open}
													id="composition-menu"
													aria-labelledby="composition-button"
												>
													<MenuItem onClick={() => adminGoTo('/sales')}>
															Sales
													</MenuItem>
													<MenuItem onClick={() => adminGoTo('/companies')}>
															Companies Page
													</MenuItem>
													<MenuItem onClick={() => adminGoTo('/authors')}>
															Authors Page
													</MenuItem>
												</MenuList>
											</ClickAwayListener>
										</Paper>
									</Grow>
								)}
							</Popper>
						</Grid>
					</Grid>
				</Grid>
			);
		}
	};
	const redirect = (type) => {
		switch (type) {
		case 'all_notfications':
			history.push('/all_notfications');
			setOpenNotification(false);
		}
	};

	return (
		<>
			<Grid container direction="column">
				<Grid item style={{ backgroundColor: '#000', borderBottom: '1px solid #353535' }}>
					<TradingHours></TradingHours>
				</Grid>
				<Grid item>
					<AppBar position="sticky" className={classes.header}>
						<Toolbar>
							<Grid item xs={4} className={classes.gridSpacing} style={{ marginLeft: '380px' }}>
								<Link
									to={
										userType === 'author'
											? '/researches'
											: userType === 'sales'
												? '/companies'
												: '/home'
									}
									className={classes.link}
								>
									<MakorLogo />
								</Link>
							</Grid>
							{/* <Grid item style={{ flexGrow: 1 }}>
          <Link to={userType === 'author' ? '/researches' : userType === 'sales' ? '/companies' : '/home'} className={classes.link}>
            <Typography className={classes.title}>Home</Typography>
          </Link>
        </Grid> */}
							{isAuthenticated ? (
								<>
									{hendleBarOptions(userType)}
									{/*
                  notify POPPER */}
									{/* <Grid item>
              <Grid container alignItems="center" style={{ marginRight: 70 }}>
                <Grid item style={{ marginRight: 20 }}>
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
                    onKeyDown={(e) => handleListKeyDown(e)}
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
                              <Grid container justifyContent="space-between" alignItems="center" style={{ borderBottom: '1px solid #EDEFF3', paddingBottom: 8 }}>
                                <Grid item>
                                  <Typography style={{ fontSize: 14 }}>Notifications</Typography>
                                </Grid>

                                <Grid item>
                                  <Grid container>
                                    <Grid item style={{ backgroundColor: '#1C67FF', color: '#fff', borderRadius: 11, paddingInline: 10 }}>
                                      <Typography style={{ fontSize: 12 }}>{countAlerts > 0 ? `${countAlerts} New` : 'No New'}</Typography>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                            {notifications &&
                              notifications.map((notifi, index) => {
                                return <AlertNotification key={index} handleClose={handleClose} notifi={notifi} setCountAlerts={setCountAlerts} />;
                              })}
                            <Grid item align="center" onClick={() => redirect('all_notfications')} style={{ cursor: 'pointer' }}>
                              <Typography style={{ fontSize: 14, color: '#000', fontWeight: 'bold', textDecoration: 'none' }}>View All</Typography>
                            </Grid>
                          </Grid>
                        </MenuList>
                      </Paper>
                    </ClickAwayListener>
                  </Popper>
                </Grid>

                <Grid item>
                  <Avatar src={`${member.avatar}`} />
                </Grid>
                <Grid item>
                  <IconButton
                    size="small"
                    ref={anchorRef}
                    aria-controls={open ? 'composition-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={() => handleToggle('user')}
                  >
                    <ExpandMoreIcon style={{ color: '#ffff' }} />
                  </IconButton>
                  <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    placement="bottom-start"
                    transition
                    disablePortal
                    modifiers={{
                      offset: {
                        enabled: true,
                        offset: userType === 'client' ? '-150, 10' : '-80, 10',
                      },
                    }}
                  >
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        style={{
                          transformOrigin: placement === 'bottom-start' ? 'right top' : 'right bottom',
                        }}
                      >
                        <Paper>
                          <ClickAwayListener onClickAway={(e) => handleClose(e, 'user')}>
                            <MenuList autoFocusItem={open} id="composition-menu" aria-labelledby="composition-button">
                              {userType === 'client' || userType === 'prospect' ? (
                                <>
                                  <MenuItem>
                                    <Link to={'/home'} style={{ textDecoration: 'none', color: '#bababa', fontSize: 14 }}>{`Hey , ${member.name}`}</Link>
                                  </MenuItem>
                                  <MenuItem>
                                    <Link to={'/settings/edit'} onClick={() => setOpen(false)} style={{ textDecoration: 'none', color: '#000' }}>
                                      Edit Profile
                                    </Link>
                                  </MenuItem>
                                  <MenuItem>
                                    <Link to={'/settings/settings'} onClick={() => setOpen(false)} style={{ textDecoration: 'none', color: '#000' }}>
                                      Settings
                                    </Link>
                                  </MenuItem>
                                  <MenuItem>
                                    <Link to={'/settings/contract_trails'} onClick={() => setOpen(false)}  style={{ textDecoration: 'none', color: '#000' }}>
                                      Contracts & Trails
                                    </Link>
                                  </MenuItem>
                                </>
                              ) : null}
                              <MenuItem onClick={handleLogout} style={{ color: '#FF0000' }}>
                                <ExitToAppIcon />
                                Logout
                              </MenuItem>
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                </Grid>
              </Grid>
            </Grid> */}
								</>
							) : (
								<Grid item style={{ paddingRight: 80 }}>
									<Grid container justifyContent="space-between">
										<Grid item style={{ paddingRight: 20 }}>
											<StyledButton>Become a Costumer</StyledButton>
										</Grid>
										<Grid item>
											<LoginButton>Login</LoginButton>
										</Grid>
									</Grid>
								</Grid>
							)}
						</Toolbar>
					</AppBar>
				</Grid>
			</Grid>
		</>
	);
}

export default TopBar;

const StyledPop = withStyles({
	position: 'relative',
	top: 455,
	root: {
		'& .MuiPopover-paper': {
			minHeight: '30px',
			minWidth: 125,
		},
	},
})(Popover);

const useStyles = makeStyles((theme) => ({
	header: {
		backgroundColor: '#000000',
	},
	title: {
		flexGrow: 1,
		color: '##fff',
		fontSize: 16,
	},
	link: {
		textDecoration: 'none',
		color: '#fff',
	},
	subTitle: {
		color: '#000000',
		fontSize: '20px',
	},
	styledLinks: {
		fontSize: 16,
		textDecoration: 'none',
		color: '#ffff',
	},
	label: {
		top: -10,
		color: '#686d7d',
	},
	gridSpacing: {
		marginRight: theme.spacing(2),
		marginLeft: theme.spacing(10),
	},
	formControl: {
		display: 'block',
	},
	select: {
		'marginBottom': '15px',
		'& svg': {
			stroke: '#727789',
			fill: 'transparent',
			paddingTop: '5px',
			paddingRight: '30px',
		},

		'& .MuiSelect-nativeInput': {
			opacity: 1,
			color: '#ffff',
			fontSize: '16px',
			backgroundColor: '#000',
			border: 'none',
		},
		'& .MuiInput-underline:after': {
			border: 'none',
		},
	},
	search: {
		'width': '250px',
		'& .MuiFilledInput-root': {
			backgroundColor: '#3e3e3e',
			borderRadius: '5px',
		},
		'& .MuiFilledInput-input': {
			paddingTop: '5px',
			paddingBottom: '5px',
		},
		'& .MuiFilledInput-underline:after': {
			border: 'none',
		},
		'& svg': {
			stroke: '#FFF',
		},
		'& .MuiInputBase-input': {
			'&::placeholder': {
				color: '#fff',
			},
		},
	},
	searchIcon: {
		'& path': {
			fill: '#1C67FF',
		},
	},
}));

export const StyledButton = withStyles((theme) => ({
	root: {
		'width': '185px',
		'height': '30px',
		'textTransform': 'none',
		'fontWeight': 400,
		'backgroundColor': '#1C67FF',
		'borderRadius': 21,
		'color': '#F2F2F2',
		'&:hover': {
			backgroundColor: '#1c67ffb3',
		},
	},
}))(Button);

export const LoginButton = withStyles((theme) => ({
	root: {
		'width': '122px',
		'height': '30px',
		'textTransform': 'none',
		'fontWeight': 400,
		'backgroundColor': '#ffffff',
		'borderRadius': 21,
		'color': '#000000',
		'&:hover': {
			backgroundColor: '#000',
			backgroundColor: '#ffff',
		},
	},
}))(Button);
