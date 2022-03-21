import './App.css';
import { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import LoginPage from './components/pages/LoginPage/LoginPage';
import GeneralHome from './components/pages/GeneralHome/GeneralHome';
import PrivateRoute from './components/layout/PrivateRoute/PrivateRoute';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { setAuthToken } from './utils/constants';

// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { LOGIN_SUCCESS } from './redux/auth/constants';
import AuthorsNewArticle from './components/ui/author/AuthorsnewArticle/AuthorsNewArticle';
import AllPublications from './components/ui/author/allPublications/AllPublications/AllPublications';
import TopBar from './components/layout/TopBar/TopBar';
import GeneralContractView from './components/ui/salesman/contractViews/GeneralContractView/GeneralContractView';
import Snackbar from './components/ui/Snackbar/Snackbar.jsx';
import Sales from './components/ui/salesman/Sales/Sales';
import DeadArticle from './components/ui/author/DeadArticle/DeadArticle';
import Article from './components/ui/researches/Article/Article';
import SalesUsersScreen from './components/ui/admin/SalesUsersScreen/SalesUsersScreen.jsx';
import AuthorsUsersScreen from './components/ui/admin/AuthorsUsersScreen/AuthorsUsersScreen.jsx';
import FooterMember from './components/layout/FooterMember/FooterMember';
import MembersMain from './components/Members/MembersMain';
import FullPublication from './components/Members/ShowPublication/FullPublication';
import AllContracts from './components/ui/salesman/contractViews/allContracts/AllContract/AllContract';
import AllInvoices from './components/ui/salesman/contractViews/allInvoices/AllInvoices/AllInvoices';
import AllNotifications from './components/Members/Notifications/AllNotifications';
import AccountSettings from './components/AccountSettings/AccountSettings';

function App() {
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const dispatch = useDispatch();
	const isAuthor = useSelector((state) => state.auth.userContent?.type === 'author');
	const isSales = useSelector((state) => state.auth.userContent?.type === 'sales');
	const isAdmin = useSelector((state) => state.auth.userContent?.type === 'admin');
	const isMember = useSelector(
		(state) => state.auth.userContent?.type === 'client' || state.auth.userContent?.type === 'prospect',
	);

	useEffect(() => {
		const existingToken = localStorage.getItem('token');
		if (existingToken) {
			setAuthToken(existingToken);
			const loggedUser = JSON.parse(localStorage.getItem('userContent'));
			dispatch({
				type: LOGIN_SUCCESS,
				payload: { token: existingToken, userContent: loggedUser },
			});
		}
	}, []);

	const mainTheme = createTheme({
		typography: {
			fontFamily: [
				`'Inter', 
        sans-serif`,
			].join(','),
		},
		overrides: {
			MUIRichTextEditor: {
				root: {
					'width': '100%',
					'& .MuiIconButton-root': {
						color: '#001858',
					},
				},
				toolbar: {
					display: 'flex',
					justifyContent: 'space-between',
					borderTop: '2px solid #A5AFC233',
					borderLeft: '2px solid #A5AFC233',
					borderRight: '2px solid #A5AFC233',
					borderBottom: '1px solid #A5AFC233',
					borderRadius: '8px 8px 0px 0px',
					marginTop: '13px',
				},

				editor: {
					'label': {
						color: 'red',
					},
					'borderTop': 'none',
					'border': '2px solid #A5AFC233',
					'borderRadius': '0px 0px 8px 8px',
					'padding': '10px',
					'height': '630px',
					'lineHeight': 1.5,
					'maxHeight': '630px',
					'overflow': 'auto',
					'&::-webkit-scrollbar': {
						width: '3px',
						height: '3px',
					},
					'&::-webkit-scrollbar-track': {
						boxShadow: 'inset 0 0 5px #FFFFFF',
						borderRadius: '10px',
					},
					'&::-webkit-scrollbar-thumb': {
						backgroundColor: 'grey',
						borderRadius: '10px',
					},
				},
				placeHolder: {
					padding: 10,
					color: '#868DA2',
				},
			},
		},
	});

	const AuthorsViews = () => {
		return (
			<Switch>
				<PrivateRoute exact path="/researches" component={AllPublications} />
				<PrivateRoute exact path="/new-article" component={AuthorsNewArticle} />
				<PrivateRoute exact path="/upload-article" component={DeadArticle} />
				<PrivateRoute exact path="article/:id" component={Article} />
				<PrivateRoute path="/prearticle" component={FullPublication} />
				<PrivateRoute path="/*" component={LoginPage} />
			</Switch>
		);
	};

	const SalesmenViews = () => {
		return (
			<Switch>
				<PrivateRoute exact path="/companies" component={Sales} />
				<PrivateRoute exact path="/contracts" component={AllContracts} />
				<PrivateRoute exact path="/invoices" component={AllInvoices} />
				<PrivateRoute exact path="/contract" component={GeneralContractView} />
				<PrivateRoute path="/*" component={LoginPage} />
			</Switch>
		);
	};

	const AdminViews = () => {
		return (
			<Switch>
				<PrivateRoute exact path="/companies" component={Sales} />
				<PrivateRoute exact path="/contract" component={GeneralContractView} />
				<PrivateRoute exact path="/authors" component={AuthorsUsersScreen} />
				<PrivateRoute exact path="/sales" component={SalesUsersScreen} />
				<PrivateRoute path="/*" component={LoginPage} />
			</Switch>
		);
	};

	const MembersView = () => {
		return (
			<Switch>
				<PrivateRoute path="/home" component={MembersMain} />
				<PrivateRoute path="/settings" component={AccountSettings}>
				</PrivateRoute>
				<PrivateRoute exact path="/article/:pubId" component={FullPublication} />
				<PrivateRoute exact path="/all_notfications" component={AllNotifications} />
				<PrivateRoute path="/*" component={LoginPage} />
			</Switch>
		);
	};

	return (
		<ThemeProvider theme={mainTheme}>
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<div>
					{isAuthenticated && <TopBar />}
					<Snackbar />
					<Switch>
						<Route exact path="/login" component={LoginPage} />
						<Route exact path="/home" component={GeneralHome} />
						{isAdmin && <Route component={AdminViews} />}
						{isAuthor && <Route component={AuthorsViews} />}
						{isSales && <Route component={SalesmenViews} />}
						{isMember && <Route component={MembersView} />}
						<PrivateRoute path="/*" component={LoginPage} />
					</Switch>
				</div>
			</MuiPickersUtilsProvider>
			{isAuthenticated &&
				(isMember ? <FooterMember style={{ position: 'absolute', bottom: 0 }} /> : <></>)}
		</ThemeProvider>
	);
}

export default App;
