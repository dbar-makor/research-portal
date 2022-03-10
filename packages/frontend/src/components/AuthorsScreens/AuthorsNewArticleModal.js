import React, { useState } from 'react';
import { Button, Grid, makeStyles, Typography, withStyles } from '@material-ui/core';
import { ReactComponent as ArticleIcon } from '../../assets/icons/articleIcon.svg';
import { ReactComponent as UploadIcon } from '../../assets/icons/uploadIcon.svg';
import { ReactComponent as CloseIcon } from '../../assets/icons/closeIcon.svg';
import { Transition } from 'react-transition-group';
import Dialog from '@material-ui/core/Dialog';
import { useHistory } from 'react-router';

function AuthorsNewArticleModal({ handleClose, open }) {
	const classes = useStyles();
	const history = useHistory();

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			className={classes.dialog}
			// classes={{ paper: classes.dialogPaper }}
			// BackdropProps={{
			//   classes: {
			//     root: classes.dialogBackDrop
			//   }
			// }}
		>
			<Grid container justifyContent="center" className={classes.modalContainer}>
				<Grid item xs={12}>
					<Grid container className={classes.end}>
						<Grid item xs={12}>
							<CloseIcon onClick={handleClose} className={classes.closeIcon} />
						</Grid>
					</Grid>

					<Grid container justifyContent="center" className={classes.paddingGrid}>
						<Grid item xs={12}>
							<Grid container justifyContent="center">
								<Typography className={classes.modalTitle}>New Article</Typography>
							</Grid>
						</Grid>
						<Grid item xs={12}>
							<Grid container>
								<Grid item xs={12}>
									<Typography className={classes.articleType}>Select the type of article</Typography>
								</Grid>
							</Grid>
						</Grid>
						<Grid container>
							<Grid item xs={12}>
								<Grid container>
									<Grid item xs={5}>
										<Button className={classes.buttonStyle} onClick={() => history.push('/new-article')}>
											<Grid container>
												<Grid item xs={12}>
													<Grid container>
														<Grid item xs={12}>
															<ArticleIcon
																//   style={{ color: "red" }}
																className={classes.marginTop14px}
															/>
														</Grid>
													</Grid>
													<Grid container>
														<Grid item xs={12} className={classes.articleTitle2}>
															<Typography className="articleTitle">Write an Article</Typography>
														</Grid>
													</Grid>
												</Grid>
											</Grid>
										</Button>
									</Grid>
									<Grid item xs={2}></Grid>
									<Grid item xs={5}>
										<Button className={classes.button2Style} onClick={() => history.push('/upload-article')}>
											<Grid container>
												<Grid item xs={12}>
													<Grid container>
														<Grid item xs={12}>
															<UploadIcon />
														</Grid>
													</Grid>
													<Grid container>
														<Grid item xs={12} className={classes.uploadTitle}>
															<Typography className="uploadTitle">Upload Files</Typography>
														</Grid>
													</Grid>
												</Grid>
											</Grid>
										</Button>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Dialog>
	);
}

export default AuthorsNewArticleModal;

const useStyles = makeStyles((theme) => ({
	dialog: {
		boxShadow: '0px 8px 24px #0018581F',
	},
	modalContainer: {
		backgroundColor: '#fff',
		width: '536px',
		// position: "absolute",
		// top: "306px",
		// left: "692px",
		height: '469px',
		flexDirection: 'column',
		alignItems: 'center',
		paddingTop: '24px',
		borderRadius: '8px',
		boxShadow: '0px 8px 24px #0018581F',
	},
	modalTitle: {
		color: '#1C67FF',
		fontSize: '24px',
		fontWeight: 400,
		marginBottom: '8px',
		fontFamily: 'Inter',
	},
	end: {
		textAlignLast: 'end',
	},
	paddingGrid: {
		padding: '0 55px 122px 36px',
	},
	articleType: {
		color: '#868DA2',
		fontFamily: 'inter',
		fontSize: '16px',
		textAlignLast: 'center',
		marginBottom: '64px',
	},
	button2Style: {
		'width': '210px',
		'height': '146px',
		'border': '2px solid #A5AFC233',
		'borderRadius': '8px',
		'& g': {
			'& .upload3': {
				transform: 'translate(1075.463px, 484.774px)',
				transition: '.3s',
			},
		},

		'&:hover': {
			'backgroundColor': '#E7EFFF',
			'& g': {
				'& .upload3': {
					fill: '#1C67FF',
					transform: 'translate(1075.463px, 482.774px)',
					transition: '.3s',
					//   animation: `$div1 2s normal forwards ${theme.transitions.easing.easeInOut}`,
				},
				'& g': {
					'& .upload1': {
						stroke: '#1C67FF',
					},
					'& .upload2': {
						stroke: '#1C67FF',
					},
				},
			},
			'& .uploadTitle': {
				textTransform: 'capitalize',
				fontWeight: 500,
				// marginBottom: "5px",
			},
		},
	},
	marginTop14px: {
		// marginTop: "14px",
	},
	articleTitle2: {
		textTransform: 'capitalize',
		// marginBottom: "5px",
	},
	uploadTitle: {
		textTransform: 'capitalize',
		// marginBottom: "5px",
	},
	animationFade: {
		transition: '1s',
		transitionTimingFunction: 'ease-out',
	},
	closeIcon: {
		paddingRight: '24px',
		cursor: 'pointer',
	},
	buttonStyle: {
		'width': '210px',
		'height': '146px',
		'border': '2px solid #A5AFC233',
		'borderRadius': '8px',
		'& g': {
			'& g': {
				'& .pen': {
					transform: 'translate(22.869px, 15.274px)',
					transition: '.3s',
				},
				'& g': {
					'& .article1': {
						transform: 'translate(-6px, -3px)',
						transition: '.3s',
					},
					'& .article2': {
						transform: 'translate(0.248px, -3px)',
						transition: '.3s',
					},
					'& .article3': {
						transform: 'translate(-3.288px, 5.8px)',
						transition: '.3s',
					},
					'& .article4': {
						transform: 'translate(-3.31px, 2.6px)',
						transition: '.3s',
					},
				},
				'& .article5': {
					transform: 'translate(-3.366px, 8.789px)',
					transition: '.3s',
				},
			},
		},
		'&:hover': {
			'backgroundColor': '#E7EFFF',
			'& g': {
				'& g': {
					'& .pen': {
						'fill': '#1C67FF',
						'stroke': '#1C67FF',
						'transform': 'translate(19.869px, 17.274px)',
						'transition': '.3s',
						'& .circlePen': {
							fill: '#E7EFFF',
						},
					},

					'& g': {
						'& .article1': {
							stroke: '#1C67FF',
							transform: 'translate(-4px, -3px)',
							transition: '.3s',
						},
						'& .article2': {
							stroke: '#1C67FF',
							transform: 'translate(1.248px, -3px)',
							transition: '.3s',
						},
						'& .article3': {
							stroke: '#1C67FF',
							transform: 'translate(-2.288px, 5.8px)',
							transition: '.3s',
						},
						'& .article4': {
							stroke: '#1C67FF',
							transform: 'translate(-2.31px, 2.6px)',
							transition: '.3s',
						},
					},
					'& .article5': {
						stroke: '#1C67FF',
						transform: 'translate(-2.366px,  8.789px)',
						transition: '.3s',
					},
				},
			},
			'& .articleTitle': {
				fontWeight: 500,
				textTransform: 'capitalize',
				// marginBottom: "5px",
			},
		},
	},
	animationFade: {
		transition: '1s',
		transitionTimingFunction: 'ease-out',
	},
}));
