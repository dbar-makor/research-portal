import React,{ useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
} from '../../../../redux/companies/companiesSlice';
import SalesUserInfoContainerView from './SalesUserInfoContainer.view';

const SalesUserInfoContainer = () => {
  const dispatch = useDispatch();
	const companiesData = useSelector(selectCompaniesData);
	const search = useSelector(selectSearch);
	const type = useSelector(selectType);
	const status = useSelector(selectStatus);
	const metaData = useSelector(selectCompaniesMetaData);
	const offset = useSelector(selectOffset);
	const limit = useSelector(selectLimit);
	const [scrollIndex, setScrollIndex] = useState(0);
	const scrollRef = useRef();


	useEffect(() => {
		dispatch(getCompaniesDataAsync(offset, limit, search, type, status));
	}, [offset, limit, search, type, status]);

	useEffect(() => {
		dispatch(setProperty({ key: 'offset', value: 0 }));
	}, [search, type, status]);

	const handleScroll = (e) => {
		if (
			metaData?.sum_rows > companiesData.length &&
			e.target.scrollHeight - scrollRef.current.scrollHeight - e.target.scrollTop < 1 &&
			e.target.scrollHeight - scrollRef.current.scrollHeight - e.target.scrollTop >= 0
		) {
			const newOffset = offset + limit;
			dispatch(setProperty({ key: 'offset', value: newOffset }));
			setScrollIndex(newOffset);
		}
	};
  return <SalesUserInfoContainerView
	companiesData={companiesData}
	handleScroll={handleScroll}
	scrollIndex={scrollIndex}
	> </SalesUserInfoContainerView>;
};

SalesUserInfoContainer.displayName = 'SalesUserInfoContainer';
SalesUserInfoContainer.defaultProps = {};

export default React.memo(SalesUserInfoContainer);
