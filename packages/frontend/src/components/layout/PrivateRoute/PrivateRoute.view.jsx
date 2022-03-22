import React from 'react';
import { Route, Redirect } from 'react-router-dom';

//import useStyles from './PrivateRoute.style';

const PrivateRouteView = (props) => {
const Component = props.component;

  return  (
		<Route
			{...props.rest}
			render={(rest) =>
				props.isAuthenticated ? (
					<Component {...rest} />
				) : (
					<Redirect
						to={{
							pathname: '/Login',
							state: { from: rest.location },
						}}
					/>
				)
			}
		/>
	);
};

PrivateRouteView.displayName = 'PrivateRouteView';
PrivateRouteView.defaultProps = {};

export default React.memo(PrivateRouteView);
