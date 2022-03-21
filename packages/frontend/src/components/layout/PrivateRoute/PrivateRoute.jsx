import React from 'react';
import { useSelector } from 'react-redux';

import PrivateRouteView from './PrivateRoute.view';

const PrivateRoute = (props) => {
	const { component, ...rest } = props;
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

	return (
		<PrivateRouteView
		component={component}
			isAuthenticated={isAuthenticated}
			{...rest}
		></PrivateRouteView>
	);
};

PrivateRoute.displayName = 'PrivateRoute';
PrivateRoute.defaultProps = {};

export default React.memo(PrivateRoute);
