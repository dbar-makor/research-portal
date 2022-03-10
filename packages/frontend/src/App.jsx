import './App.css';
import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import LoginPage from './pages/LoginPage';
import home from './pages/home';
import PrivateRoute from './utils/components/PrivateRoute';
import { useParams } from 'react-router-dom';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { setAuthToken } from './utils/constants';

// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { LOGIN_SUCCESS } from './redux/auth/constants';
import AuthorsNewArticle from './components/ui/author/AuthorsnewArticle/AuthorsNewArticle';
import AllPublications from './components/AuthorsScreens/allPublications/AllPublications';
import TopBar from './utils/components/TopBar';
import GeneralContractView from './components/SalesScreens/ContractViews/GeneralContractView';
import Snackbar from './components/ui/Snackbar/Snackbar.jsx';
import Sales from './components/SalesScreens/Sales';
import DeadArticle from './components/AuthorsScreens/DeadArticle';
import Article from './components/ui/researches/Article/Article';

//import AuthorsUsers from './components/ui/admin/AuthorsUsers/AuthorsUsers'
import SalesUsersScreen from './components/ui/admin/SalesUsersScreen/SalesUsersScreen.jsx';
import AuthorsUsersScreen from './components/ui/admin/AuthorsUsersScreen/AuthorsUsersScreen.jsx';
import MembersBar from './utils/components/MembersBar';
import Footer from './utils/components/Footer';
import FooterMember from './utils/components/FooterMember';
import MembersMain from './components/Members/MembersMain';
import FullPublication from './components/Members/ShowPublication/FullPublication';
import AllContracts from './components/SalesScreens/ContractViews/AllContracts/AllContract';
import AllInvoices from './components/SalesScreens/ContractViews/AllInvoices/AllInvoices';
import AllNotifications from './components/Members/Notifications/AllNotifications';
import AccountSettings from './components/AccountSettings/AccountSettings';

function App() {
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const dispatch = useDispatch();
	// const match = useRouteMatch('/dashboard/:category/:id')
	// const token = useSelector(state => state.auth.token);
	// const location = window.location.pathname
	const params = useParams();
	// const location = location.pathname
	const isAuthor = useSelector((state) => state.auth.userContent?.type === 'author');
	const isSales = useSelector((state) => state.auth.userContent?.type === 'sales');
	const isAdmin = useSelector((state) => state.auth.userContent?.type === 'admin');
	const isMember = useSelector(
		(state) => state.auth.userContent?.type === 'client' || state.auth.userContent?.type === 'prospect',
	);

	useEffect(() => {
		// update redux with localstorage values on page load
		// const existingToken = StorageService.get(storageKeys.userToken)
		const existingToken = localStorage.getItem('token');
		if (existingToken) {
			setAuthToken(existingToken);
			// const loggedUser = StorageService.get(storageKeys.userContent)
			const loggedUser = JSON.parse(localStorage.getItem('userContent'));
			dispatch({
				type: LOGIN_SUCCESS,
				payload: { token: existingToken, userContent: loggedUser },
			});
		}
	}, []);
	console.log('what a refresh');

	// useEffect(() => {
	//   if (isAuthenticated) {
	//     dispatch(utilsAction.getUtilsAsync());
	//   }
	// }, []);

	// useEffect(() => {
	//   dispatch(getUsersDataAsync());
	// }, []);

	const mainTheme = createTheme({
		typography: {
			fontFamily: [
				`'Inter', 
        sans-serif`,
			].join(','),
			//   h6: {
			//     fontSize: 30,
			//     color: "#FFFFFF",
			//   },
			//   h5: {
			//     fontSize: 22,
			//     color: "#FFFFFF",
			//   },
			//   h4: {
			//     fontSize: 18,
			//     color: "#FFFFFF",
			//   },
			//   h3: {
			//     fontSize: 16,
			//     color: "#FFFFFF",
			//   },
			//   h2: {
			//     fontSize: 15,
			//     color: "#CCCCCC",
			//   },
			//   h1: {
			//     fontSize: 15,
			//     color: "#999999",
			//   },
			//   subtitle1: {
			//     fontSize: 14,
			//     color: "#E6E6E6",
			//   },
			//   subtitle2: {
			//     fontSize: 12,
			//     color: "#E6E6E6",
			//   },
			//   body2: {
			//     fontSize: 12,
			//     color: "#FFFFFF",
			//   },
			//   // leave
			//   caption: {
			//     fontSize: 13,
			//     color: "#CCCCCC",
			//   },
			//   sectionTitle: {
			//     fontSize: 20,
			//     color: "#FFFFFF",
			//   },
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

	//----------------SAVE TOKEN-----------------//

	//  useEffect(() => {
	//    // update redux with localstorage values on page load
	//     // const existingToken = StorageService.get(storageKeys.userToken)
	//     const existingToken = localStorage.getItem('token')
	//     if (existingToken) {
	//       setAuthToken(existingToken)
	//       // const loggedUser = StorageService.get(storageKeys.userContent)
	//       const loggedUser = JSON.parse(localStorage.getItem('userContent'))
	//       dispatch({ type: LOGIN_SUCCESS, payload: { token: existingToken, userContent: loggedUser } })

	//     }
	//   }, [])

	const subRoutesSales = [
		{
			path: '/companies',
			component: Sales,
			// routes: [
			//   {
			//     path: "/dashboard/:id",
			//     component: Dashboard,
			//     label: 'API-Keys'
			//   },
			//   {
			//     path: "/dashboard/users",
			//     component: UsersTabContent,
			//     label: 'Users'
			//   },
			// ],
			// modalRoutes: [
			//   {
			//     path: "/dashboard/users/user/:id",
			//     component: ModalComponent
			//   },
			//   {
			//     path: "/dashboard/users/user",
			//     component: ModalComponent
			//   }
			// ]
		},
	];

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
				{/* {subRoutesSales.map((route, i) => <PrivateRouteNested key={i} {...route} />)} */}
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
				{/* {subRoutesSales.map((route, i) => <PrivateRouteNested key={i} {...route} />)} */}
				{/* <IndexRoute component={Sales} /> */}
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
				<PrivateRoute path="/settings">
					<AccountSettings />
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
						{/* <PrivateRoute exact path="/" component={LoginPage} /> */}
						{/* <Route exact path="/" component={LoginPage} /> */}
						<Route exact path="/login" component={LoginPage} />
						<Route exact path="/home" component={home} />
						{/* <Route exact path="/login" render={(props) => <LoginPage {...props} />} /> */}
						{isAdmin && <Route component={AdminViews} />}
						{isAuthor && <Route component={AuthorsViews} />}
						{isSales && <Route component={SalesmenViews} />}
						{isMember && <Route component={MembersView} />}
						<PrivateRoute path="/*" component={LoginPage} />
						{/* <Route path='/settings' component={SettingsComponent} /> */}
						{/* <Route path="/Login" component={LoginPage} /> */}
						{/* <Route
              exact
              path="/EditCategories"
              render={(props) => <EditCategoriesModal {...props} />}
            />
            <Route
              exact
              path="/newArticleModal"
              render={(props) => <AuthorsNewArticleModal {...props} />}
            />
            <Route
              exact
              path="/login"
              render={(props) => <LoginPage {...props} />}
            />
            <Route
              exact
              path="/"
              render={(props) => <LoginPage {...props} />}
            />
            <Route
              exact
              path="/dead-article"
              render={(props) => <DeadArticle {...props} />}
            />
            <PrivateRoute exact path="/upload" component={AuthorsUpload} />
            <PrivateRoute
              exact
              path="/new-article"
              component={AuthorsNewArticle}
            />
            <PrivateRoute exact path="/researches" component={AllPublications} />
            <PrivateRoute exact path="/article/:id" component={ArticlePage} />
            <PrivateRoute
              exact
              path="/subscribers"
              component={SubscribersMain}
            />
            <PrivateRoute exact path="/companies/contract" component={Contract} />
            <PrivateRoute
              exact
              path="/companies/prospects-list"
              component={ProspectsList}
            />
            <PrivateRoute
              exact
              path="/authors-article"
              component={AuthorList}
            />
            <PrivateRoute
              exact
              path="/companies/edit-prospect"
              component={EditProspectForm}
            />
            <PrivateRoute
              exact
              path="/companies/clients-list"
              component={ClientsList}
            />
            <PrivateRoute
              exact
              path="/companies/edit-client"
              component={EditClientForm}
            />
            <PrivateRoute exact path="/companies" component={Sales} /> */}
						{/* <PrivateRoute exact path="/companies" component={SalesTabs} /> */}
						{/* <Route exact path="/new-article" render={(props) => <AuthorsNewArticle {...props} />} />
                  <Route exact path="/researches" render={(props) => <ResearchesMain {...props} />} /> */}
						{/* <PrivateRoute path='/verification' component={VerificationPage} />
                  <PrivateRoute exact path='/dashboard' component={MainPage} />
                  <PrivateRoute exact path='/logs' component={LogsPage} />
                  <PrivateRoute exact path='/tickets' component={TicketsPage} />
                  <PrivateRoute exact path='/messages' component={MessagesPage} />
                  <PrivateRoute path='/ticket/:id' component={SingleTicket} />
                  <PrivateRoute path='/ticket/add' component={SingleTicket} />
                  <PrivateRoute path='/dashboard/:category/:id' component={ItemPage} /> */}
						{/* <PrivateRoute path='/*' component={LoginPage} /> */}
					</Switch>
				</div>
			</MuiPickersUtilsProvider>
			{isAuthenticated &&
				(isMember ? <FooterMember style={{ position: 'absolute', bottom: 0 }} /> : <></>)}
		</ThemeProvider>
	);
}

export default App;
