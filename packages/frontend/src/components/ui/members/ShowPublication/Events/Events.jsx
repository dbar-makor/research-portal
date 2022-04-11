import React from 'react';

import EventsView from './Events.view';

const Events = ({ events }) => {
	return <EventsView events={events}></EventsView>;
};

Events.displayName = 'Events';
Events.defaultProps = {};

export default React.memo(Events);
