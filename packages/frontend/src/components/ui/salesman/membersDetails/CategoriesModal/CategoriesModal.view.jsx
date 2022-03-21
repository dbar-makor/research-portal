import React from 'react';
import { Grid, Typography, Dialog } from '@material-ui/core';
import { useStyles } from '../../../../../styles/InfoStyles';
import CategoriesAutoComplete from '../../../../Reusables/CategoriesAutoComplete';
import { FilledButton } from '../../../../../styles/MainStyles';
import { ReactComponent as CloseIcon } from '../../../../../assets/icons/closeIcon.svg';

//import useStyles from './CategoriesModal.style';

const CategoriesModalView = (props) => {
	const classes = useStyles();
  return (
		props.currentMember && (
			<Dialog
				open={props.open}
				onClose={props.handleClose}
				classes={{ paper: classes.contractModalPaper }}
				BackdropProps={{
					classes: {
						root: classes.modalBackDrop,
					},
				}}
			>
				<Grid
					container
					justifyContent="center"
					alignItems="center"
					className={classes.categoriesModalBox}
				>
					<Grid item xs={12}>
						<Grid container justifyContent="flex-end">
							<CloseIcon onClick={props.handleClose} className={classes.closeIcon} />
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<Grid container justifyContent="center">
							<Typography className={classes.editCats}>
								{props.currentMember.categories.length ? 'Edit Categories' : 'Add categories'}
							</Typography>
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<Grid container justifyContent="center">
							<Typography className={classes.memberName}>{props.currentMember.name}</Typography>
						</Grid>
					</Grid>
					<Grid item xs={10}>
						<Grid container justifyContent="center">
							<CategoriesAutoComplete
								formObject={props.currentMember}
								setFormObject={props.setCurrentMember}
								chipClassName={classes.chipItem}
								chipContainerClassName={classes.chipContainer}
								handler={props.updateMemberField}
								additionalParameter={props.memberIndex}
								parentArr={props.membersRows}
								setParentArr={props.setMembersRows}
								chipVariant="default"
							/>
						</Grid>
					</Grid>
					<Grid item className={classes.saveBtn}>
						<Grid container justifyContent="center">
							<FilledButton onClick={() => props.sendMember(props.currentMember, props.currentMember.id)}>
								Save
							</FilledButton>
						</Grid>
					</Grid>
				</Grid>
			</Dialog>
		)
	);
};

CategoriesModalView.displayName = 'CategoriesModalView';
CategoriesModalView.defaultProps = {};

export default React.memo(CategoriesModalView);
