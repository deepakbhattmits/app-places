/** @format */

import React, { useState, useContext } from 'react';

import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import Map from '../../shared/components/UIElements/Map';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import { useHttp } from '../../shared/hooks/useHttp';
import { AuthContext } from '../../shared/context/auth-context';

const PlaceItem = ({
	id,
	image,
	title,
	description,
	address,
	creatorId,
	coordinates,
	onDelete,
}) => {
	const auth = useContext(AuthContext);
	const [showMap, setShowmap] = useState(false);

	const [showConfirmModal, setShowConfirmModal] = useState(false);

	const { isLoading, error, sendRequest, clearError } = useHttp();
	const openMapHandler = () => setShowmap(true);
	const closeMapHandler = () => setShowmap(false);

	const showDeleteWarningHandler = () => {
		setShowConfirmModal(true);
	};

	const cancelDeleteHandler = () => {
		setShowConfirmModal(false);
	};

	const confirmDeleteHandler = async () => {
		setShowConfirmModal(false);
		try {
			await sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/places/${id}`,
				'DELETE',
				null,
				{
					Authorization: 'Bearer ' + auth.token,
				}
			);
			onDelete(id);
		} catch (err) {}
	};

	return (
		<>
			<ErrorModal error={error} onClear={clearError} />
			<Modal
				show={showMap}
				onCancel={closeMapHandler}
				header={address}
				contentClass='place-item__modal-content'
				footerClass='place-item__modal-actions'
				footer={<Button onClick={closeMapHandler}>CLOSE</Button>}>
				<div className='map-container'>
					<Map
						className='map '
						center={coordinates}
						zoom={[16]}
						style={{ width: '100%', height: '100%' }}
					/>
				</div>
			</Modal>

			<Modal
				show={showConfirmModal}
				onCancel={cancelDeleteHandler}
				header='Are you sure?'
				footerClass='place-item__modal-actions'
				footer={
					<>
						<Button inverse onClick={cancelDeleteHandler}>
							CANCEL
						</Button>
						<Button danger onClick={confirmDeleteHandler}>
							DELETE
						</Button>
					</>
				}>
				<p>
					Do you want to proceed and delete this place? Please note that it
					can't be undone thereafter.
				</p>
			</Modal>
			<li className='place-item'>
				<Card className='place-item__content'>
					{isLoading && <LoadingSpinner asOverlay />}
					<div className='place-item__image'>
						<img
							src={`${process.env.REACT_APP_ASSET_URL}/${image}`}
							alt={title}
						/>
					</div>
					<div className='place-item__info'>
						<h2>{title}</h2>
						<h3>{address}</h3>
						<p>{description}</p>
						<div className='place-item__actions'>
							<Button inverse onClick={openMapHandler}>
								VIEW ON MAP
							</Button>
							{auth.userId === creatorId && (
								<>
									<Button to={`/places/${id}`}>EDIT</Button>
									<Button danger onClick={showDeleteWarningHandler}>
										DELETE
									</Button>
								</>
							)}
						</div>
					</div>
				</Card>
			</li>
		</>
	);
};
export default PlaceItem;
