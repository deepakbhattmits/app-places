/** @format */

import React, { Suspense } from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import history from './history';
// import Auth from './user/pages/Auth';
// import Users from './user/pages/Users';
// import NewPlace from './places/pages/NewPlace';
// import UserPlaces from './places/pages/UserPlaces';
// import UpdatePlace from './places/pages/UpdatePlace';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/useAuth';
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner';

const Users = React.lazy(() => import('./user/pages/Users'));
const NewPlace = React.lazy(() => import('./places/pages/NewPlace'));
const UserPlaces = React.lazy(() => import('./places/pages/UserPlaces'));
const UpdatePlace = React.lazy(() => import('./places/pages/UpdatePlace'));
const Auth = React.lazy(() => import('./user/pages/Auth'));

const App = () => {
	const { userId, token, login, logout } = useAuth();
	let routes;
	if (token) {
		routes = (
			<Switch>
				<Route path='/' exact>
					<Users />
				</Route>
				<Route path='/:userId/places' exact>
					<UserPlaces />
				</Route>
				<Route path='/places/new' exact>
					<NewPlace />
				</Route>
				<Route path='/places/:placeId'>
					<UpdatePlace />
				</Route>
				<Redirect to='/' />
			</Switch>
		);
	} else {
		routes = (
			<Switch>
				<Route path='/' exact>
					<Users />
				</Route>
				<Route path='/:userId/places' exact>
					<UserPlaces />
				</Route>
				<Route path='/auth' exact>
					<Auth />
				</Route>
				<Redirect to='/auth' />
			</Switch>
		);
	}
	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: !!token,
				token: token,
				userId: userId,
				login: login,
				logout: logout,
			}}>
			<Router history={history}>
				<MainNavigation />
				<main>
					<Suspense
						fallback={
							<div className='center'>
								<LoadingSpinner />
							</div>
						}>
						{routes}
					</Suspense>
				</main>
			</Router>
		</AuthContext.Provider>
	);
};

export default App;
