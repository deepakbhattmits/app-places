/** @format */

import React, { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';

import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import {
	VALIDATOR_REQUIRE,
	VALIDATOR_MINLENGTH,
} from '../../shared/util/validators';

import { useForm } from '../../shared/hooks/useForm';
import { useHttp } from '../../shared/hooks/useHttp';
import { AuthContext } from '../../shared/context/auth-context';

const UpdatePlace = () => {
	const auth = useContext(AuthContext);
	const [loadedPlace, setLoadedPlace] = useState();
	const { placeId } = useParams();
	const history = useHistory();
	const { isLoading, error, sendRequest, clearError } = useHttp();
	const [formState, inputHandler, setFromData] = useForm(
		{
			title: {
				value: '',
				isValid: false,
			},
			description: {
				value: '',
				isValid: false,
			},
		},
		false
	);
	useEffect(() => {
		const fetchPlace = async () => {
			try {
				const responseData = await sendRequest(
					`${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`
				);
				setLoadedPlace(responseData.place);
				setFromData(
					{
						title: {
							value: responseData.place.title,
							isValid: true,
						},
						description: {
							value: responseData.place.description,
							isValid: true,
						},
					},
					true
				);
			} catch (err) {}
		};
		fetchPlace();
	}, [sendRequest, placeId, setFromData]);
	if (isLoading) {
		return (
			<div className='center'>
				<Card>
					<LoadingSpinner />
				</Card>
			</div>
		);
	}
	if (!loadedPlace && !error) {
		return (
			<div className='center'>
				<Card>
					<h2>could not found place!</h2>
				</Card>
			</div>
		);
	}
	const placeUpdateHandler = async (e) => {
		e.preventDefault();
		try {
			await sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`,
				'PATCH',
				JSON.stringify({
					title: formState.inputs.title.value,
					description: formState.inputs.description.value,
				}),
				{
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + auth.token,
				}
			);
			history.push(`/${auth.userId}/places`);
		} catch (err) {}
	};
	return (
		<>
			<ErrorModal error={error} onClear={clearError} />
			{!isLoading && loadedPlace && (
				<form className='place-form' onSubmit={placeUpdateHandler}>
					<Input
						id='title'
						element='input'
						type='text'
						label='Title'
						validators={[VALIDATOR_REQUIRE()]}
						errorText='Please enter a valid title.'
						initialValue={loadedPlace.title}
						initialIsValid={true}
						onInput={inputHandler}
					/>
					<Input
						id='description'
						element='textarea'
						label='Description'
						validators={[VALIDATOR_MINLENGTH(5)]}
						errorText='Please enter a valid description (at least 5 characters).'
						initialValue={loadedPlace.description}
						initialIsValid={true}
						onInput={inputHandler}
					/>

					<Button type='submit' disabled={!formState.isValid}>
						UPDATE PLACE
					</Button>
				</form>
			)}
		</>
	);
};
export default UpdatePlace;
