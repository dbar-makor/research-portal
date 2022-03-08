import React, { useState, useEffect, useRef } from 'react';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import { BASE_URL, END_POINT } from '../../../utils/constants';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
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
  date: {
    fontSize: [13, '!important'],
    fontWeight: 100,
    color: '#868DA2',
    // position: 'absolute',
    // bottom: 30,
  },
  upperHalf: {
    // display: 'flex',
    // borderRadius: 8,
    // objectFit: 'cover',
    // objectPosition: 'center top',
    // width: '100%',
    // height: '150px',
    // backgroundRepeat: 'no-repeat',
    display: 'flex',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    justifyContent: 'flex-end',
    height: 150,
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
}));
const MainPublication = ({ publication }) => {
  const classes = useStyles();

  function chooseImage(publication) {
    let image = '';
    let url = '';
    if (publication.attachments.length) {
      image = publication.attachments.find((attachment) => attachment.file_type === 'main_bg');
      let imageName = image && image.file_name_system;
      url = `${BASE_URL}${END_POINT.ASSETS}/${encodeURIComponent(imageName)}`;
    }
    return url;
  }
  function truncateDescription(string) {
    let descrptionLength = string.length;
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
            <Grid item xs={12} className={classes.upperHalf} style={{ backgroundImage: chooseImage(publication) ? `url(${chooseImage(publication)})` : 'none', backgroundColor: '#74b2f0' }}>
            </Grid>
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

{
  /* <Grid item xs={3} key={publication.id}>
      <Grid container direction="column" className={classes.wrapper}>
        <Link to={`article/${publication.id}`}>
          <Grid item xs={12}>
            {chooseImage(publication) ? <img src={chooseImage(publication)} className={classes.upperHalf}></img> : <div className={classes.noImage}></div>}
          </Grid>
        </Link>
        <Grid item xs={12}>
          <Grid container direction="column" className={classes.lowerHalf}>
            <Grid item>
              <Grid container direction="column">
                <Grid item>
                  <Typography variant="h5" className={classes.title}>
                    {publication.title}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2">{truncateDescription(publication.description)}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Typography variant="body2" className={classes.author}>
                    {publication.name}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2" className={classes.date}>
                    {format(new Date(publication.published_at), 'dd MMM, yyyy')}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid> */
}
