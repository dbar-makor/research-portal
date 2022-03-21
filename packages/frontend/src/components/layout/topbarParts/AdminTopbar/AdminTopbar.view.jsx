import {
	Grid,
	Typography,
	Paper,
	Grow,
	ClickAwayListener,
	MenuList,
	MenuItem,
	IconButton,
	Popper,
} from '@material-ui/core';
import React from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
//import useStyles from './AdminTopbar.style';

const AdminTopbarView = (props) => {
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
								onClick={() => props.handleToggle('user_mgmt')}
							>
								Users Managment
							</Typography>
						</Grid>
						<Grid item>
							<IconButton
								size="small"
								ref={props.userMgmtRef}
								aria-controls={props.openUserMgmt ? 'composition-menu' : undefined}
								aria-expanded={props.openUserMgmt ? 'true' : undefined}
								aria-haspopup="true"
								onClick={() => props.handleToggle('user_mgmt')}
							>
								{props.openUserMgmt ? (
									<ExpandLessIcon style={{ color: '#ffff' }} />
								) : (
									<ExpandMoreIcon style={{ color: '#ffff' }} />
								)}
							</IconButton>
						</Grid>
					</Grid>
					<Popper
						open={props.openUserMgmt}
						anchorEl={props.userMgmtRef.current}
						role={undefined}
						placement="bottom"
						transition
						disablePortal
						modifiers={{
							offset: {
								enabled: true,
								offset: props.userType === 'client' ? '-150, 10' : '-80, 10',
							},
						}}
					>
						{({ TransitionProps, placement }) => (
							<Grow
								{...TransitionProps}
								style={{
									transformOrigin:
										placement === 'bottom-start' ? 'right top' : 'right bottom',
								}}
							>
								<Paper>
									<ClickAwayListener onClickAway={(e) => props.handleClose(e, 'user_mgmt')}>
										<MenuList
											autoFocusItem={open}
											id="composition-menu"
											aria-labelledby="composition-button"
										>
											<MenuItem onClick={() => props.adminGoTo('/sales')}>
												Sales
											</MenuItem>
											<MenuItem onClick={() => props.adminGoTo('/companies')}>
												Companies Page
											</MenuItem>
											<MenuItem onClick={() => props.adminGoTo('/authors')}>
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
};

AdminTopbarView.displayName = 'AdminTopbarView';
AdminTopbarView.defaultProps = {};

export default React.memo(AdminTopbarView);
