import React,{ useRef, useState } from 'react';

import PaymentButtonBarView from './PaymentButtonBar.view.jsx';

const PaymentButtonBar = (props) => {
  const { precentage, openInvoices, isOpen, clientName, contract } = props;
	const [anchorEl, setAnchorEl] = useState(null);

	const contractEditMainRef = useRef();

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;
	return <PaymentButtonBarView
		precentage={precentage}
		isOpen={isOpen}
		id={id}
		open={open}
		anchorEl={anchorEl}
		handleClose={handleClose}
		contractEditMainRef={contractEditMainRef}
		contract={contract}
		clientName={clientName}
		openInvoices={openInvoices}
		handleClick={handleClick}
	> </PaymentButtonBarView>;
};

PaymentButtonBar.displayName = 'PaymentButtonBar';
PaymentButtonBar.defaultProps = {};

export default React.memo(PaymentButtonBar);
