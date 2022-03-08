import { Divider, Grid, Typography } from '@material-ui/core';
import { useStyles } from '../../../styles/PublicationsStyles';
import { ReactComponent as Calendar } from '../../../assets/icons/iconCalendar.svg';

function Events(props) {
  const { events } = props;
  const classes = useStyles();


  const Event = (event , idx) => {
      /*
        TODO: enter here a suteable formition for events
      */
    return (
      <Grid key={idx} item className={classes.contentGrid}>
        <Grid container alignItems="center" style={{ marginLeft: 16, width: `calc(100% - 50px)`, cursor: 'pointer' }}>
          <Grid item style={{ lineHeight: '0px' }}>
            <Calendar className={classes.calendarIcon} />
          </Grid>
          <Grid item>
            <Typography className={classes.contentName}>{event.title}</Typography>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  const noEvents = () => {
    return (
      <Grid  item xs={12} className={classes.contentGrid}>
        <Typography style={{ fontSize: 16, marginLeft: 16, color: '#001858' }}>No events linked to this publication</Typography>
      </Grid>
    );
  };

  return (
    <Grid item xs={12}>
      <Divider className={classes.divider}></Divider>
      <Grid container style={{ paddingTop: '10px' }}>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12}>
              <Typography style={{ fontSize: 20, color: '#868DA2' }}>Events</Typography>
            </Grid>
          </Grid>
          {events.length > 0
            ? events.map((event, idx) => {
                return Event(event, idx);
              })
            : noEvents()}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Events;
