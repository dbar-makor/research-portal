import { useState, useEffect } from 'react';
import { useStyles } from "../../../styles/AllNotificationStyle";
import { StyledTextField } from '../../../styles/MainStyles';
import { Grid, Typography, Button, TextField, Chip, Divider } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as SearchIcon } from '../../../assets/icons/IconSearch.svg';
import * as webSocketService from '../../../services/websocket'







function ControlBar({setSearchTerm, makeAllRead}) {
    const classes = useStyles();
    const [localSearch, setLocalSearch] = useState('');

    const token = useSelector((state) => state.auth.token)

   const handleSearch = (e) => {
    if (e.key && e.key === 'Enter' && localSearch !== "") {
        setSearchTerm(localSearch)
         }
    }

    const handleClick = () =>{
        makeAllRead();
    }

    useEffect(() => {
      if(localSearch === ""){
        setSearchTerm("");
      }
    }, [localSearch]);
    
       


  return (
    <Grid container className={classes.controlBarContainer}>
        <Grid item>
            <Typography className={classes.link} onClick={handleClick}>Mark All as Read</Typography>
        </Grid>
        <Grid item> 
            <StyledTextField
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                onKeyDown={handleSearch}
                variant='outlined'
                fullWidth
                placeholder='Search'
                InputProps={{
                    endAdornment: <SearchIcon className={classes.searchIcon} onClick={() => {setSearchTerm(localSearch)}}/>,
                }}
                />
          </Grid>
            
    </Grid>
    
    )
}

export default ControlBar;
