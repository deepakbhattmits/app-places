/** @format */

import React from 'react';
import { createPortal } from 'react-dom';

const Backdrop = ({ onClick }) => {
	return createPortal(
		<div className='backdrop' onClick={onClick}></div>,
		document.querySelector('#backdrop-hook')
	);
};

export default Backdrop;
