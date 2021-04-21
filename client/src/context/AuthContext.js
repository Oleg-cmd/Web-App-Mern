import { createContext } from 'react';

function noop() {}
export const AuthContext = createContext({
	token: null,
	userId: null,
	userName: null,
	salary: null,
	login: noop,
	logout: noop,
	isAuth: false,
	isAdmin: false,
});
