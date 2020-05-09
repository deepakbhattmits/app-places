/** @format */

import React from 'react';
import Card from '../../shared/components/UIElements/Card';
import UserItem from './UserItem';
const UserList = ({ items }) => {
	if (items.length === 0) {
		return (
			<div className='center'>
				<Card>
					<h1>No user found.</h1>
				</Card>
			</div>
		);
	}
	return (
		<ul className='users-list'>
			{items.map((user) => {
				return (
					<UserItem
						key={user.id}
						id={user.id}
						image={user.image}
						name={user.name}
						placeCount={user.places.length}
					/>
				);
			})}
		</ul>
	);
};
export default UserList;
