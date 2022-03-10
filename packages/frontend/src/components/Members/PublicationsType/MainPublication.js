import { Grid, Typography, makeStyles } from '@material-ui/core';
import { BASE_URL, END_POINT } from '../../../utils/constants';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
	author: {
		fontSize: [13, '!important'],
		fontWeight: 100,
		color: '#868DA2',
	},
	wrapper: {
		width: 240,
	},
	title: {
		fontSize: [20, '!important'],
		fontWeight: 'bold',
		color: '#0F0F0F',
	},
	date: {
		fontSize: [13, '!important'],
		fontWeight: 100,
		color: '#868DA2',
	},
	upperHalf: {
		display: 'flex',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		justifyContent: 'flex-end',
		height: 150,
		borderRadius: '8px',
		position: 'relative',
	},
	lowerHalf: {
		backgroundColor: '#fff',
		flexDirection: 'column',
		height: 170,
		padding: '12px 0px 12px 5px ',
		justifyContent: 'space-between',
	},
});
const MainPublication = ({ publication }) => {
	const classes = useStyles();

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

	return (
		<Grid item xs={3} style={{ padding: '16px' }}>
			<Grid container>
				<Grid item xs={12}>
					<Link to={`article/${publication.id}`}>
						<Grid
							item
							xs={12}
							className={classes.upperHalf}
							style={{
								backgroundImage: chooseImage(publication) ? `url(${chooseImage(publication)})` : 'none',
								backgroundColor: '#74b2f0',
							}}
						></Grid>
					</Link>
				</Grid>
				<Grid item xs={12}>
					<Grid container direction="column">
						<Grid item style={{ paddingBlock: '16px 10px' }}>
							<Typography variant="h5" className={classes.title}>
								{publication.title}
							</Typography>
						</Grid>
						<Grid item>
							<Typography variant="body2">{truncateDescription(publication.description)}</Typography>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default MainPublication;