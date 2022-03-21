import StepConnector from '@material-ui/core/StepConnector';
import { withStyles } from '@material-ui/core/styles';

const StepperConnector = withStyles({
	alternativeLabel: {
		top: 22,
	},
	active: {
		'& $line': {
			backgroundColor: '#B8C3D8',
		},
	},
	line: {
		height: 1,
		width: '10vw',
		border: 0,
		backgroundColor: '#B8C3D8',
		borderRadius: 1,
		margin: '0 auto',
	},
})(StepConnector);

export default StepperConnector;
