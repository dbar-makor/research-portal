import React, { forwardRef } from 'react';
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
import { Link } from 'react-router-dom';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const UserIconView = forwardRef((props, ref) => {
	return (
		<Grid container alignItems="center" justifyContent="flex-end">
			<Grid container justifyContent="flex-end">
				<Grid item container alignItems="center" justifyContent="flex-end">
					<Grid item>
						<IconButton
							size="small"
							ref={ref}
							aria-controls={props.open ? 'composition-menu' : undefined}
							aria-expanded={props.open ? 'true' : undefined}
							aria-haspopup="true"
							onClick={() => props.handleToggle('user')}
						>
							<ExpandMoreIcon style={{ color: '#ffff' }} />
						</IconButton>
					</Grid>
					<Grid item>
						<Avatar src={`${props.user.avatar}`} />
					</Grid>
				</Grid>
				<Popper
					open={props.open}
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
								<ClickAwayListener onClickAway={(e) => props.handleClose(e, 'user')}>
									<MenuList
										autoFocusItem={open}
										id="composition-menu"
										aria-labelledby="composition-button"
									>
										<>
											<MenuItem>
												<Link
													to={'/home'}
													style={{
														textDecoration: 'none',
														color: '#bababa',
														fontSize: 14,
													}}
												>{`Hey , ${props.user.name}`}</Link>
											</MenuItem>
											<MenuItem>
												<Link
													to={'/settings/edit'}
													onClick={() => props.setOpen(false)}
													style={{ textDecoration: 'none', color: '#000' }}
												>
													Edit Profile
												</Link>
											</MenuItem>
											<MenuItem>
												<Link
													to={'/settings/settings'}
													onClick={() => props.setOpen(false)}
													style={{ textDecoration: 'none', color: '#000' }}
												>
													Settings
												</Link>
											</MenuItem>
											{props.userType === 'client' || props.userType === 'prospect' ? (
												<MenuItem>
													<Link
														to={'/settings/contract_trails'}
														onClick={() => props.setOpen(false)}
														style={{ textDecoration: 'none', color: '#000' }}
													>
														Contracts & Trails
													</Link>
												</MenuItem>
											) : null}
										</>
										<MenuItem onClick={props.handleLogout} style={{ color: '#FF0000' }}>
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
	);
});

UserIconView.displayName = 'UserIconView';
UserIconView.defaultProps = {};

export default React.memo(UserIconView);
