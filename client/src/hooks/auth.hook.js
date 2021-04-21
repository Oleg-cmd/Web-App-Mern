import { useState, useCallback, useEffect } from 'react';

const storageName = 'userData';

export const useAuth = () => {
	const [token, setToken] = useState(null);
	const [userId, setUserId] = useState(null);
	const [ready, setReady] = useState(false);
	const [userAdmin, setisAdmin] = useState(false);
	const [userEmail, setUserEmail] = useState(null);
	const [salary, setSalary] = useState(null);

	const login = useCallback((jwtToken, id, isAdmin, email, salary) => {
		setToken(jwtToken);
		setUserId(id);
		setisAdmin(isAdmin);
		setUserEmail(email);
		setSalary(salary);
		localStorage.setItem(
			storageName,
			JSON.stringify({
				userId: id,
				token: jwtToken,
				userAdmin: isAdmin,
				userEmail: email,
				salary: salary,
			}),
		);
	}, []);

	const logout = useCallback(() => {
		setToken(null);
		setUserId(null);
		setisAdmin(false);
		setUserEmail(null);
		setSalary(null);
		localStorage.removeItem(storageName);
	}, []);

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem(storageName));

		if (data && data.token) {
			login(
				data.token,
				data.userId,
				data.userAdmin,
				data.userEmail,
				data.salary,
			);
		}
		setReady(true);
	}, [login]);

	return {
		login,
		logout,
		token,
		userId,
		ready,
		userAdmin,
		userEmail,
		salary,
	};
};
