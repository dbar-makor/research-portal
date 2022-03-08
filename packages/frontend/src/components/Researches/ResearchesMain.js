//MUI
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, makeStyles, Typography } from '@material-ui/core'
import * as researchAction from '../../redux/researches/researchesSlice'
import { Link } from 'react-router-dom'
//icons
// import { ReactComponent as MakorLogo } from "../../../assets/icons/makorLogo.svg";

function AllPublications() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const researches = useSelector((state) => state.researches.articles)

  useEffect(() => {
    dispatch(researchAction.getResearchesDataAsync())
  }, [])

  useEffect(() => {
    console.log('researches!!!', researches)
  }, [researches])

  return researches.length ? (
    <Grid container justifyContent='center' className={classes.mainArticle}>
      <Grid item xs={8}>
        <Grid container>
          <Grid item xs={12}>
            <Typography className={classes.bigTitle}>
              {researches[0].title}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container justifyContent='space-between'>
              <Grid item xs={6}> 
                <Grid container>
                  <Grid item xs={12}>
                    <img alt='Article' src={`${researches[0].image}`} className={classes.bigImage}/>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography className={classes.bigDescription}>
                      {researches[0].description}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography className={classes.bigSubDescription}>
                      {researches[0].sub_description}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography className={classes.bigAuthorName}>{researches[0].author_name}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container justifyContent='flex-end'>
                      <Link to={{ pathname: `/article/${researches[0].id}` }} className={classes.bigLink}>Read more...</Link>
                    </Grid>                    
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={5}>
                <Grid container justifyContent='space-between'>
                  {researches.slice(1).map((item, index) => (
                    <Grid item xs={12} key={index}>
                      <Link to={{ pathname: `/article/${item.id}` }} className={classes.smallLink}>
                      <Grid container justifyContent='space-between' alignItems='center' className={classes.smallArticle}>
                        <Grid item xs={3}>
                          <img alt='Article' src={`${item.thumbnail}`}/>
                        </Grid>
                        <Grid item xs={7}>
                          <Grid container justifyContent='flex-start'>
                            <Grid item xs={12}>
                              <Typography className={classes.smallTitle}>
                                {item.title}
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Typography className={classes.smallAuthorName}>
                                {item.author_name}
                              </Typography>
                            </Grid>
                            <Grid item xs={12}></Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      </Link>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  ) : null
}

export default AllPublications

const useStyles = makeStyles((theme) => ({
  bigTitle: {
    color: '#000000',
    fontSize: '32px',
    fontWeight: 600,
    marginBottom: '15px'
  },
  bigImage: {
    marginBottom: '20px'
  },
  bigDescription: {
    color: '#000000',
    fontSize: '20px',
    fontWeight: 600,
    marginBottom: '15px'
  },
  bigSubDescription: {
    color: '#000000',
    fontSize: '16px',
    marginBottom: '15px'
  },
  bigAuthorName: {
    color: '#999999',
    fontSize: '14px',
  },
  mainArticle: {
    marginTop: '11vh'
  },
  smallTitle: {
    color: '#000000',
    fontSize: '16px',
    fontWeight: 600,
    marginBottom: '10px'
  },
  smallArticle: {
    marginBottom: '10px',
    cursor: 'pointer'
  },
  smallAuthorName: {
    color: '#999999',
    fontSize: '14px'
  },
  bigLink: {
    color: '#000000',
    marginRight: '50px', 
    marginTop: '25px'
  },
  smallLink: {
    textDecoration: 'none'
  }
}))