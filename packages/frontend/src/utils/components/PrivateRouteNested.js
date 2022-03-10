import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRouteNested = (route) => {
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	console.log('isAuthenticated', isAuthenticated);
	console.log('route', route);
	console.log('route', route.path);

	return (
		<Route
			path={route.path}
			render={(props) =>
				isAuthenticated ? (
					<route.component
						{...props}
						routes={route}
						// setLocation={route.setLocation}
					/>
				) : (
					<Redirect to="/login" />
				)
			}
		/>
	);
};

export default PrivateRouteNested;
