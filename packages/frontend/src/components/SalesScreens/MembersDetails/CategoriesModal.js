import { useEffect } from 'react';
import { Grid, Typography, Dialog } from '@material-ui/core';
import { ReactComponent as CloseIcon } from '../../../assets/icons/closeIcon.svg';
import { useStyles } from '../../../styles/InfoStyles';
import CategoriesAutoComplete from '../../Reusables/CategoriesAutoComplete';
import { FilledButton } from '../../../styles/MainStyles';

function CategoriesModal(props) {
	const classes = useStyles();
	const {
		open,
		handleClose,
		currentMember,
		setCurrentMember,
		updateMemberField,
		memberIndex,
		membersRows,
		setMembersRows,
		sendMember,
	} = props;

	useEffect(() => {
		console.log('currentMember', currentMember);
	}, [currentMember]);

	return (
		currentMember && (
			<Dialog
				open={open}
				onClose={handleClose}
				classes={{ paper: classes.contractModalPaper }}
				BackdropProps={{
					classes: {
						root: classes.modalBackDrop,
					},
				}}
			>
				<Grid container justifyContent="center" alignItems="center" className={classes.categoriesModalBox}>
					<Grid item xs={12}>
						<Grid container justifyContent="flex-end">
							<CloseIcon onClick={handleClose} className={classes.closeIcon} />
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<Grid container justifyContent="center">
							<Typography className={classes.editCats}>
								{currentMember.categories.length ? 'Edit Categories' : 'Add categories'}
							</Typography>
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<Grid container justifyContent="center">
							<Typography className={classes.memberName}>{currentMember.name}</Typography>
						</Grid>
					</Grid>
					<Grid item xs={10}>
						<Grid container justifyContent="center">
							<CategoriesAutoComplete
								formObject={currentMember}
								setFormObject={setCurrentMember}
								chipClassName={classes.chipItem}
								chipContainerClassName={classes.chipContainer}
								handler={updateMemberField}
								additionalParameter={memberIndex}
								parentArr={membersRows}
								setParentArr={setMembersRows}
								chipVariant="default"
							/>
						</Grid>
					</Grid>
					<Grid item className={classes.saveBtn}>
						<Grid container justifyContent="center">
							<FilledButton onClick={() => sendMember(currentMember, currentMember.id)}>Save</FilledButton>
						</Grid>
					</Grid>
				</Grid>
			</Dialog>
		)
	);
}

export default CategoriesModal;
