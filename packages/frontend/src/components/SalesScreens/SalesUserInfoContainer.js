import { useState, useEffect, useRef } from 'react';
import { Grid } from '@material-ui/core';
import { useStyles } from '../../styles/MainStyles';
import TableComponent from '../Reusables/TableComponent';
import {
	getCompaniesDataAsync,
	selectCompaniesData,
	selectSearch,
	selectType,
	selectStatus,
	selectCompaniesMetaData,
	setProperty,
	selectOffset,
	selectLimit,
} from '../../redux/companies/companiesSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function SalesUserInfoContainer() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const companiesData = useSelector(selectCompaniesData);
	const search = useSelector(selectSearch);
	const type = useSelector(selectType);
	const status = useSelector(selectStatus);
	const metaData = useSelector(selectCompaniesMetaData);
	const offset = useSelector(selectOffset);
	const limit = useSelector(selectLimit);
	// const [offset, setOffset] = useState(0)
	// const [limit, setLimit] = useState(15)
	const [scrollIndex, setScrollIndex] = useState(0);
	const scrollRef = useRef();

	// const fetchCompaniesData = AwesomeDebouncePromise(dispatch(getCompaniesDataAsync(offset, limit, search, type, status)), 500)

	useEffect(() => {
		dispatch(getCompaniesDataAsync(offset, limit, search, type, status));

		// fetchCompaniesData()
	}, [offset, limit, search, type, status]);

	useEffect(() => {
		dispatch(setProperty({ key: 'offset', value: 0 }));

		// fetchCompaniesData()
	}, [search, type, status]);

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
