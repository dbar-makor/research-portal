import {
	Grid,
	Avatar,
	IconButton,
	Popper,
	Paper,
	ClickAwayListener,
	MenuList,
	MenuItem,
	Grow,
} from '@material-ui/core';
import { forwardRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import * as actionAuth from '../../../redux/auth/action';
import { Link } from 'react-router-dom';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const UserIcon = forwardRef(({ handleToggle, userType, handleClose, setOpen, open }, ref) => {
	const user = useSelector((state) => state.auth.userContent);
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(actionAuth.logout());
	};
	return (
		<Grid container alignItems="center" justifyContent="flex-end">
			<Grid container justifyContent="flex-end">
				<Grid item container alignItems='center' justifyContent='flex-end'>
					<Grid item>
						<IconButton
							size="small"
							ref={ref}
							aria-controls={open ? 'composition-menu' : undefined}
							aria-expanded={open ? 'true' : undefined}
							aria-haspopup="true"
							onClick={() => handleToggle('user')}
						>
							<ExpandMoreIcon style={{ color: '#ffff' }} />
						</IconButton>
					</Grid>
					<Grid item>
						<Avatar src={`${user.avatar}`} />
					</Grid>
				</Grid>
				<Popper
					open={open}
					anchorEl={ref.current}
					role={undefined}
					placement="bottom-start"
					transition
					disablePortal
					style={{ zIndex: 1200 }}
					modifiers={{
						offset: {
							enabled: true,
							offset: '-80, 10',
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
									<MenuList
										autoFocusItem={open}
										id="composition-menu"
										aria-labelledby="composition-button"
									>
										{userType === 'client' || userType === 'prospect' ? (
											<>
												<MenuItem>
													<Link
														to={'/home'}
														style={{
															textDecoration: 'none',
															color: '#bababa',
															fontSize: 14,
														}}
													>{`Hey , ${user.name}`}</Link>
												</MenuItem>
												<MenuItem>
													<Link
														to={'/settings/edit'}
														onClick={() => setOpen(false)}
														style={{ textDecoration: 'none', color: '#000' }}
													>
														Edit Profile
													</Link>
												</MenuItem>
												<MenuItem>
													<Link
														to={'/settings/settings'}
														onClick={() => setOpen(false)}
														style={{ textDecoration: 'none', color: '#000' }}
													>
														Settings
													</Link>
												</MenuItem>
												<MenuItem>
													<Link
														to={'/settings/contract_trails'}
														onClick={() => setOpen(false)}
														style={{ textDecoration: 'none', color: '#000' }}
													>
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
		// {/* </Grid> */}
	);
});

UserIcon.displayName = 'UserIcon';

export default UserIcon;
