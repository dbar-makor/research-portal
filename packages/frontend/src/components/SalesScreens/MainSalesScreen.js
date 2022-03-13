import { useEffect, useRef, useCallback } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { useStyles } from '../../styles/MainStyles';
import TableComponent from '../Reusables/TableComponent';
import {
	getCompaniesDataAsync,
	selectCompaniesData,
	selectSearch,
	selectType,
	selectStatus,
	selectCompaniesLoading,
	setProperty,
	selectOffset,
	selectHasMore,
	selectLimit,
} from '../../redux/companies/companiesSlice';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import CompanyInfo from './CompanyDetails/CompanyInfo';
import MembersTable from './MembersDetails/MembersTable';
import { selectChosenCompany } from '../../redux/companies/chosenCompanySlice';

function MainSalesScreen() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const companiesData = useSelector(selectCompaniesData);
	const search = useSelector(selectSearch);
	const type = useSelector(selectType);
	const status = useSelector(selectStatus);
	const loading = useSelector(selectCompaniesLoading);
	const offset = useSelector(selectOffset);
	const limit = useSelector(selectLimit);
	const chosenCompany = useSelector(selectChosenCompany);
	const hasMore = useSelector(selectHasMore);

	//Infinite scroll with intersection observer

	// // let domContainer;
	// useEffect(() => {
	//   const domContainer = containerRef.current;
	//   console.log("domContainer",domContainer)

	// }, [])

	const observer = useRef(null);

	const lastItemRef = useCallback(
		(node) => {

			if (loading) {
				return;
			}
			if (observer.current) {
				observer.current.disconnect();
			}

			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && hasMore) {
					const newOffset = offset + limit;
					dispatch(setProperty({ key: 'offset', value: newOffset }));
				}
			});
			if (node) {
				observer.current.observe(node);
			}
		},
		[loading, hasMore],
	);
	//Calling get companies whenever a call parameter changes offset changes by scrolling)
	useEffect(() => {
		dispatch(getCompaniesDataAsync(offset, limit, search, type, status));
	}, [offset, limit, search, type, status]);

	//If search term, company type or status changes, offset is reset to 0
	//to ask for first "page" of results for the new query

	useEffect(() => {
		dispatch(setProperty({ key: 'offset', value: 0 }));
	}, [search, type, status]);

	return (
		<Grid container justifyContent="center">
			<Grid item xs={10}>
				<Grid container>
					{!loading ? (
						<Grid item xs={12}>
							{companiesData.length ? (
								<Grid container>
									{/* <Grid container ref={scrollRef} style={{border: "1px solid red"}}> */}
									<Grid
										item
										xs={6}
										className={classes.scrollableTableContainer}
										// ref={containerRef}
										// onWheel={(e) => setWheel(e.nativeEvent.wheelDelta)}
										// onScroll={handleScroll}
									>
										{/* <Grid container style={{height: "100%"}}> */}
										<TableComponent
											data={companiesData}
											pageType="companies"
											ref={lastItemRef}
										/>
										{/* </Grid> */}
										{/* <TableComponent data={companiesData} pageType='companies' scrollIndex={scrollIndex}/> */}
									</Grid>
									{chosenCompany && (
										<Grid item xs={6}>
											<Grid container style={{ padding: '0px 16px 0px 16px' }}>
												<Grid item xs={12}>
													<CompanyInfo />
												</Grid>
												<Grid item xs={12}>
													<MembersTable />
												</Grid>
											</Grid>
										</Grid>
									)}
								</Grid>
							) : (
								<Grid container>
									<Grid item xs={6}>
										<Typography className={classes.noMatches}>
											No matches found
										</Typography>
									</Grid>
								</Grid>
							)}
						</Grid>
					) : (
						<Grid item xs={12}>
							<Grid
								container
								justifyContent="center"
								alignItems="center"
								className={classes.progressBarContainer}
							>
								<CircularProgress className={classes.progressBar} />
							</Grid>
						</Grid>
					)}
				</Grid>
			</Grid>
		</Grid>
	);
}

export default MainSalesScreen;
