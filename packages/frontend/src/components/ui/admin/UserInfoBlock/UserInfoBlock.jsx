import React from 'react';

import UserInfoBlockView from './UserInfoBlock.view';

const UserInfoBlock = (props) => {
  const { chosenUser, updateUserField } = props;

  const userFields =
		chosenUser.type === 'sales'
			? [
					'username',
					'last_client_added',
					'email',
					'last_prospect_added',
					'created_at',
					'total_clients',
					'last_connected_at',
					'total_prospects',
			  ]
			: [
					'username',
					'last_publication',
					'email',
					'most_read',
					'created_at',
					'total_views',
					'last_connected_at',
					'total_published',
			  ];

	const dateFields = [
		'created_at',
		'last_connected_at',
		'last_client_added',
		'last_prospect_added',
		'last_publication',
	];
  return <UserInfoBlockView
    userFields={userFields}
    chosenUser={chosenUser}
    dateFields={dateFields}
    updateUserField={updateUserField}
  > </UserInfoBlockView>;
};

UserInfoBlock.displayName = 'UserInfoBlock';
UserInfoBlock.defaultProps = {};

export default React.memo(UserInfoBlock);
