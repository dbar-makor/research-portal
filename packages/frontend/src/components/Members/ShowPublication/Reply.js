import { Grid, Typography } from '@material-ui/core';
import { useStyles } from '../../../styles/PublicationsStyles';
import { format } from 'date-fns';

function Reply(props) {
  const { reply } = props;
  const classes = useStyles();
  return (
    <Grid item xs={11} style={{ paddingTop: 15 }}>
      <Grid container justifyContent="flex-end">
        <Grid item xs={12}>
          <Typography className={classes.commentWriter}>{`${reply.user.name} | ${format(new Date(reply.created_at), 'dd.MM.yyy')}`}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography style={{ fontSize: 12 }}>{reply.content}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Reply;
