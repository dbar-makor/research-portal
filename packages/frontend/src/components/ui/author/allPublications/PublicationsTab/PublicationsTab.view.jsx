import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { BinButton, EditButton } from '../../../../../styles/MainStyles';
import EditIcon from '@material-ui/icons/Edit';
import { ReactComponent as DeleteIcon } from '../../../../../assets/icons/IconTrash.svg';
import DeleteAlert from '../../../reusables/DeleteAlert/DeleteAlert';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { ReactComponent as EmptyFile } from '../../../../../assets/icons/fileEmpty.svg';
import useStyles from './PublicationsTab.style';

const PublicationsTabView = (props) => {
	const classes = useStyles();

	return (
		<>
			<Grid item xs={4} className={classes.cardWrapper} key={props.publication.id}>
				<Grid container className={classes.card}>
					<Grid
						item
						xs={12}
						className={classes.upperHalf}
						style={{
							backgroundImage: props.chooseImage(props.publication)
								? `url(${props.chooseImage(props.publication)})`
								: 'none',
							backgroundColor: '#74b2f0',
						}}
					>
						{props.publication.status === 'published' ? (
							<Grid className={classes.viewsBox}>
								<VisibilityIcon />
								{props.publication.views}
							</Grid>
						) : null}

						{props.publication.type === 'dead' ? (
							<Grid className={classes.typeIndicator}>
								{props.publication.title_video ? (
									<PlayArrowIcon className={classes.typeIcon} />
								) : (
									<EmptyFile className={classes.typeIcon} />
								)}
							</Grid>
						) : (
							<></>
						)}
					</Grid>
					<Grid item xs={12} className={classes.backdrop}>
						<BinButton className={classes.binBtn} onClick={() => props.handleDeleteBtn(props.publication.id)}>
							<DeleteIcon />
						</BinButton>
						<EditButton className={classes.editBtn} onClick={() => props.handleEdit(props.publication.id)}>
							<EditIcon />
						</EditButton>
					</Grid>
					<Grid item xs={12} className={classes.lowerHalf}>
						<Typography variant="h5" className={classes.pubTitle}>
							{props.publication.title}
						</Typography>
						<Typography>{props.truncateString(props.publication.description, 10)}</Typography>
					</Grid>
				</Grid>
			</Grid>
			<DeleteAlert
				open={props.openAlert}
				handleClose={props.handleCloseAlert}
				itemName={props.publication.title}
				itemId={props.publication.id}
				itemCategory="Publication"
				deleteItem={props.deletePublication}
			/>
		</>
	);
};

PublicationsTabView.displayName = 'PublicationsTabView';
PublicationsTabView.defaultProps = {};

export default React.memo(PublicationsTabView);
