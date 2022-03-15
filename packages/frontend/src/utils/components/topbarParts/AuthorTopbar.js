import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
// import SelectInputUnit from '../../../components/Reusables/SelectInputUnit';
// import { ReactComponent as SearchIcon } from '../../../assets/icons/IconSearch.svg';
// import { StyledTextField } from '../../../styles/MainStyles';

const AuthorTopbar = ({ classes }) => {
	return (
		<Grid item xs={3} style={{ marginRight: 113 }}>
			<Grid container justifyContent="space-between">
				<Grid item>
					<Link to={'/companies'} className={classes.styledLinks}>
						Companies
					</Link>
				</Grid>
				<Grid>
					<Link to={'/contracts'} className={classes.styledLinks}>
						Contracts
					</Link>
				</Grid>
				<Grid>
					<Link to={'/invoices'} className={classes.styledLinks}>
						Invoices
					</Link>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default AuthorTopbar;
