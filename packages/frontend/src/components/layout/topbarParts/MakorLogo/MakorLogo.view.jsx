import React from 'react';
import { ReactComponent as Logo } from '../../../../assets/icons/makorLogo.svg';
import { Link } from 'react-router-dom';

//import useStyles from './MakorLogo.style';

const MakorLogoView = (props) => {

  return  (
		<Link
			to={props.userType === 'author' ? '/researches' : props.userType === 'sales' ? '/companies' : '/home'}
			className={props.classes.link}
		>
			<Logo />
		</Link>
	);
};

MakorLogoView.displayName = 'MakorLogoView';
MakorLogoView.defaultProps = {};

export default React.memo(MakorLogoView);
