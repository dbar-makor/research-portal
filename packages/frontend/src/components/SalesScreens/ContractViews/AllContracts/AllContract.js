import { Grid, Typography, CircularProgress } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { ReactComponent as BlueShape } from '../../../../assets/icons/blueBorder.svg'
import DateInputUnit from '../../../Reusables/DateInputUnit'
import SelectInputUnit from '../../../Reusables/SelectInputUnit'
import { useStyles, StyledTextField, AddButton } from '../../../../styles/MainStyles'
import AutoCompleteUnit from '../../../Reusables/AutoCompleteUnit'
import RangeDatePicker from '../../../Reusables/RangeDatePicker'
import ContractsTable from './ContractsTable'
import { BASE_URL, END_POINT } from '../../../../utils/constants'
import axios from 'axios'
import * as actionSnackBar from '../../../../redux/SnackBar/action'
import { useDispatch } from 'react-redux'

const periodicity = [
  { value: 'All', name: 'All' },
  { value: 'fully', name: 'Yearly' },
  { value: 'half', name: 'Half' },
  { value: 'quarterly', name: 'Quarterly' },
  { value: 'monthly', name: 'Monthly' },
]
const contractStatus = [
  { value: 'All', name: 'All' },
  { value: 'true', name: 'Signed' },
  { value: 'false', name: 'Unsigned' },
]

function AllContracts() {
  const dispatch = useDispatch()

  const [loadingContract, setLoadingContract] = useState(true)

  const classes = useStyles()
  const [contractsRows, setContractsRows] = useState(null)

  const [companiesNames, setCompaniesNames] = useState(null)
  const [inputCompanyName, setInputCompanyName] = useState('')

  const [filterdPeriod, setFilterdPeriod] = useState('')
  const [status, setStatus] = useState('')
  const [periodRange, setPeriodRange] = useState({ from: '', to: '' })

  const [filters, setFilters] = useState({
    from: null,
    to: null,
    period: '',
    signed: '',
    company_id: '',
  })

  const setFrom = (from) => {
    setPeriodRange((prevState) => ({ ...prevState, from: from }))
    setFilters((prevState) => ({ ...prevState, from: from }))
  }

  const setTo = (to) => {
    setPeriodRange((prevState) => ({ ...prevState, to: to }))
    setFilters((prevState) => ({ ...prevState, to: to }))
  }

  const inputHandler = (e, type) => {
    switch (type) {
      case 'PERIOD':
        setFilterdPeriod(e.target.name)
        setFilters({ ...filters, period: e.target.value })
        break
      case 'STATUS':
        setStatus(e.target.name)
        setFilters({ ...filters, signed: e.target.value })
        break
      case 'COMPANY_NAME':
        e !== null ? setFilters({ ...filters, company_id: e.id }) : setFilters({ ...filters, company_id: '' })
        break
    }
  }
  const getCompaniesNames = async () => {
    try {
      let resp = await axios.get(`${BASE_URL}${END_POINT.COMPANY}`)
      if (resp.status === 200) {
        let companies = resp.data.company.map((company) => {
          let obj = {}
          Object.entries(company).forEach(([key, value]) => {
            if (key === 'name' || key === 'id') {
              obj[key] = value
            }
          })
          return obj
        })
        setCompaniesNames(companies)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const getAllContractAsync = async (filters) => {
    try {
      let params = {}
      Object.entries(filters).forEach(([key, value]) => {
        if (key === 'from') {
          if (value !== null && value !== 'DD/MM/YYYY' && value !== '') {
            params[key] = value.split('/').reverse().join('-')
          } else {
            return
          }
        } else if (key === 'to') {
          if (value !== null && value !== 'DD/MM/YYYY' && value !== '') {
            params[key] = value.split('/').reverse().join('-')
          } else {
            return
          }
        } else {
          if (value !== '' && value !== null && value !== 'All') {
            params[key] = value
          } else {
            return
          }
        }
        console.log(params, 'PARAMS')
      })

      let resp = await axios.get(`${BASE_URL}${END_POINT.CONTRACT}`, { params })
      if (resp.status === 200) {
        setLoadingContract(false)
        setContractsRows(resp.data.contract)
      }
    } catch (err) {
      console.log(err)
      dispatch(actionSnackBar.setSnackBar('error', 'Fail Loading Contracts', 2000))
    }
  }

  useEffect(() => {
    getAllContractAsync(filters)
    getCompaniesNames()
  }, [])

  useEffect(() => {
    getAllContractAsync(filters)
  }, [filters])

  return (
    <>
      <Grid container style={{ position: 'absolute', width: '111px', top: 94, left: 140 }} flexDirection='column'>
        <Grid item xs={12}>
          <BlueShape />
        </Grid>
        <Grid item style={{ paddingTop: 10 }}>
          <Typography style={{ fontSize: 24, color: '#868DA2' }}>Contracts</Typography>
        </Grid>
      </Grid>
      <Grid container style={{ position: 'relative', margin: '60px 0px 0px 350px', width: '70%' }}>
        <Grid item xs={12}>
          <Grid container justifyContent='center' alignItems='center'>
            {/* SECTION OF FILTERS */}
            <Grid item xs={9}>
              <Grid container>
                <Grid item xs={2}>
                  <RangeDatePicker renderFrom={'filters'} max_days_allowed={1460} from={periodRange.from} setFrom={setFrom} to={periodRange.to} setTo={setTo} />
                </Grid>
                <Grid item xs={3} style={{ marginLeft: 105 }}>
                  <SelectInputUnit
                    className={classes.autoCompleteStyle}
                    label={filterdPeriod ? '' : 'Period'}
                    name='periodicity'
                    value={filterdPeriod.value}
                    onChange={(e) => inputHandler(e, 'PERIOD')}
                    optionLabelField='name'
                    valueField='value'
                    placeholder='Type'
                    optionsArray={periodicity}
                  />
                </Grid>
                <Grid item xs={3} style={{ marginLeft: 15 }}>
                  <SelectInputUnit
                    className={classes.autoCompleteStyle}
                    name='name'
                    label={status ? '' : 'Contract Status'}
                    optionLabelField='name'
                    valueField='value'
                    placeholder='Type'
                    value={status.value}
                    onChange={(e) => inputHandler(e, 'STATUS')}
                    optionsArray={contractStatus}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={2}>
              {companiesNames && (
                <AutoCompleteUnit
                  options={companiesNames}
                  name='companyName'
                  label='Search Company'
                  formObject={filters}
                  fieldForLabel='name'
                  inputValue={inputCompanyName}
                  setInputValue={setInputCompanyName}
                  handler={(e) => inputHandler(e, 'COMPANY_NAME')}
                />
              )}
            </Grid>

            {loadingContract && !contractsRows && (
              <Grid item xs={12} align='center' style={{ height: 'calc(100vh - 539px)' }}>
                <CircularProgress size={40} thickness={4} value={100} style={{ marginTop: '8%' }} />
              </Grid>
            )}
            {contractsRows && !loadingContract && (
              <Grid item xs={11} style={{ paddingTop: 20 }}>
                <ContractsTable contractsRows={contractsRows} />
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default AllContracts
