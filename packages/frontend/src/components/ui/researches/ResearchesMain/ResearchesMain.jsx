import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as researchAction from '../../../../redux/researches/researchesSlice';

import ResearchesMainView from './ResearchesMain.view';

const ResearchesMain = (props) => {
	const dispatch = useDispatch();
	const researches = useSelector((state) => state.researches.articles);

	useEffect(() => {
		dispatch(researchAction.getResearchesDataAsync());
	}, []);

	useEffect(() => {
		console.log('researches!!!', researches);
	}, [researches]);

	return <ResearchesMainView researches={researches} />;
};

ResearchesMain.displayName = 'ResearchesMain';
ResearchesMain.defaultProps = {};

export default React.memo(ResearchesMain);
