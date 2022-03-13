import { makeStyles } from '@material-ui/core/styles';
import PersonIcon from '@material-ui/icons/Person';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import clsx from 'clsx';

const useIconStyles = makeStyles({
	root: {
		backgroundColor: '#ccc',
		zIndex: 1,
		color: '#fff',
		width: 50,
		height: 50,
		display: 'flex',
		borderRadius: '50%',
		justifyContent: 'center',
		alignItems: 'center',
		fontSize: '2rem',
		// marginTop: "-4vh"
	},
	active: {
		backgroundColor: '#1C67FF',
		color: '#fff',
	},
	completed: {
		backgroundColor: '#FFF',
		color: '#1C67FF',
		border: '1px solid #1C67FF',
	},
});

function StepperIcons(props) {
	const classes = useIconStyles();
	const { active, completed } = props;

	const icons = {
		1: <InfoOutlinedIcon />,
		2: <PersonIcon />,
	};

	return (
		<div
			className={clsx(classes.root, {
				[classes.active]: active,
				[classes.completed]: completed,
			})}
		>
			{icons[String(props.icon)]}
		</div>
	);
}

export default StepperIcons;
