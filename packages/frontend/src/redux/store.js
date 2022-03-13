import { createStore, applyMiddleware } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import createRootReducer from './reducers';

export default function configureAppStore(preloadedState) {

	const middlewares = [thunkMiddleware];
	const middlewareEnhancer = applyMiddleware(...middlewares);

	const enhancers = [middlewareEnhancer];
	const composedEnhancers = composeWithDevTools(...enhancers);

	const store = createStore(createRootReducer(), preloadedState, composedEnhancers);

	// if (process.env.NODE_ENV !== 'production' && module.hot) {
	//   module.hot.accept('./reducers', () => store.replaceReducer(createRootReducer))
	// }

	return store;
}
