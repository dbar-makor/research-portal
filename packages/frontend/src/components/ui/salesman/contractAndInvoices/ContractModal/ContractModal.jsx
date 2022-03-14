import React from 'react';
import ContractModalView from './ContractModal.view';

const ContractModal = (props) => {
	const { onClose, isOpen, client } = props;
	return (
		<ContractModalView isOpen={isOpen} onClose={onClose} client={client}>
		</ContractModalView>
	);
};
ContractModal.displayName = 'ContractModal';
ContractModal.defaultProps = {};

export default React.memo(ContractModal);
