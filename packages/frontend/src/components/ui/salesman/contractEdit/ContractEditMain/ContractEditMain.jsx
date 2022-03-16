import React,{ forwardRef,useImperativeHandle, useState } from 'react';
import ContractEditMainView from './ContractEditMain.view';

const ContractEditMain = forwardRef((props, ref) => {
	const { contract, clientName } = props;
	const [openEdit, setOpenEdit] = useState(false);
	const [activeSidebar, setActiveSidebar] = useState(false);
	const [loadingSidebar, setLoadingSidebar] = useState(false);

	useImperativeHandle(ref, () => ({
		openModal() {
			setOpenEdit(!openEdit);
		},
	}));

	const openModal = () => {
		setOpenEdit(!openEdit);
	};
	return (
		<ContractEditMainView
			openEdit={openEdit}
			openModal={openModal}
			contract={contract}
			clientName={clientName}
			setLoadingSidebar={setLoadingSidebar}
			setActiveSidebar={setActiveSidebar}
			loadingSidebar={loadingSidebar}
			activeSidebar={activeSidebar}
		></ContractEditMainView>
	);
});

ContractEditMain.displayName = 'ContractEditMain';
ContractEditMain.defaultProps = {};

export default React.memo(ContractEditMain);
