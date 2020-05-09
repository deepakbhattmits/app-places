/** @format */

import React from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';

const SideDrawer = ({ show, onClick, children }) => {
	const content = (
		<CSSTransition
			in={show}
			timeout={200}
			classNames='slide-in-left'
			mountOnEnter
			unmountOnExit>
			<aside className='side-drawer' onClick={onClick}>
				{children}
			</aside>
		</CSSTransition>
	);
	return createPortal(content, document.querySelector('#drawer-hook'));
};
export default SideDrawer;
