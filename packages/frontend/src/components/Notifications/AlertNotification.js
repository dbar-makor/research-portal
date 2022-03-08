import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { parseISO, formatDistanceToNow } from 'date-fns';
import * as webSocketService from '../../services/websocket';

const AlertNotification = ({ key, notifi, setCountAlerts, handleClose }) => {
  const token = useSelector((state) => state.auth.token);
  let content = notifi.content;
  if (typeof notifi.content == 'string') {
    content = JSON.parse(notifi.content);
  }
  const setIsRead = (notifyId) => {
    let message = {
      type: 'set-is-read',
      id: notifyId,
    };
    webSocketService.sendEvent(message, token);
    if (notifi.is_new) {
      setCountAlerts((count) => count - 1);
      let newMessage = {
        type: 'set-is-new',
        id: notifyId,
      };
      webSocketService.sendEvent(newMessage, token);
    }
  };

  const TimeAgo = (timestamp) => {
    let timeAgo = '';
    if (timestamp) {
      const date = parseISO(timestamp);
      const timePeriod = formatDistanceToNow(date);
      timeAgo = `${timePeriod} ago`;
      return timeAgo;
    }
  };
  const setAsRead = (e) => {
    setIsRead(notifi.id);
    notifi.is_read = true;
    handleClose(e, 'notify');
  };
  return (
    <Grid item xs={11} key={key} style={{ borderBottom: '1px solid #EDEFF3', paddingBottom: 8, backgroundColor: notifi.is_read ? '#FFFFFF' : '#F3F7FF' }}>
      <Link
        to={{
          pathname: `/article/${content.publication_id}`,
        }}
        style={{ textDecoration: 'none' }}
        onClick={(e) => setAsRead(e)}
      >
        <Grid container>
          <Grid item xs={12}>
            <Grid container direction="column" direction="column" justifyContent="center" alignItems="flex-start">
              <Grid item>
                <Typography style={{ color: '#1C67FF', fontSize: '14px', textTransform: 'capitalize' }}>{content.type}</Typography>
              </Grid>
              <Grid item>
                <Typography style={{ fontSize: '16px' }}>{content.title}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container direction="column" justifyContent="center" alignItems="flex-end">
              <Grid item>
                <Typography style={{ fontSize: '12px', color: '#B8C3D8' }}>{TimeAgo(content.time)}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Link>
    </Grid>
  );
};

export default AlertNotification;
