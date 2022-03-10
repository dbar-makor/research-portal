import React from 'react';
import { Grid, Typography } from '@material-ui/core';

import useStyles from './Article';

const ArticleView = (props) => {
	const classes = useStyles();

	return props.article ? (
		<Grid container justifyContent="center" className={classes.articleContainer}>
			<Grid item xs={6}>
				<Grid container>
					<Grid item xs={12}>
						<Grid container justifyContent="flex-end">
							<Typography className={classes.date}>{props.article.date}</Typography>
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<Typography className={classes.bigTitle}>{props.article.title}</Typography>
					</Grid>
					<Grid item xs={12}>
						<Grid container>
							<Grid item xs={12}>
								<Typography className={classes.bigAuthorName}>
									Written by {props.article.author_name}
								</Typography>
							</Grid>
							<Grid item xs={12}>
								<Typography>{props.article.text}</Typography>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	) : null;
};

ArticleView.displayName = 'ArticleView';
ArticleView.defaultProps = {};

export default React.memo(ArticleView);
