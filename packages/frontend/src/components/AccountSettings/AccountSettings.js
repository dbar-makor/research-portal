import { Avatar, Divider, Grid, Typography } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import PersonIcon from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import { ReactComponent as BlueShape } from '../../assets/icons/blueBorder.svg';
import { Switch, useHistory, useRouteMatch, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useStyles } from '../../styles/AccountSettingsStyles';
import EditProfile from './EditProfile';
import Settings from './Settings';
import ContractAndTrails from './ContractsAndTrails';
import PrivateRoute from '../../utils/components/PrivateRoute';
import * as actionAuth from '../../redux/auth/action';

function AccountSettings() {
	const userContent = useSelector((state) => state.auth.userContent);
	const dispatch = useDispatch();
	const chosenRouteName = window.location.pathname.replace('/settings/', '');
	const history = useHistory();
	const classes = useStyles(chosenRouteName === 'contract_trails' ? 'on' : 'off');
	const params = useParams();
	const { path, url } = useRouteMatch();

	const handleRoute = (type) => {
		history.push(`${url}/${type}`);
	};

	const handleLogout = () => {
		dispatch(actionAuth.logout());
	};

	return (
		<>
			<Grid
				container
				flexDirection="column"
				style={{
					position: 'absolute',
					width: '200px',
					top: 94,
					left: 140,
				}}
			>
				<Grid item xs={12}>
					<BlueShape />
				</Grid>
				<Grid item xs={12} style={{ paddingTop: 10 }}>
					<Typography style={{ fontSize: 24, color: '#868DA2' }}>Account Settings</Typography>
				</Grid>
			</Grid>

			<Grid
				container
				direction="row"
				style={{
					position: 'relative',
					margin: '60px 0px 59px 450px',
					width: '65%',
					height: 'calc(100vh - 380px)',
					border: '1px solid #A5AFC233',
					borderRadius: '8px',
				}}
			>
				<Grid
					item
					xs={2}
					style={{
						backgroundColor: '#F6F9FC',
						borderTop: '2px solid #A5AFC233',
						borderRight: '1px solid #A5AFC233',
						borderBottom: '2px solid #A5AFC233',
						borderRadius: '8px',
					}}
				>
					<Grid container direction="row" justifyContent="space-between" style={{ height: '100%' }}>
						<Grid item xs={12}>
							<Grid container style={{ paddingTop: 20 }}>
								<Grid item>
									<Grid container alignItems="center">
										<Grid item style={{ paddingInline: '24px 16px' }}>
											<Avatar style={{ width: 54, height: 54 }} src={`${userContent.avatar}`} />
										</Grid>
										<Grid item>
											<Typography>{userContent.name}</Typography>
										</Grid>
									</Grid>
								</Grid>
								<Grid item>
									<Grid container>
										<Grid
											item
											xs={12}
											className={chosenRouteName === 'edit' ? classes.chosenRoute : classes.notChosen}
											onClick={() => handleRoute('edit')}
										>
											{/*
                      **
                      TODO : Both "edit profile and contracts & trails needs to be Build "
                       */}
											<Grid container alignItems="center">
												<Grid item>
													<PersonIcon
														className={chosenRouteName === 'edit' ? classes.iconOn : classes.icon}
													/>
												</Grid>
												<Grid item>
													<Typography style={{ fontSize: 14 }}>Edit Profile</Typography>
												</Grid>
											</Grid>
										</Grid>
										<Grid
											item
											xs={12}
											className={chosenRouteName === 'settings' ? classes.chosenRoute : classes.notChosen}
											onClick={() => handleRoute('settings')}
										>
											<Grid container alignItems="center">
												<Grid item>
													<SettingsIcon
														className={chosenRouteName === 'settings' ? classes.iconOn : classes.icon}
													/>
												</Grid>
												<Grid item>
													<Typography style={{ fontSize: 14 }}>Settings</Typography>
												</Grid>
											</Grid>
										</Grid>
										<Grid
											item
											xs={12}
											className={
												chosenRouteName === 'contract_trails' ? classes.chosenRoute : classes.notChosen
											}
											onClick={() => handleRoute('contract_trails')}
										>
											<Grid container alignItems="center">
												<Grid item>
													<InsertDriveFileIcon
														className={chosenRouteName === 'contract_trails' ? classes.iconOn : classes.icon}
													/>
												</Grid>
												<Grid item>
													<Typography style={{ fontSize: 14 }}>Contracts & Trials</Typography>
												</Grid>
											</Grid>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
						<Grid item xs={12}>
							<Grid container style={{ height: '100%' }} direction="column" justifyContent="flex-end">
								<Grid item style={{ paddingBlock: 32 }}>
									<Divider style={{ margin: 'auto', width: '75%', marginBottom: '26px' }} />
									<Typography
										style={{
											textAlign: 'center',
											display: 'flex',
											justifyContent: 'center',
											color: '#FF3939',
											cursor: 'pointer',
										}}
										onClick={handleLogout}
									>
										<ExitToAppIcon />
										Logout
									</Typography>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
				{/* ROUTING GRID */}
				<Grid item xs={10}>
					<Switch>
						<PrivateRoute path={`${path}/settings`} component={Settings} />
						<PrivateRoute path={`${path}/edit`} component={EditProfile} />
						<PrivateRoute path={`${path}/contract_trails`} component={ContractAndTrails} />
					</Switch>
				</Grid>
			</Grid>
		</>
	);
}

export default AccountSettings;
