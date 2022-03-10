import { useState, useEffect, useRef } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { useStyles } from '../../styles/MainStyles';
import SubHeader from '../Reusables/SubHeader';
import TableComponent from '../Reusables/TableComponent';
import {
	getCompaniesDataAsync,
	selectCompaniesData,
	selectSearch,
	selectType,
	selectStatus,
	selectCompaniesLoading,
	selectCompaniesMetaData,
	setProperty,
	selectOffset,
	selectLimit,
} from '../../redux/companies/companiesSlice';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import Filters from '../Reusables/Filters';
import CompanyInfo from './CompanyDetails/CompanyInfo';
import MembersTable from './MembersDetails/MembersTable';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import { selectChosenCompany } from '../../redux/companies/chosenCompanySlice';

export default function SalesUserInfoContainer() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const companiesData = useSelector(selectCompaniesData);
	const search = useSelector(selectSearch);
	const type = useSelector(selectType);
	const status = useSelector(selectStatus);
	const loading = useSelector(selectCompaniesLoading);
	const metaData = useSelector(selectCompaniesMetaData);
	const offset = useSelector(selectOffset);
	const limit = useSelector(selectLimit);
	// const [offset, setOffset] = useState(0)
	// const [limit, setLimit] = useState(15)
	const [scrollIndex, setScrollIndex] = useState(0);
	const scrollRef = useRef();
	const chosenCompany = useSelector(selectChosenCompany);

	// const fetchCompaniesData = AwesomeDebouncePromise(dispatch(getCompaniesDataAsync(offset, limit, search, type, status)), 500)

	useEffect(() => {
		dispatch(getCompaniesDataAsync(offset, limit, search, type, status));

		// fetchCompaniesData()
	}, [offset, limit, search, type, status]);

	useEffect(() => {
		dispatch(setProperty({ key: 'offset', value: 0 }));

		// fetchCompaniesData()
	}, [search, type, status]);

	useEffect(() => {
		console.log('chosenCompany', chosenCompany);
	}, [chosenCompany]);

	const handleScroll = (e) => {
		// setScroll('top')
		// if (metaData?.sum_rows > companiesData.length && wheel < 0 &&
		if (
			metaData?.sum_rows > companiesData.length &&
			e.target.scrollHeight - scrollRef.current.scrollHeight - e.target.scrollTop < 1 &&
			e.target.scrollHeight - scrollRef.current.scrollHeight - e.target.scrollTop >= 0
		) {
			const newOffset = offset + limit;
			dispatch(setProperty({ key: 'offset', value: newOffset }));
			setScrollIndex(newOffset);
			// dispatch(setProperty({key: 'offset', value: newOffset}))
			// containerRef.current.addEventListener('wheel', wheelListener, false)
		}
	};

	return (
		companiesData.length && (
			<Grid
				item
				xs={6}
				className={classes.scrollableTableContainer}
				// onWheel={(e) => setWheel(e.nativeEvent.wheelDelta)}
				onScroll={(e) => handleScroll(e)}
			>
				<TableComponent data={companiesData} pageType="companies" scrollIndex={scrollIndex} />
			</Grid>
		)
	);
}
