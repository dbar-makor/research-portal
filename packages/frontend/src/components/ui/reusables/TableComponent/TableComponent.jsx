import React, { useEffect, useRef, forwardRef } from 'react';
import { useDispatch } from 'react-redux';
import * as chosenCompanyActions from '../../../../redux/companies/chosenCompanySlice';
import TableComponentView from './TableComponent.view';
import { getUserByIdAsync } from '../../../../redux/users/chosenUserSlice';

const TableComponent = forwardRef((props, ref1) => {
	const { data, pageType } = props;
	const dispatch = useDispatch();
	const almostLastRowRef = useRef(null);
	const fullRef = useRef({ ref1, almostLastRowRef });

	const chooseRow = (id) => {
		if (pageType === 'companies') {
			dispatch(chosenCompanyActions.getChosenCompanyAsync(id));
		} else if (pageType === 'authorsUsers' || pageType === 'salesUsers') {
			dispatch(getUserByIdAsync(id));
		}
	};

	useEffect(() => {
		if (data.length < 16) return;
		almostLastRowRef.current.scrollIntoView({ behavior: 'smooth' });
	}, [data]);

	return <TableComponentView ref={fullRef} data={data} chooseRow={chooseRow} />;
});

TableComponent.displayName = 'TableComponent';
TableComponent.defaultProps = {};

export default React.memo(TableComponent);
