import React, { useEffect } from 'react';
import AuthorsUsersScreenView from './AuthorsUsersScreen.view';
import { useSelector, useDispatch } from 'react-redux';
import {
	selectUsersOffset,
	selectUsersLimit,
	selectUsersStatus,
	selectUsersSearch,
	setUserProperty,
	getUsersByTypeAsync,
} from '../../../../redux/users/usersSlice';

const AuthorsUsersScreen = () => {
	const dispatch = useDispatch();
	const userOffset = useSelector(selectUsersOffset);
	const userLimit = useSelector(selectUsersLimit);
	const userSearch = useSelector(selectUsersSearch);
	const userStatus = useSelector(selectUsersStatus);

	useEffect(() => {
		dispatch(getUsersByTypeAsync(userOffset, userLimit, userSearch, 'author', userStatus));
	}, [userOffset, userLimit, userSearch, userStatus]);
	return (
		<AuthorsUsersScreenView
			userSearch={userSearch}
			userStatus={userStatus}
			setUserProperty={setUserProperty}
		></AuthorsUsersScreenView>
	);
};

AuthorsUsersScreen.displayName = 'AuthorsUsersScreen';
AuthorsUsersScreen.defaultProps = {};

export default React.memo(AuthorsUsersScreen);
