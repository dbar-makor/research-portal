import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
	calendarIcon: {
		'& g': {
			'& path': {
				stroke: '#1C67FF',
			},
		},
	},
}));

export default useStyles;
