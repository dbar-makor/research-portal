import { useEffect, useState } from 'react';
import axios from 'axios';
import { CircularProgress, Grid, IconButton } from '@material-ui/core';
import AuthorInfo from './AuthorInfo';
import { BASE_URL, END_POINT } from '../../../utils/constants';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import Title from './Title';
import Content from './Content';
import Events from './Events';
import Attachments from './Attachments';
import Comments from './Comments';
import MorePublications from './MorePublications';
import VideoFrame from './VideoFrame';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import * as actionSnackBar from '../../../redux/SnackBar/action';
import { useDispatch, useSelector } from 'react-redux';
import PdfViewer from './PdfViewer';
import { FilledButton } from '../../../styles/MainStyles';

function FullPublication() {
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
				} else {
					console.log(resp.status, 'RESP STATUS');
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
		<>
			<Grid
				container
				direction="row"
				justifyContent="center"
				style={{ paddingTop: 30, position: 'relative' }}
			>
				{loadingPub && (
					<Grid item xs={12} align="center" style={{ height: 'calc(100vh - 539px)' }}>
						<CircularProgress size={40} thickness={4} value={100} style={{ marginTop: '8%' }} />
					</Grid>
				)}
				{chosenPublication && !loadingPub && (
					<>
						{location.state && location.state.from === 'new-publication' && (
							<Grid item xs={11} style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
								<FilledButton onClick={backToEditing}> Back to Editing </FilledButton>
							</Grid>
						)}
						<Grid item xs={5}>
							<Grid container>
								<Title title={chosenPublication.title} description={chosenPublication.description} />

								<AuthorInfo
									auther={chosenPublication.author}
									lastDate={
										chosenPublication.updated_at ? chosenPublication.updated_at : chosenPublication.created_at
									}
								/>
								{chosenPublication.type === 'live' ? (
									<>
										<Content contentBlocks={chosenPublication.content} />
										<Events events={chosenPublication.events} />
										<Attachments attachments={chosenPublication.attachments} />
									</>
								) : chosenPublication.file_pdf ? (
									<PdfViewer
										pdf={{
											title_pdf: chosenPublication.title_pdf,
											file_pdf: chosenPublication.file_pdf,
										}}
									/>
								) : (
									<VideoFrame
										video={{
											title_video: chosenPublication.title_vide,
											link_video: transformVideoLink(chosenPublication.link_video),
										}}
									/>
								)}
								{(chosenPublication.commments !== null || chosenPublication.commments !== undefined) &&
								userType !== 'author' ? (
<<<<<<< HEAD
									<Comments comments={chosenPublication.comments} pubId={chosenPublication.id} />
								) : null}
								{(chosenPublication.categories !== null || chosenPublication.categories !== undefined) &&
=======
									<Comments
										comments={chosenPublication.comments}
										pubId={chosenPublication.id}
									/>
								) : null}
								{(chosenPublication.categories !== null ||
									chosenPublication.categories !== undefined) &&
>>>>>>> 5b020432a068e31cceeef2679c924d1dbd8c26eb
								userType !== 'author' ? (
									<MorePublications
										categories={chosenPublication.categories}
										title={chosenPublication.title}
									/>
								) : null}
							</Grid>
						</Grid>
					</>
				)}
				{!loadingPub && (
					<IconButton
						style={{
							backgroundColor: '#868DA2',
							height: 73,
							width: 73,
							position: 'absolute',
							bottom: '160px',
							right: '430px',
						}}
						onClick={() => window.scroll(0, 0)}
					>
						<ExpandLessIcon fontSize="large" style={{ color: '#ffffff' }} />
					</IconButton>
				)}
			</Grid>
		</>
	);
}

export default FullPublication;
