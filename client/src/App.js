// global imports
import React from 'react';
import Helmet from 'react-helmet';
import { BrowserRouter as Router } from 'react-router-dom';

// some hooks and usage code imports
import { useRoutes } from './routes';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';

// google analytics

// components imports

// styles

// func code:

function App() {
	const {
		token,
		userAdmin,
		userName,
		salary,
		login,
		logout,
		userId,
		ready,
	} = useAuth();
	const isAuth = !!token;
	const isAdmin = !!userAdmin;
	const routes = useRoutes(isAuth, isAdmin);

	return (
		<AuthContext.Provider
			value={{
				token,
				login,
				logout,
				userId,
				isAuth,
				isAdmin,
				userName,
				salary,
			}}>
			<Router>
				<Helmet>
					<title>Ezoterika</title>
					<meta name='viewport' content='width=device-width, initial-scale=1' />
				</Helmet>
				<div className='container'>{routes}</div>
			</Router>
		</AuthContext.Provider>
	);
}

export default App;
