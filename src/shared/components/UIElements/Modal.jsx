/** @format */

import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { createPortal } from 'react-dom';
import Backdrop from './Backdrop';
const ModalOverlay = ({
	className,
	headerClass,
	style,
	header,
	onSubmit,
	contentClass,
	children,
	footerClass,
	footer,
}) => {
	const content = (
		<div className={`modal ${className}`} style={style}>
			<header className={`modal__header ${headerClass}`}>
				<h2>{header}</h2>
			</header>
			<form onSubmit={onSubmit ? onSubmit : (event) => event.preventDefault()}>
				<div className={`modal__content ${contentClass}`}>{children}</div>
			</form>
			<footer className={`modal__footer ${footerClass}`}>{footer}</footer>
		</div>
	);
	return createPortal(content, document.querySelector('#modal-hook'));
};
const Modal = (props) => {
	return (
		<>
			{props.show && <Backdrop onClick={props.onCancel} />}
			<CSSTransition
				in={props.show}
				timeout={200}
				mountOnEnter
				unmountOnExit
				classNames='modal'>
				<ModalOverlay {...props} />
			</CSSTransition>
		</>
	);
};
export default Modal;
