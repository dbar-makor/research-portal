import { Grid, makeStyles, Typography } from '@material-ui/core';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL, END_POINT } from '../../../utils/constants';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
	author: {
		fontSize: [13, '!important'],
		fontWeight: 100,
		color: '#868DA2',
		// position: 'absolute',
		// bottom: 30,
	},
	wrapper: {
		width: 240,
	},
	title: {
		fontSize: [20, '!important'],
		fontWeight: 'bold',
		color: '#0F0F0F',
	},
	upperHalf: {
		display: 'flex',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		justifyContent: 'flex-end',
		height: 160,
		borderRadius: '8px',
		position: 'relative',
	},
	lowerHalf: {
		// display: 'flex',
		// position: 'relative',
		backgroundColor: '#fff',
		flexDirection: 'column',
		height: 170,
		padding: '12px 0px 12px 5px ',
		justifyContent: 'space-between',
	},
});

function MorePublications(props) {
	const { categories, title } = props;
	const localCatNames = categories.map((cat) => cat.name);
	const [morePub, setMorePub] = useState(null);
	const classes = useStyles();

	const getMorePublicationAsync = async () => {
		try {
			const resp = await axios.get(`${BASE_URL}${END_POINT.PUBLICATION}/user`);
			if (resp.status === 200) {
				let filterdPublication = resp.data
					.filter((pub) => {
						const categoriesNames = pub.categories.map((category) => category.name);
						return categoriesNames.includes(localCatNames[0]);
					})
					.slice(0, 3);
				filterdPublication = filterdPublication.filter((pub) => pub.title !== title);
				if (filterdPublication.length > 0) {
					setMorePub(filterdPublication);
				} else {
					setMorePub(resp.data.slice(0, 3));
				}
			}
		} catch (err) {
			/* eslint no-console: "off" */
			console.log(err);
		}
	};
	function chooseImage(publication) {
		let image = '';
		let url = '';
		if (publication.attachments.length) {
			image = publication.attachments.find((attachment) => attachment.file_type === 'main_bg');
			const imageName = image && image.file_name_system;
			url = `${BASE_URL}${END_POINT.ASSETS}/${encodeURIComponent(imageName)}`;
		}
		return url;
	}

	function truncateDescription(string) {
		const descrptionLength = string.length;
		if (descrptionLength > 105) {
			return `${string.substring(0, 105)}...`;
		} else {
			return `${string}...`;
		}
	}

	useEffect(() => {
		getMorePublicationAsync();
	}, []);

	return (
		<Grid item xs={12} style={{ paddingBlock: '16px 10px' }}>
			<Grid container spacing={2}>
				{morePub &&
					morePub !== null &&
					morePub.map((publication, idx) => {
						return (
							<Grid key={idx} item xs={4} style={{ paddingLeft: '16px' }}>
								<Grid container direction="column">
									<Grid item>
										<Link to={`${publication.id}`}>
											<Grid
												item
												xs={12}
												className={classes.upperHalf}
												style={{
													backgroundImage: chooseImage(publication)
														? `url(${chooseImage(publication)})`
														: 'none',
													backgroundColor: '#74b2f0',
												}}
											></Grid>
										</Link>
									</Grid>
									<Grid item>
										<Grid container>
											<Grid item xs={12}>
												<Typography className={classes.title}>
													{publication.title}
												</Typography>
											</Grid>
											<Grid item style={{ paddingTop: 5 }}>
												<Typography variant="body2">
													{truncateDescription(publication.description)}
												</Typography>
											</Grid>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						);
					})}
			</Grid>
		</Grid>
	);
}

export default MorePublications;
