import React from 'react';
import { Dialog, Grid } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useStyles } from '../../../../styles/InfoStyles';
import { FilledButton } from '../../../../styles/MainStyles';
import SubHeaderModal from '../../reusables/SubHeaderModal/SubHeaderModal';
import TextInputUnit from '../../reusables/TextInputUnit/TextInputUnit';
import AutoCompleteUnit from '../../reusables/AutoCompleteUnit/AutoCompleteUnit';

const NewUserModalView = (props) => {
	const classes = useStyles();
	return (
		<Dialog
			open={props.open}
			onClose={props.clearAndClose}
			classes={{ paper: classes.alertModalPaper }}
			BackdropProps={{
				classes: {
					root: classes.modalBackDrop,
				},
			}}
		>
			<Grid container justifyContent="center">
				<Grid item xs={12}>
					<Grid container justifyContent="flex-end">
						<CloseIcon onClick={props.clearAndClose} className={classes.closeIcon} />
					</Grid>
				</Grid>
				<SubHeaderModal title={`Add ${props.userType}`} />
				<Grid item xs={11}>
					<Grid container spacing={2} justifyContent="space-between" style={{ marginTop: '30px' }}>
						<Grid item xs={6} style={{ height: '60px' }}>
							<TextInputUnit
								name="name"
								label="Name"
								value={props.newUser.name}
								onChange={(e) => props.updateUserField(e.target.value, 'name')}
								error={props.errors.name}
							/>
						</Grid>
						<Grid item xs={6} style={{ height: '60px' }}>
							<TextInputUnit
								name="username"
								label="Username"
								value={props.newUser.username}
								onChange={(e) => props.updateUserField(e.target.value, 'username')}
								error={props.errors.username}
							/>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={11}>
					<Grid container spacing={2} justifyContent="space-between" style={{ marginTop: '10px' }}>
						<Grid item xs={6} style={{ height: '60px' }}>
							<TextInputUnit
								name="email"
								label="Email"
								value={props.newUser.email}
								onChange={(e) => props.updateUserField(e.target.value, 'email')}
								error={props.errors.email}
							/>
						</Grid>
						<Grid item xs={6} style={{ height: '60px' }}>
							<AutoCompleteUnit
								options={props.countriesArr}
								name="country"
								label="Country"
								formObject={props.newUser}
								fieldForLabel="name"
								inputValue={props.inputValueCountry}
								setInputValue={props.setInputValueCountry}
								handler={props.updateUserField}
								error={props.errors.country}
							/>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12}>
					<Grid container justifyContent="center" style={{ marginTop: '40px' }}>
						<FilledButton disabled={!props.validationResult} onClick={() => props.sendNewUser()}>
							Add
						</FilledButton>
					</Grid>
				</Grid>
			</Grid>
		</Dialog>
	);
};

NewUserModalView.displayName = 'NewUserModalView';
NewUserModalView.defaultProps = {};

export default React.memo(NewUserModalView);
