// Global imports

import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Page imports

import { Home } from './pages/Home.js';

// Component Imports for a test

// PrePages

// Admin panel

// admin debug

// End of any imports

// Functional code:

export const useRoutes = (isAuth, isAdmin) => {
	if (isAuth) {
		if (isAdmin) {
			return (
				<Switch>
					<Route path='/' exact>
						<Home />
					</Route>
				</Switch>
			);
		} else {
			return (
				<Switch>
					<Route path='/' exact>
						<Home />
					</Route>
					<Redirect path='/' exact />
				</Switch>
			);
		}
	} else {
		return (
			<Switch>
				<Route path='/' exact>
					<Home />
				</Route>
			</Switch>
		);
	}
};
