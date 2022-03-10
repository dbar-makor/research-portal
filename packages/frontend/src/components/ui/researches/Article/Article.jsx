import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import * as researchAction from '../../../../redux/researches/researchesSlice';
import ArticleView from './Article.view';

const Article = () => {
	const params = useParams();
	const dispatch = useDispatch();
	const researches = useSelector((state) => state.researches.articles);
	// const [article, setArticle] = useState({});

	useEffect(() => {
		dispatch(researchAction.getResearchesDataAsync());
	}, []);

	useEffect(() => {
		// const chosenArticle = researches.find((research) => research.id === params.id);
		// setArticle(chosenArticle);
	}, [researches]);

	return <ArticleView params={params} researches={researches} />;
};

Article.displayName = 'Article';
Article.defaultProps = {};

export default React.memo(Article);
