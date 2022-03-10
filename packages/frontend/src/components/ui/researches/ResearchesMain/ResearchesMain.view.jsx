import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

import useStyles from './ResearchesMain';

const ResearchesMainView = (props) => {
	const classes = useStyles();

	return props.researches.length ? (
		<Grid container justifyContent="center" className={classes.mainArticle}>
			<Grid item xs={8}>
				<Grid container>
					<Grid item xs={12}>
						<Typography className={classes.bigTitle}>{props.researches[0].title}</Typography>
					</Grid>
					<Grid item xs={12}>
						<Grid container justifyContent="space-between">
							<Grid item xs={6}>
								<Grid container>
									<Grid item xs={12}>
										<img alt="Article" src={`${props.researches[0].image}`} className={classes.bigImage} />
									</Grid>
									<Grid item xs={12}>
										<Typography className={classes.bigDescription}>
											{props.researches[0].description}
										</Typography>
									</Grid>
									<Grid item xs={12}>
										<Typography className={classes.bigSubDescription}>
											{props.researches[0].sub_description}
										</Typography>
									</Grid>
									<Grid item xs={12}>
										<Typography className={classes.bigAuthorName}>
											{props.researches[0].author_name}
										</Typography>
									</Grid>
									<Grid item xs={12}>
										<Grid container justifyContent="flex-end">
											<Link
												to={{ pathname: `/article/${props.researches[0].id}` }}
												className={classes.bigLink}
											>
												Read more...
											</Link>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={5}>
								<Grid container justifyContent="space-between">
									{props.researches.slice(1).map((item, index) => (
										<Grid item xs={12} key={index}>
											<Link to={{ pathname: `/article/${item.id}` }} className={classes.smallLink}>
												<Grid
													container
													justifyContent="space-between"
													alignItems="center"
													className={classes.smallArticle}
												>
													<Grid item xs={3}>
														<img alt="Article" src={`${item.thumbnail}`} />
													</Grid>
													<Grid item xs={7}>
														<Grid container justifyContent="flex-start">
															<Grid item xs={12}>
																<Typography className={classes.smallTitle}>{item.title}</Typography>
															</Grid>
															<Grid item xs={12}>
																<Typography className={classes.smallAuthorName}>
																	{item.author_name}
																</Typography>
															</Grid>
															<Grid item xs={12}></Grid>
														</Grid>
													</Grid>
												</Grid>
											</Link>
										</Grid>
									))}
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	) : null;
};

ResearchesMainView.displayName = 'ResearchesMainView';
ResearchesMainView.defaultProps = {};

export default React.memo(ResearchesMainView);
