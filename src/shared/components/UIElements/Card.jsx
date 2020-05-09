/** @format */

import React from 'react';

const Card = ({ className, style, children }) => (
	<div className={`card ${className}`} style={style}>
		{children}
	</div>
);

export default Card;
