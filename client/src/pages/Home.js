import { AuthContext } from '../context/AuthContext';
import React, { useContext } from 'react';

import { ToastsContainer, ToastsStore } from 'react-toasts';
export const Home = () => {
	const auth = useContext(AuthContext);
	const logoutFunc = async () => {
		auth.logout();
		ToastsStore.success('Success logout');
		console.log('Logout is complete');
	};
	return (
		<div className='Home'>
			<div>
				<h2>Home</h2>
			</div>
			<div>
				<button onClick={logoutFunc}>
					<h3>Logout</h3>
				</button>
			</div>
			<ToastsContainer store={ToastsStore} />
		</div>
	);
};
