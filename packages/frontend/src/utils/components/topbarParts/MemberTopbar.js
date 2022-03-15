import { Grid, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import SelectInputUnit from '../../../components/Reusables/SelectInputUnit';
import { ReactComponent as SearchIcon } from '../../../assets/icons/IconSearch.svg';
import { StyledTextField } from '../../../styles/MainStyles';

const MemberTopbar = ({ classes, options }) => {
	return (
		<Grid item xs={8}>
			<Grid container justifyContent="space-between">
				<Grid item xs={6}>
					<Grid container style={{ marginTop: '10px' }}>
						<Grid item xs={4}>
							<Link to="/home" className={classes.link}>
								<Typography className={classes.title}>Home</Typography>
							</Link>
						</Grid>
						<Grid item xs={4}>
							<Link to={'/'} className={classes.styledLinks}>
								Ideas
							</Link>
						</Grid>
						<Grid item xs={4}>
							<Link to={'/'} className={classes.styledLinks}>
								Mkt Calendar
							</Link>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={6}>
					<Grid container direction="row" justifyContent="space-between" alignItems="center">
						<Grid item xs={3}>
							<SelectInputUnit
								className={classes.select}
								mode="minimalistic"
								variant="standard"
								optionLabelField="name"
								valueField="value"
								placeholder="All Regions"
								optionsArray={options}
							></SelectInputUnit>
						</Grid>

						<Grid item xs={6}>
							<StyledTextField
								className={classes.search}
								// value={localSearch}
								// onChange={(e) => setLocalSearch(e.target.value)}
								// onKeyDown={(e) => (e.key === 'Enter' ? dispatch(setProperty({ key: 'search', value: localSearch })) : null)}
								variant="filled"
								fullWidth
								placeholder="Idea/Ticker"
								InputProps={{
									endAdornment: (
										<SearchIcon
											className={classes.searchIcon}
											style={{ cursor: 'pointer' }}
										/>
									),
								}}
							/>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default MemberTopbar;
