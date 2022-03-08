import {
  TableCell,
  TableBody,
  TableRow
} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() => ({
  tableRow: {
    cursor: 'pointer',
    '& :first-child': {
      // borderTop: '1px solid red'
      // borderRadius: '0px 0px 4px 4px',
    },
    // '& :last-child': {
    //   borderRadius: ' 0 4px 4px 0',
    // },
    '&:hover': {
      backgroundColor: '#EDEFF3',
      transition: '.3s'
      // border: '1px solid #red',

    },
  root: {
    '& .MuiTableRow-root td:last-child': {
      // borderRadius: '10px',
      // border-bottom-right-radius: 10px;
    },
  }
    
  },
  selectedRow: {
    backgroundColor: '#EDEFF3'
  },
  checkmark: {
    width: '28px',
  },
  table: {
    '& .MuiTableCell-stickyHeader': {
      backgroundColor: '#ffffff',
    },
    '& .MuiTableBody-root': {
      '& tr:nth-of-type(1)': {
        '& td:nth-child(1)': {
          borderRadius: '8px 0px 0px 0px',
          borderBottom: '1px solid #EDEEF1 ',
          borderTop: '1px solid #EDEEF1 ',
          borderLeft: '1px solid #EDEEF1 ',
        },
        '& td:last-child': {
          borderRadius: '0px 8px 0px 0px',
          borderBottom: '1px solid #EDEEF1 ',
          borderTop: '1px solid #EDEEF1',
        },
        '& td:not(:first-child):not(:last-child)': {
          borderBottom: '1px solid #EDEEF1 ',
          borderTop: '1px solid #EDEEF1 ',
        },
      },
      '& tr:last-child': {
        '& td:nth-child(1)': {
          borderRadius: '0px 0px 0px 8px',
          borderBottom: '1px solid #EDEEF1 ',
          borderTop: '1px solid #EDEEF1 ',
          borderLeft: '1px solid #EDEEF1 ',
        },
        '& td:last-child': {
          borderRadius: '0px 0px 8px 0px',
          borderBottom: '1px solid #EDEEF1 ',
          borderTop: '1px solid #EDEEF1',
        },
        '& td:not(:first-child):not(:last-child)': {
          borderBottom: '1px solid #EDEEF1 ',
          borderTop: '1px solid #EDEEF1 ',
        },
      },
      '& tr:not(:first-child):not(:last-child)': {
        '& td:first-child': {
          borderLeft: '1px solid #EDEEF1 ',
        },
        '& td:last-child': {
          borderRight: '1px solid #EDEEF1 ',
        },
      },
    },
  },
}))

export const StyledTableCell = withStyles(() => ({
  root: {
    // border: "none",
  },
  head: {
    backgroundColor: "#FEFEFE",
    color: "#868DA2",
    fontSize: '16px',
    borderBottom: 'none',
    // paddingTop: '0px',
    // paddingBottom: '0px',
    whiteSpace: 'nowrap',
    // width: '5%'
  },
  body: {
    borderBottom: '1px solid #EDEEF1',
    padding: '9px 4px',
    // whiteSpace: 'nowrap',
    // width: '2%'
  },
}))(TableCell);

export const MembersTableCell = withStyles(() => ({
  head: {
    padding: '10px 3px',
    backgroundColor: "#F9FAFB",
    borderBottom: '1px solid #EDEDF0',
    color: "#868DA2",
    fontSize: '14px',
    fontWeight: 400
    // paddingTop: '0px',
    // paddingBottom: '0px',
    // whiteSpace: 'nowrap',
    // width: '5%'
  },
  body: {
    fontSize: '16px',
    color: '#0F0F0F',
    borderBottom: '1px solid #EDEDF0',
    padding: '0px 3px',
    height: '42px',
    whiteSpace: 'nowrap',
    width: '2%'
  },
}))(TableCell);

export const StyledTableBody = withStyles(() => ({
  root: {
    border: "1px solid #EDEEF1",
    // borderRadius: '8px',
    '&:last-child': {
        // borderRadius: '0px 0px 8px 8px',
    }
  },
  
//   head: {
//     backgroundColor: "transparent",
//     color: "#868DA2"
//   },
//   body: {
//     borderBottom: '1px solid #EDEEF1'
//   },
}))(TableBody);

export const StyledTableRow = withStyles(() => ({
  root: {
    border: "1px solid #EDEEF1",
    // borderRadius: '8px',
    height: '54px',
    '&:last-child td': {
      // borderRadius: 8
    },
    // '& .MuiTableRow': {
        // '&:last-child': {
            // borderRadius: '0px 0px 8px 8px',
        // }
    //   }
  },
  
//   head: {
//     backgroundColor: "transparent",
//     color: "#868DA2"
//   },
//   body: {
//     borderBottom: '1px solid #EDEEF1'
//   },
}))(TableRow);


export const MembersTableRow = withStyles(() => ({
  root: {
    '&:last-child td': {
      borderBottom: 0
    }
  },

}))(TableRow);