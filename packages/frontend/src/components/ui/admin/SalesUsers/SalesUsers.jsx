import React, { useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectChosenUserData } from '../../../../redux/users/chosenUserSlice';
import {
	selectSalesUsersData,
	setUserProperty,
	selectUsersOffset,
	selectUsersLimit,
	selectUsersLoading,
	selectUsersHasMore,
} from '../../../../redux/users/usersSlice';
import SalesUsersView from './SalesUsers.view';

const SalesUsers = () => {
	const dispatch = useDispatch();
	const salesData = useSelector(selectSalesUsersData);
	const chosenUser = useSelector(selectChosenUserData);
	const loading = useSelector(selectUsersLoading);
	const userOffset = useSelector(selectUsersOffset);
	const userLimit = useSelector(selectUsersLimit);
	const hasMore = useSelector(selectUsersHasMore);
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
					const newOffset = userOffset + userLimit;
					dispatch(setUserProperty({ key: 'offset', value: newOffset }));
				}
			});
			if (node) {
				observer.current.observe(node);
			}
		},
		[loading, hasMore],
	);

	return (
		<SalesUsersView
			loading={loading}
			salesData={salesData}
			lastItemRef={lastItemRef}
			chosenUser={chosenUser}
		></SalesUsersView>
	);
};

SalesUsers.displayName = 'SalesUsers';
SalesUsers.defaultProps = {};

export default React.memo(SalesUsers);
