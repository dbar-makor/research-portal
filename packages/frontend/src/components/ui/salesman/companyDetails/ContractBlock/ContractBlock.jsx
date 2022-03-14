import React from 'react';

import ContractBlockView from './ContractBlock.view';

const ContractBlock = (props) => {
	const contract = props.contract;
	const contractStatus = props.contractStatus;
	const title = props.title;
	const periodToNum = {
		monthly: 12,
		quarterly: 4,
		half: 2,
		fully: 1,
	};
	return (
		<ContractBlockView
			periodToNum={periodToNum}
			contract={contract}
			title={title}
			contractStatus={contractStatus}
		></ContractBlockView>
	);
};

ContractBlock.displayName = 'ContractBlock';
ContractBlock.defaultProps = {};

export default React.memo(ContractBlock);
