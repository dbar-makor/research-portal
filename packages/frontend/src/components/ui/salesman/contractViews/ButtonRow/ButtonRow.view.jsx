import React from 'react';
import { Grid} from '@material-ui/core';
import { FilledButton, OutlinedButton } from '../../../../../styles/MainStyles';

import useStyles from './ButtonRow.style';

const ButtonRowView = (props) => {
	const classes = useStyles();

  return 	(<Grid container className={classes.buttonRowWrapper} style={props.style}>
  <Grid item xs={12}>
    <Grid container justifyContent={'space-between'}>
      <Grid item className={classes.btnWrapper}>
        <OutlinedButton className={classes.cancelStyle} onClick={props.handlerLeft}>
          {props.textButtonLeft}
        </OutlinedButton>
      </Grid>

      <Grid item className={classes.btnWrapper}>
        <FilledButton
          className={classes.submitStyle}
          onClick={props.handlerRight}
          disabled={!props.validationResult}
        >
          {props.textButtonRight}
        </FilledButton>
      </Grid>
    </Grid>
  </Grid>
</Grid>
);
};

ButtonRowView.displayName = 'ButtonRowView';
ButtonRowView.defaultProps = {};

export default React.memo(ButtonRowView);
