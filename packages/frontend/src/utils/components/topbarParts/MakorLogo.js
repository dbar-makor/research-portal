import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../../assets/icons/makorLogo.svg';

const MakorLogo = ({userType,classes}) => {
	return (
		<Link
			to={userType === 'author' ? '/researches' : userType === 'sales' ? '/companies' : '/home'}
			className={classes.link}
		>
			<Logo />
		</Link>
	);
};

export default MakorLogo;
