import { forwardRef, useImperativeHandle, useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { Dialog, DialogTitle, Grid, IconButton, Typography } from '@material-ui/core';
import { useStyles } from '../../../styles/ContarctsModalStyles';
import SubHeaderModal from '../../Reusables/SubHeaderModal';
import SideForm from './SideForm';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { format } from 'date-fns';
import Contract from '../ContractViews/Contract';

const ContractEditMain = forwardRef((props, ref) => {
	const classes = useStyles();
	const { contract, clientName } = props;
	const [openEdit, setOpenEdit] = useState(false);
	const [activeSidebar, setActiveSidebar] = useState(false);
	const [loadingSidebar, setLoadingSidebar] = useState(false);

	useImperativeHandle(ref, () => ({
		openModal() {
			setOpenEdit(!openEdit);
		},
	}));

	const openModal = () => {
		setOpenEdit(!openEdit);
	};

	return (
		<Dialog
			open={openEdit}
			onClose={() => openModal()}
			classes={{ paper: classes.contractModalPaper }}
			BackdropProps={{
				classes: {
					root: classes.modalBackDrop,
				},
			}}
		>
			<Grid item xs={12} align="right" style={{ margin: '10px 10px 0px 0px' }}>
				<IconButton size="small" onClick={() => openModal()}>
					<CloseIcon style={{ color: '#000' }} />
				</IconButton>
			</Grid>
			<DialogTitle>
				<Grid container justifyContent="center">
					<Grid item xs={12}>
						<Grid container alignItems="center" justifyContent="center">
							<SubHeaderModal title="Edit Contract" />
							<Grid item xs={12}>
								<Typography className={classes.modalSubHeader}>{clientName}</Typography>
							</Grid>
						</Grid>
						<Grid item xs={12}>
							<Grid container alignItems="center" spacing={1}>
								<Grid item>
									<Typography style={{ fontSize: 16, color: '#868DA2' }}>
										Hisorty
									</Typography>
								</Grid>
								<Grid item style={{ margintTop: '10px' }}>
									<ArrowForwardIosIcon
										style={{ fontSize: 16, alignSelf: 'center', color: '#000' }}
									/>
								</Grid>
								<Grid item>
									<Typography
										style={{ fontSize: 16, color: '#000' }}
									>{`Editing Contract of ${format(
										new Date(contract.start_at),
										'dd MMM, yyyy',
									)} `}</Typography>
								</Grid>
							</Grid>
						</Grid>
					</Grid>

					<Grid container className={classes.mainWrapper}>
						<Grid item xs={8}>
							<Contract
								stepperMode={false}
								chosenContract={contract}
								setLoadingSidebar={setLoadingSidebar}
								setActiveSidebar={setActiveSidebar}
							/>
						</Grid>
						<Grid item xs={4}>
							<SideForm
								setActiveSidebar={setActiveSidebar}
								activeSidebar={activeSidebar}
								chosenContract={contract}
								loadingSidebar={loadingSidebar}
								setLoadingSidebar={setLoadingSidebar}
							/>
						</Grid>
					</Grid>
				</Grid>
			</DialogTitle>
		</Dialog>
	);
});

ContractEditMain.displayName = 'ContractEditMain';

export default ContractEditMain;
