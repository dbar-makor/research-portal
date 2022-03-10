import { useState, useEffect } from 'react';
import SelectInputUnit from './SelectInputUnit';
import { Grid, Typography } from '@material-ui/core';
import { ReactComponent as SearchIcon } from '../../assets/icons/IconSearch.svg';
import { useStyles, StyledTextField, AddButton } from '../../styles/MainStyles';
import AddIcon from '@material-ui/icons/Add';
import NewCompanyStepper from '../SalesScreens/NewCompanySteps/NewCompanyStepper';
import { useDispatch } from 'react-redux';
import NewUserModal from '../ui/admin/NewUserModal/NewUserModal.jsx';

function Filters(props) {
	const { pageType, type, status, setProperty } = props;
	const dispatch = useDispatch();
	const [localSearch, setLocalSearch] = useState('');
	const classes = useStyles();
	const userType = pageType === 'salesUsers' ? 'sales' : pageType === 'authorsUsers' ? 'author' : '';

	console.log('filters props', props);

	useEffect(() => {
		return () => {
			dispatch(setProperty({ key: 'search', value: '' }));
			dispatch(setProperty({ key: 'status', value: '' }));
		};
	}, []);

	const typeArray = [
		{
			value: 'all',
			name: 'All',
		},
		{
			value: 'client',
			name: 'Client',
		},
		{
			value: 'prospect',
			name: 'Prospect',
		},
	];
	const statusArray = [
		{
			value: 'all',
			name: 'All',
		},
		{
			value: false,
			name: 'Inactive',
		},
		{
			value: true,
			name: 'Active',
		},
	];
	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<Grid container justifyContent="space-between" alignItems="center">
			<Grid item xs={8}>
				<Grid container spacing={1}>
					<Grid item xs={pageType !== 'companies' ? 6 : 4}>
						<StyledTextField
							value={localSearch}
							onChange={(e) => setLocalSearch(e.target.value)}
							onKeyDown={(e) =>
								e.key === 'Enter' ? dispatch(setProperty({ key: 'search', value: localSearch })) : null
							}
							variant="outlined"
							fullWidth
							placeholder="Search"
							InputProps={{
								endAdornment: (
									<SearchIcon
<<<<<<< HEAD
										onClick={() =>
											dispatch(setProperty({ key: 'search', value: localSearch }))
										}
=======
										onClick={(e) => dispatch(setProperty({ key: 'search', value: localSearch }))}
>>>>>>> b0acf1d75db7ab3ec6ceab4bb0ec211c0195707c
										className={classes.searchIcon}
										style={{ cursor: 'pointer' }}
									/>
								),
							}}
						/>
					</Grid>
					{pageType === 'companies' && (
						<Grid item xs={4}>
							<SelectInputUnit
								className={classes.autoCompleteStyle}
								name="type"
								label={type ? '' : 'Type'}
								optionLabelField="name"
								valueField="value"
								placeholder="Type"
								value={type}
								onChange={(e) => dispatch(setProperty({ key: 'type', value: e.target.value }))}
								optionsArray={typeArray}
							/>
						</Grid>
					)}
					<Grid item xs={pageType !== 'companies' ? 6 : 4}>
						<SelectInputUnit
							className={classes.autoCompleteStyle}
							name="status"
							label={status !== undefined && status !== null && status !== '' ? '' : 'Status'}
							optionLabelField="name"
							valueField="value"
							placeholder="Status"
							value={status}
							onChange={(e) => dispatch(setProperty({ key: 'status', value: e.target.value }))}
							optionsArray={statusArray}
						/>
					</Grid>
				</Grid>
			</Grid>
			{/* <Grid item xs={3}> */}
			<AddButton disableRipple onClick={handleOpen} style={{ marginRight: '8px' }}>
				<AddIcon className={classes.addIcon} />{' '}
				<Typography style={{ color: '#FFFFFF' }}>&nbsp;&nbsp;New&nbsp;</Typography>
			</AddButton>
			{/* </Grid> */}

			<NewCompanyStepper open={pageType === 'companies' && open} handleClose={handleClose} />

			<NewUserModal open={pageType !== 'companies' && open} userType={userType} handleClose={handleClose} />
		</Grid>
	);
}

export default Filters;
