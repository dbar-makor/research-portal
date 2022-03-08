import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import tradingHoursData from './dummy.json'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import { useStyles } from '../../styles/MainStyles'

const TradingHours = () => {
  const classes = useStyles()
  let data = tradingHoursData.data
  let formattedData = Object.entries(data).map(([key, value]) => {
    return { country: key, status: value.status, time: value.local_time.substring(11, 16) }
  })
  console.log('formattedData', formattedData)
  return (
    <Grid container direction='row' className={classes.cityWrapper}>
      {formattedData.map((item) => {
        return (
          <>
            <Grid item xs={2}>
              <Grid container style={{width:"180px"}}>
                <FiberManualRecordIcon  className={`${classes.cityDetails} ${classes.dot}`} style={{ fill: item.status === 'Closed' ? '#ec4141' : '#20cd82' }} />
                <Typography className={`${classes.city} ${classes.cityDetails}`}>{item.country}</Typography>
                <Typography className={`${classes.time} ${classes.cityDetails}`}>{item.time}</Typography>
              </Grid>
            </Grid>
          </>
        )
      })}
    </Grid>
  )
}

export default TradingHours
