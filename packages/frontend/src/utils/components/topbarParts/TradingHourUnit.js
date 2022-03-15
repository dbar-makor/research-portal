import { Grid, Typography } from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';


export const TradingHourUnit = ({item,classes}) => {
  return (
    <>
    <Grid item container alignContent='center' xs={2}>
        <Grid container style={{ width: '180px' }}>
            <FiberManualRecordIcon
                className={`${classes.cityDetails} ${classes.dot}`}
                style={{ fill: item.status === 'Closed' ? '#ec4141' : '#20cd82' }}
            />
            <Typography className={`${classes.city} ${classes.cityDetails}`}>
                {item.country}
            </Typography>
            <Typography className={`${classes.time} ${classes.cityDetails}`}>
                {item.time}
            </Typography>
        </Grid>
    </Grid>
</>
  );
};
