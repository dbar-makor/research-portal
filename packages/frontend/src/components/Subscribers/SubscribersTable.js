import React, { useEffect } from 'react';
//MUI
import { Grid, Table, TableHead, TableBody, TableRow, TableCell, TableContainer } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import * as subscribersAction from '../../redux/subscribers/subscribersSlice';
//Icons
import { ReactComponent as Paid } from '../../assets/icons/paid.svg';
import { ReactComponent as NotPaid } from '../../assets/icons/notPaid.svg';
import { setChosenSubscriber } from '../../redux/subscribers/subscribersSlice';

function SubscribersTable(props) {
  const dispatch = useDispatch();
  const subscribers = useSelector((state) => state.subscribers.subscribers);
  const columns = ['Name', 'Email', 'Paid', 'Country'];

  const setChosenSubscriber = (sub) => {
    dispatch(subscribersAction.setChosenSubscriber(sub));
  };
  return (
    <Grid item xs={5} style={{ height: 'calc(100vh - 60px)', paddingTop: 50 }}>
      <TableContainer style={{ maxHeight: '80%', overflow: 'auto' }}>
        <Table stickyHeader size="medium">
          <TableHead style={{ backgroundColor: '#bababa' }}>
            <TableRow>
              {columns.map((col, idx) => {
                return (
                  <StyledTableCell style={{ textAlign: col !== 'Name' ? 'center' : null }} key={idx}>
                    {col}
                  </StyledTableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {subscribers.map((sub, idx) => {
              return (
                <StyledTableRow key={idx} onClick={() => setChosenSubscriber(sub)}>
                  {Object.entries(sub).map(([key, value], idx) => {
                    return key === 'full_name' ? (
                      <StyledTableCell style={{ width: 140 }}>{value}</StyledTableCell>
                    ) : key === 'email' ? (
                      <StyledTableCell style={{ textAlign: 'center', width: 45 }}>{value}</StyledTableCell>
                    ) : key === 'paid' ? (
                      <StyledTableCell style={{ textAlign: 'center', width: 30 }}>{value === true ? <Paid /> : <NotPaid />}</StyledTableCell>
                    ) : key === 'country' ? (
                      <StyledTableCell style={{ textAlign: 'center', width: 40 }}>{value}</StyledTableCell>
                    ) : null;
                  })}
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}

const StyledTableCell = withStyles(() => ({
  root: {
    color: '#000',
  },
}))(TableCell);

const StyledTableRow = withStyles(() => ({
  root: {
    '&:hover': {
      backgroundColor: '#f0f0f0',
      cursor: 'pointer',
    },
  },
}))(TableRow);
export default SubscribersTable;
