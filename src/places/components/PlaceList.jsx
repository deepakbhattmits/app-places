/** @format */

import React from 'react';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import PlaceItem from './PlaceItem';
const PlaceList = ({ items, onDeletePlace }) => {
	if (!items.length) {
		return (
			<div className='place-list center'>
				<Card>
					<h2>No places found. May be create one ? </h2>
					<Button to='/places/new'> Share Place</Button>
				</Card>
			</div>
		);
	}
	return (
		<ul className='place-list'>
			{items.map((place) => {
				return (
					<PlaceItem
						key={place.id}
						id={place.id}
						image={place.image}
						title={place.title}
						description={place.description}
						address={place.address}
						creatorId={place.creator}
						coordinates={place.location}
						onDelete={onDeletePlace}
					/>
				);
			})}
		</ul>
	);
};
export default PlaceList;
