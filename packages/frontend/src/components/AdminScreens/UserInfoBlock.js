import { Grid, Typography, TextField } from '@material-ui/core';
import { format } from 'date-fns';
import { useStyles } from '../../styles/InfoStyles';

function UserInfoBlock(props) {
	const { chosenUser, updateUserField } = props;
	const classes = useStyles();

	const userFields =
		chosenUser.type === 'sales'
			? [
					'username',
					'last_client_added',
					'email',
					'last_prospect_added',
					'created_at',
					'total_clients',
					'last_connected_at',
					'total_prospects',
			  ]
			: [
					'username',
					'last_publication',
					'email',
					'most_read',
					'created_at',
					'total_views',
					'last_connected_at',
					'total_published',
			  ];

	const dateFields = [
		'created_at',
		'last_connected_at',
		'last_client_added',
		'last_prospect_added',
		'last_publication',
	];

	return (
		<Grid container spacing={1} justifyContent="space-around" className={classes.userInfoBlock}>
			{userFields.map((field, index) => {
				return (
					<Grid item xs={index % 2 === 0 && chosenUser.isEditMode ? 6 : 5} key={index}>
						<Grid container justifyContent="space-between" alignItems="center">
							<Grid item>
								<Typography className={classes.fieldName}>
									{field.replaceAll('_', ' ')}
								</Typography>
							</Grid>
							<Grid item>
								<Grid container justifyContent="flex-end">
									{chosenUser.isEditMode ? (
										field !== 'username' && field !== 'email' ? (
											<Grid item>
												<Typography className={classes.fieldContent}>
													{chosenUser[field]
														? dateFields.some((dateField) => dateField === field)
															? format(
																	new Date(chosenUser[field]),
																	'HH:mm dd/MM/yyyy',
															  )
															: chosenUser[field]
														: '-'}
												</Typography>
											</Grid>
										) : (
											<Grid item>
												<TextField
													value={chosenUser[field]}
													onChange={(e) => updateUserField(field, e.target.value)}
												/>
											</Grid>
										)
									) : (
										<Grid item>
											<Typography className={classes.fieldContent}>
												{chosenUser[field]
													? dateFields.some((dateField) => dateField === field)
														? format(
																new Date(chosenUser[field]),
																'HH:mm dd/MM/yyyy',
														  )
														: chosenUser[field]
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
}

export default UserInfoBlock;
