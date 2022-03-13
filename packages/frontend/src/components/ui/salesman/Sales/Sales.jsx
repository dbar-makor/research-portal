import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	selectSearch,
	selectType,
	selectStatus,
	setProperty,
} from '../../../../redux/companies/companiesSlice';
import * as utilsAction from '../../../../redux/utils/utilsSlice';
import SalesView from './Sales.view';

const Sales = () => {
	const dispatch = useDispatch();
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const search = useSelector(selectSearch);
	const type = useSelector(selectType);
	const status = useSelector(selectStatus);

	useEffect(() => {
		if (isAuthenticated) {
			dispatch(utilsAction.getUtilsAsync());
		}
	}, []);
	return (
		<SalesView search={search} type={type} status={status} setProperty={setProperty}>
		</SalesView>
	);
};

Sales.displayName = 'Sales';
Sales.defaultProps = {};

export default React.memo(Sales);
