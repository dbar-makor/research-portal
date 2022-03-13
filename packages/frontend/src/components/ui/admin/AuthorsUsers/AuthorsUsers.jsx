import React, { useRef, useCallback } from 'react';
import {
	selectAuthorsUsersData,
	setUserProperty,
	selectUsersOffset,
	selectUsersLimit,
	selectUsersLoading,
	selectUsersHasMore,
} from '../../../../redux/users/usersSlice';
import { useDispatch, useSelector } from 'react-redux';

import { selectChosenUserData } from '../../../../redux/users/chosenUserSlice';
import AuthorsUsersView from './AuthorsUsers.view';

const AuthorsUsers = () => {
	const dispatch = useDispatch();
	const authorsData = useSelector(selectAuthorsUsersData);
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
		<AuthorsUsersView
			loading={loading}
			authorsData={authorsData}
			lastItemRef={lastItemRef}
			chosenUser={chosenUser}
		></AuthorsUsersView>
	);
};

AuthorsUsers.displayName = 'AuthorsUsers';
AuthorsUsers.defaultProps = {};

export default React.memo(AuthorsUsers);
