import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
	arrowIcon: {
		'& .MuiSvgIcon-root': {
			color: '#1C67FF',
		},
		'& .MuiSelect-nativeInput': {},
	},
}));

export default useStyles;
