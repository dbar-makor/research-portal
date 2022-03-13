import React,{useEffect, useRef, useCallback} from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
} from '../../../../redux/companies/companiesSlice';
import { selectChosenCompany } from '../../../../redux/companies/chosenCompanySlice';
import MainSalesScreenView from './MainSalesScreen.view';

const MainSalesScreen = () => {
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
	return <MainSalesScreenView
		loading={loading}
		companiesData={companiesData}
		lastItemRef={lastItemRef}
		chosenCompany={chosenCompany}
	> </MainSalesScreenView>;
};

MainSalesScreen.displayName = 'MainSalesScreen';
MainSalesScreen.defaultProps = {};

export default React.memo(MainSalesScreen);
