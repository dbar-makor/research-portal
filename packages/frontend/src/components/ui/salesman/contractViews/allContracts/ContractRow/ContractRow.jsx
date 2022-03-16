import React,{ useRef, useState } from 'react';

import ContractRowView from './ContractRow.view';

const ContractRow = (props) => {
  const { contract } = props;
	const [anchorEl, setAnchorEl] = useState(null);

	const contractEditMainRef = useRef();

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const calcYearlyCost = (amount, period) => {
		if (period === 'fully') {
			return amount;
		} else if (period === 'half') {
			return amount * 2;
		} else if (period === 'quarterly') {
			return amount * 3;
		} else if (period === 'monthly') {
			return amount * 12;
		}
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;
	return <ContractRowView
		contract={contract}
		calcYearlyCost={calcYearlyCost}
		handleClick={handleClick}
		id={id}
		open={open}
		anchorEl={anchorEl}
		handleClose={handleClose}
		contractEditMainRef={contractEditMainRef}
	></ContractRowView>;
};

ContractRow.displayName = 'ContractRow';
ContractRow.defaultProps = {};

export default React.memo(ContractRow);
