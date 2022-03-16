import { AppBar, Button, Grid, makeStyles, Toolbar, withStyles, Divider } from '@material-ui/core';

import { useSelector } from 'react-redux';
// import { ReactComponent as MakorLogo } from '../../assets/icons/makorLogo.svg';
import { useEffect, useRef, useState } from 'react';
import * as webSocketService from '../../services/websocket';
import TradingHours from './TradingHours';
import MemberTopbar from './topbarParts/MemberTopbar';
import SalesTopbar from './topbarParts/SalesTopbar';
import AuthorTopbar from './topbarParts/AuthorTopbar';
import AdminTopbar from './topbarParts/AdminTopbar';
import MakorLogo from './topbarParts/MakorLogo';

const useStyles = makeStyles((theme) => ({
	headerContainer: {
		position: 'sticky',
		top: 0,
		backgroundColor: ' rgba(0, 0, 0, 1)',
		zIndex: 1200,
	},
	header: {
		backgroundColor: '#000000',
		width: 'inherit',
		flexDirection: 'row',
	},
	divider: {
		backgroundColor: '#353535',
		height: 2,
		width: '100%',
	},
	title: {
		flexGrow: 1,
		color: '##fff',
		fontSize: 16,
	},
	link: {
		textDecoration: 'none',
		color: '#fff',
		// '&:hover': {
		// 	cursor: 'pointer',
		// },
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
			paddingTop: '3px',
		},
		'& select': {
			color: '#fff',
			border: 'none',
			outline: 'none',
			paddingTop: 12,
			'&::placeholder':{
				color: '#fff',
			},
		},
		'& option': {
			paddingBottom: 10,
			color: '#000',
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

export const StyledButton = withStyles(() => ({
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

export const LoginButton = withStyles(() => ({
	root: {
		'width': '122px',
		'height': '30px',
		'textTransform': 'none',
		'fontWeight': 400,
		'backgroundColor': '#ffffff',
		'borderRadius': 21,
		'color': '#000000',
		'&:hover': {
			backgroundColor: '#ffff',
		},
	},
}))(Button);

function TopBar() {
	const classes = useStyles();
	const token = useSelector((state) => state.auth.token);

	const anchorRef = useRef(null);
	const [open, setOpen] = useState(false);
	const [openNotification, setOpenNotification] = useState(false);

	const [openUserMgmt, setOpenUserMgmt] = useState(false);

	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const userType = useSelector((state) => state.auth.userContent?.type);
	// eslint-disable-next-line no-unused-vars
	const [notifications, setNotifications] = useState([]);
	// eslint-disable-next-line no-unused-vars

	const options = [
		{ value: 'region1', name: 'Region1' },
		{ value: 'region2', name: 'Region2' },
		{ value: 'region3', name: 'Region3' },
	];
	const webSocket = useRef(null);

	function handleListKeyDown(event, type) {
		if (event.key === 'Tab') {
			event.preventDefault();
			setOpen(false);
			if (type === 'notify') {
				setOpenNotification(false);
			}
		} else if (event.key === 'Escape') {
			setOpen(false);
			if (type === 'notify') {
				setOpenNotification(false);
			}
		}
	}

	useEffect(() => {
		webSocket.current = webSocketService.connectWS(token);
		webSocket.current.onopen = () => {
			let message = {
				type: 'get-notifications',
			};
			message = JSON.stringify(message);
			webSocket.current.send(message);
		};
		webSocket.current.onmessage = (message) => {
			message = JSON.parse(message.data);
			let send = {};
			switch (message.type) {
				case 'alert':
					setNotifications([...message.notifications]);
					break;
				case 'succeed':
					break;
				default:
					send = {
						type: 'get-notifications',
						is_new: true,
						id: message.id,
					};
					send = JSON.stringify(send);
					webSocket.current.send(send);
					break;
			}
		};
		return () => webSocket.current.close();
	}, []);

	const handleToggle = (type) => {
		if (type === 'user') {
			setOpen((prevOpen) => !prevOpen);
			setOpenUserMgmt(false);
		} else if (type === 'notify') {
			setOpenNotification(true);
			setOpen(false);
			setOpenUserMgmt(false);
		} else if (type === 'user_mgmt') {
			setOpenUserMgmt((prevOpen) => !prevOpen);
			setOpen(false);
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
			return;
		} else if (type === 'user_mgmt') {
			setOpenUserMgmt(false);
		}
	};

	const handleBarOptions = (userType) => {
		switch (userType) {
			case 'client' || 'prospect':
				return <MemberTopbar classes={classes} options={options} />;
			case 'sales':
				return <SalesTopbar classes={classes} />;
			case 'author':
				return <AuthorTopbar classes={classes} />;
			case 'admin':
				return (
					<AdminTopbar
						handleToggle={handleToggle}
						classes={classes}
						openUserMgmt={openUserMgmt}
						setOpenUserMgmt={setOpenUserMgmt}
						userType={userType}
						handleClose={handleClose}
					/>
				);
		}
	};

	return (
		<>
			<Grid container direction="column" className={`${classes.headerContainer} header`}>
				<Grid item style={{ backgroundColor: '#000', width: '70vw', margin: '0 auto' }}>
					<TradingHours
						handleToggle={handleToggle}
						notifications={notifications}
						openNotification={openNotification}
						setOpenNotification={setOpenNotification}
						handleListKeyDown={handleListKeyDown}
						handleClose={handleClose}
						anchorRef={anchorRef}
						userType={userType}
						setOpen={setOpen}
						open={open}
					/>
				</Grid>
				<Divider className={classes.divider} />
				<Grid item style={{ backgroundColor: '#000', width: '70vw', margin: '0 auto' }}>
					<AppBar position="sticky" className={classes.header}>
						<Toolbar style={{ width: 'inherit', padding: 0, justifyContent: 'space-between' }}>
							<Grid item xs={4}>
								<MakorLogo classes={classes} userType={userType} />
							</Grid>
							{isAuthenticated ? (
								<>{handleBarOptions(userType)}</>
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
