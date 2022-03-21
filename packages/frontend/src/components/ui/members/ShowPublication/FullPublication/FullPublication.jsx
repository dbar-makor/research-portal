import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { BASE_URL, END_POINT } from '../../../../../utils/constants';
import * as actionSnackBar from '../../../../../redux/SnackBar/action';

import FullPublicationView from './FullPublication.view';

const FullPublication = () => {
	const dispatch = useDispatch();
	const { pubId } = useParams();
	const [chosenPublication, setChosenPublication] = useState();
	const [loadingPub, setLoadingPub] = useState(null);
	const location = useLocation();
	const history = useHistory();
	const userType = useSelector((state) => state.auth.userContent?.type);

	useEffect(() => {
		if (userType === 'author') {
			setChosenPublication(location.state?.publication);
		}
	}, []);

	//in case user is member- pub is taken from the params
	const getPublication = async (id) => {
		setLoadingPub(true);
		if (id !== undefined) {
			const resp = await axios.get(`${BASE_URL}${END_POINT.PUBLICATION}/${id}`);
			try {
				if (resp.status === 200) {
					setLoadingPub(false);
					setChosenPublication(resp.data);
				}
			} catch (error) {
				dispatch(actionSnackBar.setSnackBar('error', 'Faild to load publications', 2000));
			}
		}
	};

	const transformVideoLink = (link) => {
		if (link !== null) {
			const embadLink = link.replace('watch?v=', 'embed/');
			return embadLink;
		} else {
			return null;
		}
	};

	useEffect(() => {
		if (userType === 'client' || userType === 'prospect') {
			getPublication(pubId);
		}
	}, []);

	const backToEditing = () => {
		history.push({
			pathname: chosenPublication.type === 'live' ? '/new-article' : '/upload-article',
			state: { publication: location.state?.publication, from: 'prearticle' },
		});
	};
	return (
		<FullPublicationView
			loadingPub={loadingPub}
			transformVideoLink={transformVideoLink}
			backToEditing={backToEditing}
			chosenPublication={chosenPublication}
			userType={userType}
		></FullPublicationView>
	);
};

FullPublication.displayName = 'FullPublication';
FullPublication.defaultProps = {};

export default React.memo(FullPublication);
