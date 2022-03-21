import React from 'react';
import { Dialog, DialogTitle, Grid, IconButton, Typography } from '@material-ui/core';

import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { useStyles } from '../../../../../styles/ContarctsModalStyles';
import SubHeaderModal from '../../../reusables/SubHeaderModal/SubHeaderModal';
import Contract from '../../contractViews/Contract/Contract';
import SideForm from '../SideForm/SideForm';
import { format } from 'date-fns';

const ContractEditMainView = (props) => {
	const classes = useStyles();

	return (
		<Dialog
			open={props.openEdit}
			onClose={() => props.openModal()}
			classes={{ paper: classes.contractModalPaper }}
			BackdropProps={{
				classes: {
					root: classes.modalBackDrop,
				},
			}}
		>
			<Grid item xs={12} align="right" style={{ margin: '10px 10px 0px 0px' }}>
				<IconButton size="small" onClick={() => props.openModal()}>
					<c style={{ color: '#000' }} />
				</IconButton>
			</Grid>
			<DialogTitle>
				<Grid container justifyContent="center">
					<Grid item xs={12}>
						<Grid container alignItems="center" justifyContent="center">
							<SubHeaderModal title="Edit Contract" />
							<Grid item xs={12}>
								<Typography className={classes.modalSubHeader}>{props.clientName}</Typography>
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
										new Date(props.contract.start_at),
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
								chosenContract={props.contract}
								setLoadingSidebar={props.setLoadingSidebar}
								setActiveSidebar={props.setActiveSidebar}
							/>
						</Grid>
						<Grid item xs={4}>
							<SideForm
								setActiveSidebar={props.setActiveSidebar}
								activeSidebar={props.activeSidebar}
								chosenContract={props.contract}
								loadingSidebar={props.loadingSidebar}
								setLoadingSidebar={props.setLoadingSidebar}
							/>
						</Grid>
					</Grid>
				</Grid>
			</DialogTitle>
		</Dialog>
	);
};

ContractEditMainView.displayName = 'ContractEditMainView';
ContractEditMainView.defaultProps = {};

export default React.memo(ContractEditMainView);
