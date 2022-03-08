import { useState, useEffect, useRef, useCallback } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { useStyles } from '../../styles/MainStyles'
import SubHeader from '../Reusables/SubHeader'
import TableComponent from '../Reusables/TableComponent'
import {
  getCompaniesDataAsync,
  selectCompaniesData,
  selectSearch,
  selectType,
  selectStatus,
  selectCompaniesLoading,
  selectCompaniesMetaData,
  setProperty,
  selectOffset,
  selectHasMore,
  selectLimit
} from '../../redux/companies/companiesSlice'
import { useDispatch, useSelector } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress'
import Filters from '../Reusables/Filters'
import CompanyInfo from './CompanyDetails/CompanyInfo'
import MembersTable from './MembersDetails/MembersTable'
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import { selectChosenCompany  } from '../../redux/companies/chosenCompanySlice'

function MainSalesScreen() {

  const classes = useStyles()
  const dispatch = useDispatch()
  const companiesData = useSelector(selectCompaniesData)
  const search = useSelector(selectSearch)
  const type = useSelector(selectType)
  const status = useSelector(selectStatus)
  const loading = useSelector(selectCompaniesLoading)
  const metaData = useSelector(selectCompaniesMetaData)
  const offset = useSelector(selectOffset)
  const limit = useSelector(selectLimit)
  const containerRef = useRef();
  const chosenCompany = useSelector(selectChosenCompany)
  const hasMore = useSelector(selectHasMore)

  //Infinite scroll with intersection observer
  
  // // let domContainer;
  // useEffect(() => {
  //   const domContainer = containerRef.current;
  //   console.log("domContainer",domContainer)
    
  // }, [])

  const observer = useRef(null);

  const lastItemRef = useCallback(node => {
    console.log("lastItemRef cb runs. node:", node);

    if(loading){
      return;
    };
    if(observer.current){
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver(entries => {
    
      if(entries[0].isIntersecting && hasMore){

        let newOffset = offset + limit;
        // console.log("containerRef.current?.scrollHeight",containerRef.current?.scrollHeight)
        dispatch(setProperty({key: 'offset', value: newOffset}))
      }
    });
    if(node){
      observer.current.observe(node);
    }

  }, [loading, hasMore]) 

  // useEffect(() => {

  //   if(companiesData?.length < 16) return;
  //   // console.log( "scrollTop",containerRef.current?.scrollTop)
  //   // const totalHeight =  containerRef.current?.scrollHeight;
  //   // const scrollDistance =  containerRef.current ? ((companiesData.length / 10) - 1)*546 : totalHeight
  //   // const wishedDistance = totalHeight - scrollDistance;
    

  //   containerRef.current?.scrollTo({top: 500,left:0,behavior: "smooth"})
   

  // }, [companiesData])


  //Calling get companies whenever a call parameter changes offset changes by scrolling)
  useEffect(() => {
    dispatch(getCompaniesDataAsync(offset, limit, search, type, status))
    
  }, [offset, limit, search, type, status])

  //If search term, company type or status changes, offset is reset to 0 
  //to ask for first "page" of results for the new query

  useEffect(() => {
    dispatch(setProperty({key: 'offset', value: 0}))
    
  }, [search, type, status])

  useEffect(() => {
    
    console.log('chosenCompany', chosenCompany)
  }, [chosenCompany])


  

  return (
    <Grid container justifyContent='center'>
      <Grid item xs={10}>
        <Grid container>
          
          {!loading ? (
              <Grid item xs={12}>
                {companiesData.length
                ? <Grid container  
                >
                  {/* <Grid container ref={scrollRef} style={{border: "1px solid red"}}> */}
                  <Grid
                    item
                    xs={6}
                    className={classes.scrollableTableContainer}
                    // ref={containerRef}
                    // onWheel={(e) => setWheel(e.nativeEvent.wheelDelta)}
                    // onScroll={handleScroll}

                  >
                    {/* <Grid container style={{height: "100%"}}> */}
                      <TableComponent data={companiesData} pageType='companies' ref={lastItemRef}/>
                    {/* </Grid> */}
                    {/* <TableComponent data={companiesData} pageType='companies' scrollIndex={scrollIndex}/> */}

                  </Grid>
                  {chosenCompany && 
                  <Grid item xs={6}>
                    <Grid container style={{ padding: '0px 16px 0px 16px' }}>
                      <Grid item xs={12}>
                        <CompanyInfo />
                      </Grid>
                      <Grid item xs={12}>
                        <MembersTable />
                      </Grid>
                    </Grid>
                  </Grid>}
                </Grid>
                : <Grid container>
                  <Grid item xs={6}>
                    <Typography className={classes.noMatches}>No matches found</Typography>
                  </Grid>                    
                  </Grid>}
                
              </Grid>
          ) : (
            <Grid item xs={12}>
              <Grid
                container
                justifyContent='center'
                alignItems='center'
                className={classes.progressBarContainer}
              >
                <CircularProgress className={classes.progressBar} />
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default MainSalesScreen
