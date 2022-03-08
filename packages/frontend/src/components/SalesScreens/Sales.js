import React, { useEffect} from 'react'
import { Grid, Typography } from '@material-ui/core'
import Filters from '../Reusables/Filters'
import MainSalesScreen from './MainSalesScreen'
import { useStyles } from '../../styles/MainStyles'
import SubHeader from '../Reusables/SubHeader'
import { useSelector, useDispatch } from 'react-redux'
import * as utilsAction from '../../redux/utils/utilsSlice'
import { selectSearch, selectType, selectStatus, setProperty} from '../../redux/companies/companiesSlice'

function Sales() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const search = useSelector(selectSearch)
  const type = useSelector(selectType)
  const status = useSelector(selectStatus)

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(utilsAction.getUtilsAsync());
    }    
  }, []);
  return (
    <Grid container justifyContent='center' className={classes.mainContainer}>
      <Grid item xs={10}>
        <Grid container>
          <Grid item xs={12} className={classes.marginBottom20}>
            <SubHeader title='Companies' />
          </Grid>
          <Grid item xs={12} className={classes.marginBottom20}>
            <Grid container>
              <Grid item xs={6}>
                <Filters pageType='companies' search={search} type={type} status={status} setProperty={setProperty}/>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <MainSalesScreen />
    </Grid>
  )
}

export default Sales
