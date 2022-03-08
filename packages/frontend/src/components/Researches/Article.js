import React, { useState, useEffect } from 'react'
import { Grid, Typography, makeStyles } from '@material-ui/core'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import * as researchAction from '../../redux/researches/researchesSlice'

function ArticlePage() {
  const classes = useStyles()
  const params = useParams()
  const dispatch = useDispatch()
  const researches = useSelector((state) => state.researches.articles)
  const [article, setArticle] = useState({})

  useEffect(() => {
    console.log('ID', params.id)
    dispatch(researchAction.getResearchesDataAsync())
  }, [])

  useEffect(() => {
    const chosenArticle = researches.find(
      (research) => research.id === params.id
    )
    setArticle(chosenArticle)
  }, [researches])

  return article ? (
    <Grid container justifyContent='center' className={classes.articleContainer}>
      <Grid item xs={6}>
        <Grid container>
          <Grid item xs={12}>
              <Grid container justifyContent='flex-end'>
                    <Typography className={classes.date}>{article.date}</Typography>
              </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.bigTitle}>{article.title}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              {/* <Grid item xs={10}>
                <img alt='Article' src={`${article.image}`} className={classes.bigImage}/>
              </Grid> */}
              <Grid item xs={12}>
                    <Typography className={classes.bigAuthorName}>Written by {article.author_name}</Typography>
              </Grid>
              <Grid item xs={12}>
                    <Typography>{article.text}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  ) : null
}

export default ArticlePage


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
    bigAuthorName: {
      color: '#999999',
      fontSize: '14px',
      marginBottom: '30px'
    },
    articleContainer: {
      marginTop: '7vh'
    },
    date: {
      color: '#999999'
    }
  }))
  