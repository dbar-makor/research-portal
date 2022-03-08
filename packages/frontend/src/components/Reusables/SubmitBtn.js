import { Grid, Button } from '@material-ui/core';

function SubmitBtn({ className, handler }) {
  return (
    <Grid item xs={12}>
      <Grid container justifyContent="center">
        <Grid item>
          <Button onClick={handler} variant="contained" className={className}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default SubmitBtn;
