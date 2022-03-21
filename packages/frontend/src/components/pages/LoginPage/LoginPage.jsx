import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actionAuth from '../../../redux/auth/action';
import LoginPageView from './LoginPage.view';
import { validateLogin } from '../../../utils/helpers/validationFunctions';
import { useLocation, Redirect } from 'react-router-dom';

const LoginPage = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const [form, setForm] = useState({ username: '', password: '' });
	const [showPassword, setShowPassword] = useState(false);
	const [errors, setErrors] = useState({});
	const [validationResult, setValidationResult] = useState(false);
	const twoFactAuth = useSelector((state) => state.auth.twoFactAuth);
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const loadingIndicator = useSelector((state) => state.auth.loadingIndicator);
	const isAuthor = useSelector((state) => state.auth.userContent?.type === 'author');
	const isSales = useSelector((state) => state.auth.userContent?.type === 'sales');
	const isAdmin = useSelector((state) => state.auth.userContent?.type === 'admin');
	const isMember = useSelector(
		(state) => state.auth.userContent?.type === 'client' || state.auth.userContent?.type === 'prospect',
	);

	const handleChangeInputs = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
		validateLogin(
			{ [e.target.name]: e.target.value },
			errors,
			setErrors,
			validationResult,
			setValidationResult,
		);
	};

	const handleLogin = () => {
		dispatch(actionAuth.login(form.username, form.password));
	};

	const handlePressEnter = (e) => {
		if (e.key === 'Enter' && form.username !== '' && form.password !== '') {
			handleLogin();
		}
	};

	const handleClickShowPassword = () => setShowPassword(!showPassword);
	const handleMouseDownPassword = () => setShowPassword(!showPassword);

	if (twoFactAuth.token !== null || twoFactAuth.deviceId !== null) {
		return <Redirect to={'verification'} />;
	}

	if (isAuthenticated) {
		if (location.state !== undefined && location.state !== null) {
			return <Redirect to={location.state.from.pathname} />;
		} else {
			if (isAuthor) {
				return <Redirect to="/researches" />;
			} else if (isSales || isAdmin) {
				return <Redirect to="/companies" />;
			} else if (isMember) {
				return <Redirect to="/home" />;
			}
		}
	}

	return (
		<LoginPageView
			handleChangeInputs={handleChangeInputs}
			handleLogin={handleLogin}
			handlePressEnter={handlePressEnter}
			handleClickShowPassword={handleClickShowPassword}
			handleMouseDownPassword={handleMouseDownPassword}
			form={form}
      errors={errors}
      validationResult={validationResult}
      showPassword={showPassword}
			loadingIndicator={loadingIndicator}
		/>
	);
};

LoginPage.displayName = 'LoginPage';
LoginPage.defaultProps = {};

export default React.memo(LoginPage);
