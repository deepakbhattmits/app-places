/** @format */

import React, { useState, useEffect } from 'react';
import UsersList from '../components/UsersList';

import ErrorModal from '../../shared/components/UIElements/ErrorModal';

import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import { useHttp } from '../../shared/hooks/useHttp';
const Users = () => {
	const { isLoading, error, sendRequest, clearError } = useHttp();
	const [loadedUsers, setLoadedUsers] = useState();
	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const responseData = await sendRequest(
					`${process.env.REACT_APP_BACKEND_URL}/users`
				);
				setLoadedUsers(responseData.users);
			} catch (err) {}
		};
		fetchUsers();
	}, [sendRequest]);
	return (
		<>
			<ErrorModal error={error} onClear={clearError} />

			{isLoading && (
				<div className='center'>
					<LoadingSpinner asOverlay />
				</div>
			)}
			{!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
		</>
	);
};
export default Users;
