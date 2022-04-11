import React from 'react';

import { Divider, Grid, Link, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { ReactComponent as ArrowRight } from '../../../../../assets/icons/arrowRight.svg';
import { useStyles } from '../../../../../styles/PublicationsStyles';

const TitleView = (props) => {
	const classes = useStyles();
	const history = useHistory();

	return (
		<Grid item xs={12}>
			<Grid container>
				<Grid item xs={12}>
					<Grid container alignItems="center">
						<Grid item>
							<Link onClick={() => history.push('/home')} className={classes.breadCrumbs}>
								Home
							</Link>
						</Grid>
						<Grid item style={{ paddingInline: 4 }}>
							<ArrowRight />
						</Grid>
						<Grid item>
							<Typography style={{ fontSize: 14, color: '#000000', fontWeight: 'bold' }}>
								{props.title}
							</Typography>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12}>
					<Divider className={classes.divider} style={{ marginTop: 10 }}></Divider>
					<Grid container>
						<Grid item xs={12} style={{ paddingBlock: 16 }}>
							<Typography className={classes.title}>{props.title}</Typography>
						</Grid>
						<Grid item xs={12}>
							<Typography>{props.description}</Typography>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

TitleView.displayName = 'TitleView';
TitleView.defaultProps = {};

export default React.memo(TitleView);
