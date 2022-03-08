import React, { useEffect, useState } from 'react';
import { BASE_URL, END_POINT } from '../../../utils/constants';

import axios from 'axios';
import { format } from 'date-fns';
//MUI
import { Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';

import { useStyles } from '../../../styles/ContarctsModalStyles';
import SelectInputUnit from '../../Reusables/SelectInputUnit';

import { withStyles } from '@material-ui/styles';
import ContractRow from './ContractRow';

const rowHeaders = [
  { name: 'Contract Period', align: 'left', width: 211 },
  { name: 'Agent', align: 'left', width: 97 },
  { name: 'Members', align: 'left', width: 86 },
  { name: 'Period', align: 'left', width: 88 },
  { name: 'Amount', align: 'left', width: 75 },
  { name: 'Yearly Cost', align: 'center', width: 91 },
  { name: 'Signed', align: 'center', width: 90 },
  { name: 'Payment', align: 'center', width: 90 },
];
const statusValues = [
  { value: 'all', name: 'All' },
  { value: 'signed', name: 'Signed' },
  { value: 'not signed', name: 'Not Signed' },
];

function ContractAndInvoicesContent(props) {
  const {clientId , clientName} = props
  const classes = useStyles();
  const [sortStatus, setSortStatus] = useState('');
  const [contracts, setContracts] = useState([]);
  const [filterdContract , setFilterContract] =useState([]);
  
  
  const filterStatus = (value) => {
    setSortStatus(value);
    if(value === "all"){
        setFilterContract(contracts)
    }else if(value === "signed"){
      let filter = contracts.filter(con => con.signed === true)
      setFilterContract(filter);
    }else{
      let filter = contracts.filter((con) => con.signed === false);
      setFilterContract(filter);
    }
  };

  const getClientContract = async (id) => {
    try {
      const res = await axios.get(`${BASE_URL}${END_POINT.COMPANY}${END_POINT.CONTRACT}/${id}`);
      if (res.status === 200) {
        console.log( "res.data",res.data)
        await setContracts(res.data);
        await setFilterContract(res.data)
        console.log(contracts , "CONTRACT FILTER");
      }
    } catch (err) {
      console.log(err.message);
      alert(err.message);
    }
  };

  useEffect(() => {
    getClientContract(clientId);
  }, [clientId]);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item xs={5}>
            <Typography style={{ textAlign: 'left', fontSize: '16px' }} className={classes.modalHeader}>
              History
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <SelectInputUnit
              name="show all"
              label={sortStatus !== '' ? '' : 'Sort Status'}
              value={sortStatus || ''}
              optionsArray={statusValues}
              optionLabelField="name"
              onChange={(e) => filterStatus(e.target.value)}
              valueField="value"
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} style={{ paddingTop: '19px' }}>
        <Grid container alignItems="center" style={{ border: '1px solid #EDEEF1', borderRadius: 8 }}>
          <TableContainer style={{ height: 540 }}>
            <Table stickyHeader size="small">
              <TableHead>
                {rowHeaders.map((row, i) => {
                  return <HeaderCells style={{ textAlign: row.align, width: row.width }}>{row.name}</HeaderCells>;
                })}
              </TableHead>
              <TableBody>
                {filterdContract &&
                  filterdContract.map((contract, i) => {
                    return <ContractRow contract={contract} status={sortStatus} clientName={clientName}/>;
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ContractAndInvoicesContent;

const HeaderCells = withStyles(() => ({
  root: {
    padding: '10px 0px 10px 2px',
    color: '#868DA2',
    fontSize: '14px',
    fontWeight: 300,
  },
}))(TableCell);
