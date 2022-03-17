import React from 'react';
import { Grid } from '@material-ui/core';
import { useStyles } from '../../../../styles/MainStyles';
import SubHeader from '../../reusables/SubHeader/SubHeader';
import Filters from '../../reusables/Filters/Filters';
import MainSalesScreen from '../MainSalesScreen/MainSalesScreen';


const SalesView = (props) => {
  const classes = useStyles();

  return (<Grid container justifyContent="center" className={classes.mainContainer}>
  <Grid item xs={10}>
    <Grid container>
      <Grid item xs={12} className={classes.marginBottom20}>
        <SubHeader title="Companies" />
      </Grid>
      <Grid item xs={12} className={classes.marginBottom20}>
        <Grid container>
          <Grid item xs={6}>
            <Filters
              pageType="companies"
              search={props.search}
              type={props.type}
              status={props.status}
              setProperty={props.setProperty}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </Grid>

  <MainSalesScreen />
</Grid>
);
};

SalesView.displayName = 'SalesView';
SalesView.defaultProps = {};

export default React.memo(SalesView);
