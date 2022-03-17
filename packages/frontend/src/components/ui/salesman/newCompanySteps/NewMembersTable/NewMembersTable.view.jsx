import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { DotsButton } from '../../../../../styles/MainStyles';
import { Grid } from '@material-ui/core';

import useStyles from './NewMembersTable.style';

const ITEM_HEIGHT = 48;

const NewMembersTableView = (props) => {
	const classes = useStyles();

	return (
		<Grid container className={classes.tableWrapper}>
			<Grid item xs={11} style={{ minWidth: 470 }}>
				<TableContainer component={Paper} className={classes.tableSkin}>
					<Table className={classes.table} aria-label="simple table">
						<TableHead className={classes.tableHead}>
							<TableRow className={classes.headerRow}>
								<TableCell className={classes.headerCell} align="left">
									Name
								</TableCell>
								<TableCell className={classes.headerCell} align="left">
									Username
								</TableCell>
								<TableCell className={classes.headerCell} align="left" style={{ width: 120 }}>
									Email
								</TableCell>
								<TableCell className={classes.headerCell} align="left">
									Position
								</TableCell>
								<TableCell className={classes.headerCell} align="left" style={{ width: 80 }}>
									Categories
								</TableCell>
								<TableCell className={classes.headerCell} align="left"></TableCell>
							</TableRow>
						</TableHead>
						<TableBody className={classes.tableBody}>
							{props.rows.map((row, index) => (
								<TableRow key={row.email} className={classes.dataRow}>
									<TableCell className={classes.tableCell} scope="row">
										{row['member_name']}
									</TableCell>
									<TableCell className={classes.tableCell} align="left">
										{row.username}
									</TableCell>
									<TableCell
										className={classes.tableCell}
										align="left"
										style={{ wordBreak: 'break-all', width: 120 }}
									>
										{row.email}
									</TableCell>
									<TableCell className={classes.tableCell} align="left">
										{row.position}
									</TableCell>
									<TableCell
										className={classes.tableCell}
										align="center"
										style={{ width: 80 }}
									>
										{row.categories.length}
									</TableCell>
									<TableCell className={classes.tableCell} align="center">
										<DotsButton onClick={props.handleClick}>
											<MoreVertIcon className={classes.dotsIcon} />
										</DotsButton>
										<Menu
											open={props.open}
											anchorEl={props.anchorEl}
											onClose={props.handleClose}
											keepMounted
											className={classes.menu}
											PaperProps={{
												style: {
													maxHeight: ITEM_HEIGHT * 4.5,
													width: '12ch',
												},
											}}
										>
											<MenuItem
												onClick={() => props.editMember(index)}
												className={classes.option}
											>
												Edit
											</MenuItem>
											<MenuItem
												onClick={() => props.deleteMember(index)}
												className={classes.option}
											>
												Delete
											</MenuItem>
										</Menu>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Grid>
		</Grid>
	);
};

NewMembersTableView.displayName = 'NewMembersTableView';
NewMembersTableView.defaultProps = {};

export default React.memo(NewMembersTableView);
