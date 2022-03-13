import React from 'react';
import { Grid, Typography, TextField } from '@material-ui/core';
import { useStyles } from '../../../../styles/InfoStyles';
import { format } from 'date-fns';


const UserInfoBlockView = (props) => {
	const classes=useStyles();
  return (
		<Grid container spacing={1} justifyContent="space-around" className={classes.userInfoBlock}>
			{props.userFields.map((field, index) => {
				return (
					<Grid item xs={index % 2 === 0 && props.chosenUser.isEditMode ? 6 : 5} key={index}>
						<Grid container justifyContent="space-between" alignItems="center">
							<Grid item>
								<Typography className={classes.fieldName}>
									{field.replaceAll('_', ' ')}
								</Typography>
							</Grid>
							<Grid item>
								<Grid container justifyContent="flex-end">
									{props.chosenUser.isEditMode ? (
										field !== 'username' && field !== 'email' ? (
											<Grid item>
												<Typography className={classes.fieldContent}>
													{props.chosenUser[field]
														? props.dateFields.some((dateField) => dateField === field)
															? format(
																	new Date(props.chosenUser[field]),
																	'HH:mm dd/MM/yyyy',
															  )
															: props.chosenUser[field]
														: '-'}
												</Typography>
											</Grid>
										) : (
											<Grid item>
												<TextField
													value={props.chosenUser[field]}
													onChange={(e) => props.updateUserField(field, e.target.value)}
												/>
											</Grid>
										)
									) : (
										<Grid item>
											<Typography className={classes.fieldContent}>
												{props.chosenUser[field]
													? props.dateFields.some((dateField) => dateField === field)
														? format(
																new Date(props.chosenUser[field]),
																'HH:mm dd/MM/yyyy',
														  )
														: props.chosenUser[field]
													: '-'}
											</Typography>
										</Grid>
									)}
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				);
			})}
		</Grid>
	);
};

UserInfoBlockView.displayName = 'UserInfoBlockView';
UserInfoBlockView.defaultProps = {};

export default React.memo(UserInfoBlockView);
