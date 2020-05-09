/** @format */

import React, { useRef, useState, useEffect } from 'react';

import Button from './Button';

const ImageUpload = ({ id, center, onInput, errorText }) => {
	const [file, setFile] = useState();
	const [previewUrl, setPreviewUrl] = useState();
	const [isValid, setIsValid] = useState(false);
	const filePickerRef = useRef();

	const pickedHandler = (event) => {
		let pickedFile;
		let fileIsValid = isValid;
		if (event.target.files && event.target.files.length === 1) {
			pickedFile = event.target.files[0];
			setFile(pickedFile);
			setIsValid(true);
			fileIsValid = true;
		} else {
			setIsValid(false);
			fileIsValid = false;
		}
		onInput(id, pickedFile, fileIsValid);
	};

	const pickImageHandler = () => {
		filePickerRef.current.click();
	};
	useEffect(() => {
		if (!file) {
			return;
		}
		const fileReader = new FileReader();
		fileReader.onload = () => {
			setPreviewUrl(fileReader.result);
		};
		fileReader.readAsDataURL(file);
	}, [file]);

	return (
		<div className='form-control'>
			<input
				id={id}
				ref={filePickerRef}
				style={{ display: 'none' }}
				type='file'
				accept='.jpg,.png,.jpeg'
				onChange={pickedHandler}
			/>
			<div className={`image-upload ${center && 'center'}`}>
				<div className='image-upload__preview'>
					{previewUrl && <img src={previewUrl} alt='Preview' />}
					{!previewUrl && <p>Please Pick a image</p>}
				</div>
				<Button type='button' onClick={pickImageHandler}>
					PICK IMAGE
				</Button>
			</div>
			{!isValid && <p>{errorText}</p>}
		</div>
	);
};

export default ImageUpload;
