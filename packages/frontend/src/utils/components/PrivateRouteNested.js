import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRouteNested = (route) => {
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

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
