/** @format */

import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../../shared/components/UIElements/Avatar';
import Card from '../../shared/components/UIElements/Card';
const UserItem = ({ id, name, image, placeCount }) => {
	return (
		<li className='user-item'>
			<Card className='user-item__content'>
				<Link to={`${id}/places`}>
					<Avatar
						className='user-item__image'
						image={`${process.env.REACT_APP_ASSET_URL}/${image}`}
						alt={name}
					/>
					<div className='user-item__info'>
						<h2>{name}</h2>
						<h3>
							{placeCount} {placeCount === 1 ? 'Place' : 'Places'}
						</h3>
					</div>
				</Link>
			</Card>
		</li>
	);
};
export default UserItem;
