import React, { useState, useEffect, useRef } from 'react';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import { BASE_URL, END_POINT } from '../../../utils/constants';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	upperHalf: {
		isplay: 'flex',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		justifyContent: 'flex-end',
		height: 320,
		borderRadius: '8px',
		position: 'relative',
	},
	lowerHalf: {
		// display: 'flex',
		// position: 'relative',
		backgroundColor: '#fff',
		flexDirection: 'column',
		height: 170,
		padding: '12px 10px 12px 5px ',
		justifyContent: 'space-between',
	},
	date: {
		fontSize: '16px',
		color: '#868DA2',
	},
	author: {
		fontSize: '14px',
		color: '#868DA2',
	},
	title: {
		fontWeight: 'bold',
		fontSize: '20px',
		color: '#0f0f0f',
	},
}));
const MediumPublication = ({ publication }) => {
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
		const descrptionArr = string.split(' ');
		const descriptionLength = descrptionArr.length;
		descrptionArr.splice(14);
		const newDescription = descrptionArr.join(' ');
		if (descriptionLength > 15) return `${newDescription}...`;
		return newDescription;
	}
	return (
		<Grid item xs={6} style={{ padding: '18px' }}>
			<Grid container>
				<Grid item xs={12}>
					<Link to={`article/${publication.id}`}>
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
				<Grid item xs={12} className={classes.lowerHalf} style={{ height: '100%' }}>
					<Grid container>
						<Grid item xs={12} align="right">
							<Typography className={classes.date}>
								{format(new Date(publication.published_at), 'dd MMM, yyyy')}
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<Grid container>
								<Grid item xs={12}>
									<Typography className={classes.title}>{publication.title}</Typography>
								</Grid>
								<Grid item xs={12}>
									<Grid item>
										<Typography>
											{truncateDescription(publication.description)}
										</Typography>
									</Grid>
								</Grid>
								<Grid item xs={12}>
									<Typography className={classes.author}>{publication.name}</Typography>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};
export default MediumPublication;

//  <Grid item xs={6} key={publication.id}>
//       <Grid container direction="column" className={classes.wrapper}>
//         <Link  to={`article/${publication.id}`}>
//           <Grid item xs={12}>
//             {chooseImage(publication) ? <img src={chooseImage(publication)} className={classes.upperHalf}></img> : <div className={classes.noImage}></div>}
//           </Grid>
//         </Link>
//         <Grid item xs={12}>
//           <Grid container direction="column" className={classes.lowerHalf}>
//             <Grid item>
//               <Grid container direction="column">
//                 <Grid item>
//                   <Typography variant="h5" className={classes.title}>
//                     {publication.title}
//                   </Typography>
//                 </Grid>
//                 <Grid item>
//                   <Typography variant="body2">{truncateDescription(publication.description)}</Typography>
//                 </Grid>
//               </Grid>
//             </Grid>
//             <Grid container justifyContent="space-between">
//               <Grid item>
//                 <Typography variant="body2" className={classes.author}>
//                   {publication.name}
//                 </Typography>
//               </Grid>
//               <Grid item>
//                 <Typography variant="body2" className={classes.date}>
//                   {format(new Date(publication.published_at), 'dd MMM, yyyy')}
//                 </Typography>
//               </Grid>
//             </Grid>
//           </Grid>
//         </Grid>
//       </Grid>
//     </Grid>
