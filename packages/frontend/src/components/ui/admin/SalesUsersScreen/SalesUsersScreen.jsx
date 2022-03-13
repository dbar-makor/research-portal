import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	selectUsersStatus,
	selectUsersSearch,
	setUserProperty,
	selectUsersOffset,
	selectUsersLimit,
	getUsersByTypeAsync,
} from '../../../../redux/users/usersSlice';
import SalesUsersScreenView from './SalesUsersScreen.view';

const SalesUsersScreen = () => {
	const dispatch = useDispatch();
	const userOffset = useSelector(selectUsersOffset);
	const userLimit = useSelector(selectUsersLimit);
	const userSearch = useSelector(selectUsersSearch);
	const userStatus = useSelector(selectUsersStatus);

	useEffect(() => {
		dispatch(getUsersByTypeAsync(userOffset, userLimit, userSearch, 'sales', userStatus));
	}, [userOffset, userLimit, userSearch, userStatus]);

	return (
		<SalesUsersScreenView
			userSearch={userSearch}
			userStatus={userStatus}
			setUserProperty={setUserProperty}
		></SalesUsersScreenView>
	);
};

SalesUsersScreen.displayName = 'SalesUsersScreen';
SalesUsersScreen.defaultProps = {};

export default React.memo(SalesUsersScreen);
