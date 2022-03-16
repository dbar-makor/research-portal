import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
	dialog: {
		boxShadow: '0px 8px 24px #0018581F',
	},
	modalContainer: {
		backgroundColor: '#fff',
		width: '536px',
		height: '469px',
		flexDirection: 'column',
		alignItems: 'center',
		paddingTop: '24px',
		borderRadius: '8px',
		boxShadow: '0px 8px 24px #0018581F',
	},
	modalTitle: {
		color: '#1C67FF',
		fontSize: '24px',
		fontWeight: 400,
		marginBottom: '8px',
		fontFamily: 'Inter',
	},
	end: {
		textAlignLast: 'end',
	},
	paddingGrid: {
		padding: '0 55px 122px 36px',
	},
	articleType: {
		color: '#868DA2',
		fontFamily: 'inter',
		fontSize: '16px',
		textAlignLast: 'center',
		marginBottom: '64px',
	},
	button2Style: {
		'width': '210px',
		'height': '146px',
		'border': '2px solid #A5AFC233',
		'borderRadius': '8px',
		'& g': {
			'& .upload3': {
				transform: 'translate(1075.463px, 484.774px)',
				transition: '.3s',
			},
		},

		'&:hover': {
			'backgroundColor': '#E7EFFF',
			'& g': {
				'& .upload3': {
					fill: '#1C67FF',
					transform: 'translate(1075.463px, 482.774px)',
					transition: '.3s',
				},
				'& g': {
					'& .upload1': {
						stroke: '#1C67FF',
					},
					'& .upload2': {
						stroke: '#1C67FF',
					},
				},
			},
			'& .uploadTitle': {
				textTransform: 'capitalize',
				fontWeight: 500,
			},
		},
	},
	marginTop14px: {
	},
	articleTitle2: {
		textTransform: 'capitalize',
	},
	uploadTitle: {
		textTransform: 'capitalize',
	},
	animationFade: {
		transition: '1s',
		transitionTimingFunction: 'ease-out',
	},
	closeIcon: {
		paddingRight: '24px',
		cursor: 'pointer',
	},
	buttonStyle: {
		'width': '210px',
		'height': '146px',
		'border': '2px solid #A5AFC233',
		'borderRadius': '8px',
		'& g': {
			'& g': {
				'& .pen': {
					transform: 'translate(22.869px, 15.274px)',
					transition: '.3s',
				},
				'& g': {
					'& .article1': {
						transform: 'translate(-6px, -3px)',
						transition: '.3s',
					},
					'& .article2': {
						transform: 'translate(0.248px, -3px)',
						transition: '.3s',
					},
					'& .article3': {
						transform: 'translate(-3.288px, 5.8px)',
						transition: '.3s',
					},
					'& .article4': {
						transform: 'translate(-3.31px, 2.6px)',
						transition: '.3s',
					},
				},
				'& .article5': {
					transform: 'translate(-3.366px, 8.789px)',
					transition: '.3s',
				},
			},
		},
		'&:hover': {
			'backgroundColor': '#E7EFFF',
			'& g': {
				'& g': {
					'& .pen': {
						'fill': '#1C67FF',
						'stroke': '#1C67FF',
						'transform': 'translate(19.869px, 17.274px)',
						'transition': '.3s',
						'& .circlePen': {
							fill: '#E7EFFF',
						},
					},

					'& g': {
						'& .article1': {
							stroke: '#1C67FF',
							transform: 'translate(-4px, -3px)',
							transition: '.3s',
						},
						'& .article2': {
							stroke: '#1C67FF',
							transform: 'translate(1.248px, -3px)',
							transition: '.3s',
						},
						'& .article3': {
							stroke: '#1C67FF',
							transform: 'translate(-2.288px, 5.8px)',
							transition: '.3s',
						},
						'& .article4': {
							stroke: '#1C67FF',
							transform: 'translate(-2.31px, 2.6px)',
							transition: '.3s',
						},
					},
					'& .article5': {
						stroke: '#1C67FF',
						transform: 'translate(-2.366px,  8.789px)',
						transition: '.3s',
					},
				},
			},
			'& .articleTitle': {
				fontWeight: 500,
				textTransform: 'capitalize',
			},
		},
	},
}));

export default useStyles;
