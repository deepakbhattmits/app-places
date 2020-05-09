/** @format */

import React, { useState, useEffect } from 'react';
import PlaceList from '../components/PlaceList';

import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useParams } from 'react-router-dom';
import { useHttp } from '../../shared/hooks/useHttp';
const UserPlaces = () => {
	const [loadedPlaces, setLoadedPlaces] = useState();
	const { isLoading, error, sendRequest, clearError } = useHttp();
	const { userId } = useParams();
	const placeDeletedHandler = (deletedPlaceId) => {
		setLoadedPlaces((prevPlaces) =>
			prevPlaces.filter((place) => place.id !== deletedPlaceId)
		);
	};
	useEffect(() => {
		const fetchPlaces = async () => {
			try {
				const responseData = await sendRequest(
					`${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`
				);
				setLoadedPlaces(responseData.places);
			} catch (err) {}
		};
		fetchPlaces();
	}, [sendRequest, userId]);

	return (
		<>
			<ErrorModal error={error} onClear={clearError} />
			{isLoading && (
				<div className='center'>
					<LoadingSpinner asOverlay />
				</div>
			)}
			{!isLoading && loadedPlaces && (
				<PlaceList items={loadedPlaces} onDeletePlace={placeDeletedHandler} />
			)}
		</>
	);
};
export default UserPlaces;
