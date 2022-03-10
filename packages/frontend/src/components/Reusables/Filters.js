import React, { useState, useEffect } from 'react';
import SelectInputUnit from './SelectInputUnit';
import { Grid, Button, Typography } from '@material-ui/core';
import { ReactComponent as SearchIcon } from '../../assets/icons/IconSearch.svg';
import { useStyles, StyledTextField, AddButton } from '../../styles/MainStyles';
import AddIcon from '@material-ui/icons/Add';
import NewCompanyStepper from '../SalesScreens/NewCompanySteps/NewCompanyStepper';
import { useDispatch, useSelector } from 'react-redux';
// import { selectSearch, selectType, selectStatus, setProperty} from '../../redux/companies/companiesSlice'
import NewUserModal from '../ui/admin/NewUserModal/NewUserModal.jsx';
import { set } from 'lodash';

function Filters(props) {
	const { pageType, search, type, status, setProperty } = props;
	const dispatch = useDispatch();
	const [localSearch, setLocalSearch] = useState('');
	// const search = useSelector(selectSearch)
	// const type = useSelector(selectType)
	// const status = useSelector(selectStatus)
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
										onClick={(e) => dispatch(setProperty({ key: 'search', value: localSearch }))}
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
