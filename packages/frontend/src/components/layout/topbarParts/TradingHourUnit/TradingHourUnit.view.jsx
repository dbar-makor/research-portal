import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
//import useStyles from './TradingHourUnit.style';

const TradingHourUnitView = (props) => {

  return (
    <>
    <Grid item container alignContent='center' xs={2}>
        <Grid container style={{ width: '180px' }}>
            <FiberManualRecordIcon
                className={`${props.classes.cityDetails} ${props.classes.dot}`}
                style={{ fill: props.item.status === 'Closed' ? '#ec4141' : '#20cd82' }}
            />
            <Typography className={`${props.classes.city} ${props.classes.cityDetails}`}>
                {props.item.country}
            </Typography>
            <Typography className={`${props.classes.time} ${props.classes.cityDetails}`}>
                {props.item.time}
            </Typography>
        </Grid>
    </Grid>
</>
  );
};

TradingHourUnitView.displayName = 'TradingHourUnitView';
TradingHourUnitView.defaultProps = {};

export default React.memo(TradingHourUnitView);
