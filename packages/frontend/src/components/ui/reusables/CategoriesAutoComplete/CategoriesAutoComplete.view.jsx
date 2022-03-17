import React from 'react';
import { Grid, Typography, TextField, Chip } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { StyledAutoComplete } from '../../../../styles/MainStyles';
import { useSelector } from 'react-redux';
import useStyles from './CategoriesAutoComplete.style';

const CategoriesAutoCompleteView = (props) => {
	const classes = useStyles();
  const categoriesArr = useSelector((state) => state.utils.utils.category);


	return (
		<>
			{categoriesArr && (
				<Grid container className={props.className}>
					{props.label && (
						<Grid item xs={12}>
							<Typography>{props.label}</Typography>
						</Grid>
					)}
					<Grid item xs={12}>
						<StyledAutoComplete
							className={classes.arrowIcon}
							id="categories"
							name="categories"
							multiple
							filterSelectedOptions
							options={categoriesArr}
							renderTags={() => <></>}
							fullWidth
							value={props.formObject.categories ? props.formObject.categories : props.formObject || ''}
							onChange={(e, values) => props.handler(values)}
							{...(props.error && { error: true, helperText: props.error })}
							getOptionLabel={(option) => option.name || ''}
							getOptionSelected={(option, value) => option.name === value.name}
							renderInput={(params) => {
								return (
									<TextField
										{...params}
										autoComplete="off"
										variant="outlined"
										width="100%"
										placeholder="Categories"
										{...(props.error && { error: true, helperText: props.error })}
									/>
								);
							}}
						/>
						{props.adjustedFormObject.length ? (
							<Grid item xs={12}>
								<Grid container className={classes.chipContainer}>
									{props.adjustedFormObject.map((el, index) => (
										<Grid item key={index} className={classes.chipItem}>
											<Chip
												variant={props.chipVariant}
												label={el.name}
												onDelete={() => props.deleteItem(index)}
												deleteIcon={<ClearIcon />}
												className={classes.chip}
											/>
										</Grid>
									))}
								</Grid>
							</Grid>
						) : null}
					</Grid>
				</Grid>
			)}
		</>
	);
};

CategoriesAutoCompleteView.displayName = 'CategoriesAutoCompleteView';
CategoriesAutoCompleteView.defaultProps = {};

export default React.memo(CategoriesAutoCompleteView);
