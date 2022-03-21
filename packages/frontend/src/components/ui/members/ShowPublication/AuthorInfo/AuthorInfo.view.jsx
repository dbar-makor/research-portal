import React from 'react';

import { format } from 'date-fns';
import Avatar from '@material-ui/core/Avatar';
import { Divider, Grid, Typography } from '@material-ui/core';

import { ReactComponent as FbIcon } from '../../../../../assets/icons/fb.svg';
import { ReactComponent as TtrIcon } from '../../../../../assets/icons/ttr.svg';
import { ReactComponent as WaIcon } from '../../../../../assets/icons/wa.svg';
import { useStyles } from '../../../../../styles/PublicationsStyles';

import { FacebookShareButton, WhatsappShareButton, TwitterShareButton } from 'react-share';

const AuthorInfoView = (props) => {
	const classes = useStyles();

	return (
		<Grid item xs={12}>
			<Divider className={classes.divider}></Divider>
			<Grid
				container
				direction="row"
				alignItems="center"
				style={{ paddingTop: 10 }}
				justifyContent="space-between"
			>
				<Grid item xs={10}>
					<Grid container alignItems="center">
						<Grid item xs={1}>
							<Avatar
								alt="Remy Sharp"
								src={
									props.author.avatar
										? `${props.author.avatar}`
										: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
								}
							/>
						</Grid>
						<Grid item xs={11}>
							<Grid container>
								<Grid item xs={12}>
									<Typography className={classes.autherFont}>
										{props.author.name}
									</Typography>
								</Grid>
								{props.lastDate ? (
									<Grid item xs={12}>
										<Typography className={classes.autherFont}>{`Updated: ${format(
											new Date(props.lastDate),
											'dd MMM, yyyy hh:mm',
										)}`}</Typography>
									</Grid>
								) : null}
							</Grid>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={2}>
					<Grid container justifyContent="space-around">
						<Grid item>
							<FacebookShareButton url={document.URL}>
								<FbIcon />
							</FacebookShareButton>
						</Grid>
						<Grid item>
							<WhatsappShareButton url={document.URL}>
								<WaIcon />
							</WhatsappShareButton>
						</Grid>
						<Grid item>
							<TwitterShareButton url={document.URL}>
								<TtrIcon />
							</TwitterShareButton>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

AuthorInfoView.displayName = 'AuthorInfoView';
AuthorInfoView.defaultProps = {};

export default React.memo(AuthorInfoView);
