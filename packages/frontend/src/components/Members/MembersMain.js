import axios from 'axios';
import { BASE_URL, END_POINT } from '../../utils/constants';
import { FormControl, Grid, InputLabel, MenuItem, Select } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyledTextField } from '../../styles/MainStyles';
import { ReactComponent as SearchIcon } from '../../assets/icons/IconSearch.svg';
import PublicationsGrid from './PublicationsGrid';
import { useStyles } from '../../styles/PublicationsStyles';

import * as actionSnackBar from '../../redux/SnackBar/action';

function MembersMain() {
	const dispatch = useDispatch();
	const classes = useStyles();
	const [filter, setFilter] = useState(false);

	const userCategories = useSelector((state) => state.auth.userContent.categories);
	const [publications, setPublications] = useState();
	const [filterPublications, setFilterPublications] = useState();
	const [category, setCategory] = useState({ id: '', name: '' });
	const [search, setSearch] = useState('');

	const getPublications = async () => {
		try {
			const resp = await axios.get(`${BASE_URL}${END_POINT.PUBLICATION}/user`);
			setPublications(resp.data);
			setFilterPublications(resp.data);
		} catch (err) {
			dispatch(actionSnackBar.setSnackBar('error', err.message, 2000));
		}
	};

	const filterByCategory = (category) => {
		setFilter(true);
		setCategory(category);
		if (category.id !== '') {
			const filterPublications = publications.filter((p) => {
				const categoriesNames = p.categories.map((category) => category.name);
				return categoriesNames.includes(category.name);
			});
			setFilterPublications(filterPublications);
		} else {
			setFilterPublications(publications);
		}
	};

	useEffect(() => {
		getPublications();
	}, []);

	useEffect(() => {
		if (search === '') {
			setFilterPublications(publications);
		}
		if (search !== '') {
			const filterPublications = publications.filter((publication) =>
				//let categoriesNames = p.categories.map((category) => category.name)
				publication.title.toLowerCase().includes(search),
			);
			setFilterPublications(filterPublications);
		}
	}, [search]);
	//
	return (
		<Grid
			container
			justifyContent="center"
			style={{ paddingBlock: 32, minHeight: 'calc(100vh - 300px)' }}
		>
			<Grid item xs={7} style={{ paddingInline: 14 }}>
				<Grid container justifyContent="space-between" alignItems="center">
					<Grid item xs={3}>
						<FormControl style={{ width: '100%' }} className={classes.selectFormControl}>
							<InputLabel
								shrink={false}
								style={{ color: '#9C9C9C', zIndex: 1, marginLeft: 16 }}
							>
								{category.name !== '' ? '' : 'categories'}
							</InputLabel>
							<Select
								disableUnderline
								onChange={(e) => filterByCategory(e.target.value)}
								MenuProps={{
									classes: { paper: classes.sortDropdownStyle, input: classes.input },
								}}
								className={classes.sortSelect}
								disableScrollLock
							>
								<MenuItem value={{ id: '', name: '' }}>All</MenuItem>
								{/* eslint no-unused-vars: 0 */}
								{Object.entries(userCategories).map(([key, value], idx) => {
									return (
										<MenuItem key={idx} value={value}>
											{value.name}
										</MenuItem>
									);
								})}
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={3}>
						<StyledTextField
							value={search}
							size="small"
							onChange={(e) => setSearch(e.target.value.toLowerCase().trim())}
							variant="outlined"
							fullWidth
							placeholder="Search"
							InputProps={{
								endAdornment: <SearchIcon className={classes.searchIcon} />,
							}}
						/>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={7}>
				<Grid container xs={12} style={{ paddingTop: 32 }}>
					{publications && <PublicationsGrid filter={filter} publications={filterPublications} />}
				</Grid>
			</Grid>
		</Grid>
	);
}

export default MembersMain;
