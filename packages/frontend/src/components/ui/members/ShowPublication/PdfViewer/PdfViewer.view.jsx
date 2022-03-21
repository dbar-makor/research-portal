import React from 'react';

import { Divider, Grid, Typography } from '@material-ui/core';
import { useStyles } from '../../../../../styles/PublicationsStyles';
import { ReactComponent as FileEmpty } from '../../../../../assets/icons/fileEmpty.svg';

const PdfViewerView = (props) => {
	const classes = useStyles();

	return (
		<Grid item xs={12}>
			<Divider className={classes.divider}></Divider>
			<Grid
				container
				alignItems="center"
				justifyContent="space-evenly"
				className={classes.contentGrid}
				style={{ paddingBlock: 27 }}
			>
				<Grid item>
					<Typography style={{ fontSize: 24, color: '#868DA2' }}>{props.pdf.title_pdf}</Typography>
				</Grid>
				<Grid item>
					<Grid container alignItems="center">
						<Grid item>
							<FileEmpty className={classes.fileEmptyIcon} />
						</Grid>
						<Grid item>
							<Typography
								onClick={() => props.downloadFile(props.pdf.file_pdf)}
								className={classes.contentName}
								style={{ cursor: 'pointer' }}
							>{`${props.pdf.file_pdf.slice(0, 19)}.pdf`}</Typography>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

PdfViewerView.displayName = 'PdfViewerView';
PdfViewerView.defaultProps = {};

export default React.memo(PdfViewerView);
