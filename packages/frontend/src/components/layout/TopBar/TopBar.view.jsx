import React, { forwardRef } from 'react';
import { AppBar, Button, Grid, Toolbar, withStyles, Divider } from '@material-ui/core';
import TradingHours from '../TradingHours/TradingHours';
import MemberTopbar from '../topbarParts/MemberTopbar/MemberTopbar';
import SalesTopbar from '../topbarParts/SalesTopbar/SalesTopbar';
import AuthorTopbar from '../topbarParts/AuthorTopbar/AuthorTopbar';
import AdminTopbar from '../topbarParts/AdminTopbar/AdminTopbar';
import MakorLogo from '../topbarParts/MakorLogo/MakorLogo';
import useStyles from './TopBar.style';
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

const TopBarView = forwardRef((props, ref) => {
	const classes = useStyles();

	const handleBarOptions = (userType) => {
		switch (userType) {
			case 'client' || 'prospect':
				return <MemberTopbar classes={classes} options={props.options} />;
			case 'sales':
				return <SalesTopbar classes={classes} />;
			case 'author':
				return <AuthorTopbar classes={classes} />;
			case 'admin':
				return (
					<AdminTopbar
						handleToggle={props.handleToggle}
						classes={classes}
						openUserMgmt={props.openUserMgmt}
						setOpenUserMgmt={props.setOpenUserMgmt}
						userType={userType}
						handleClose={props.handleClose}
					/>
				);
		}
	};

	return (
		<>
			<Grid container direction="column" className={`${classes.headerContainer} header`}>
				<Grid item style={{ backgroundColor: '#000', width: '70vw', margin: '0 auto' }}>
					<TradingHours
						handleToggle={props.handleToggle}
						notifications={props.notifications}
						openNotification={props.openNotification}
						setOpenNotification={props.setOpenNotification}
						handleListKeyDown={props.handleListKeyDown}
						handleClose={props.handleClose}
						ref={ref}
						userType={props.userType}
						setOpen={props.setOpen}
						open={props.open}
					/>
				</Grid>
				<Divider className={classes.divider} />
				<Grid item style={{ backgroundColor: '#000', width: '70vw', margin: '0 auto' }}>
					<AppBar position="sticky" className={classes.header}>
						<Toolbar style={{ width: 'inherit', padding: 0, justifyContent: 'space-between' }}>
							<Grid item xs={4}>
								<MakorLogo classes={classes} userType={props.userType} />
							</Grid>
							{props.isAuthenticated ? (
								<>{handleBarOptions(props.userType)}</>
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
});

TopBarView.displayName = 'TopBarView';
TopBarView.defaultProps = {};

export default React.memo(TopBarView);
