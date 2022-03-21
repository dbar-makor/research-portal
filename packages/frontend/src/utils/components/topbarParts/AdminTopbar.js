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
import { useRef } from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

const AdminTopbar = ({ handleToggle, openUserMgmt, setOpenUserMgmt, userType, handleClose }) => {
	const userMgmtRef = useRef(null);

	const adminGoTo = (pathName) => {
		setOpenUserMgmt(false);
		history.push(pathName);
	};

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
										placement === 'bottom-start' ? 'right top' : 'right bottom',
								}}
							>
								<Paper>
									<ClickAwayListener onClickAway={(e) => handleClose(e, 'user_mgmt')}>
										<MenuList
											autoFocusItem={open}
											id="composition-menu"
											aria-labelledby="composition-button"
										>
											<MenuItem onClick={() => adminGoTo('/sales')}>Sales</MenuItem>
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
};

export default AdminTopbar;
