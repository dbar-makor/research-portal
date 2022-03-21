import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import SelectInputUnit from '../../../../components/ui/reusables/SelectInputUnit/SelectInputUnit';
import { ReactComponent as SearchIcon } from '../../../../assets/icons/IconSearch.svg';
import { StyledTextField } from '../../../../styles/MainStyles';

const MemberTopbarView = (props) => {

  return (
		<Grid item xs={8}>
			<Grid container justifyContent="space-between">
				<Grid item xs={6}>
					<Grid container style={{ marginTop: '10px' }}>
						<Grid item xs={4}>
							<Link to="/home" className={props.classes.link}>
								<Typography className={props.classes.title}>Home</Typography>
							</Link>
						</Grid>
						<Grid item xs={4}>
							<Link to={'/'} className={props.classes.styledLinks}>
								Ideas
							</Link>
						</Grid>
						<Grid item xs={4}>
							<Link to={'/'} className={props.classes.styledLinks}>
								Mkt Calendar
							</Link>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={6}>
					<Grid container direction="row" justifyContent="space-between" alignItems="center">
						<Grid item xs={3}>
							<SelectInputUnit
								className={props.classes.select}
								mode="minimalistic"
								variant="standard"
								optionLabelField="name"
								valueField="value"
								placeholder="All Regions"
								optionsArray={props.options}
							></SelectInputUnit>
						</Grid>

						<Grid item xs={6}>
							<StyledTextField
                                id="regionSelect"
								className={props.classes.search}
								// value={localSearch}
								// onChange={(e) => setLocalSearch(e.target.value)}
								// onKeyDown={(e) => (e.key === 'Enter' ? dispatch(setProperty({ key: 'search', value: localSearch })) : null)}
								variant="filled"
								fullWidth
								placeholder="Idea/Ticker"
								InputProps={{
									endAdornment: (
										<SearchIcon
											className={props.classes.searchIcon}
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

MemberTopbarView.displayName = 'MemberTopbarView';
MemberTopbarView.defaultProps = {};

export default React.memo(MemberTopbarView);
