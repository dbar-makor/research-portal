import { Typography, Table, TableBody, TableHead, TableRow } from '@material-ui/core';
import { useEffect, useRef, forwardRef } from 'react';
import { format } from 'date-fns';
import { useStyles, StyledTableCell, StyledTableRow } from '../../styles/TableStyles';
import { ReactComponent as GreenCheckmark } from '../../assets/icons/IconGreenCheckmark.svg';
import { ReactComponent as RedCheckmark } from '../../assets/icons/IconRedCheckmark.svg';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { useDispatch, useSelector } from 'react-redux';
import * as chosenCompanyActions from '../../redux/companies/chosenCompanySlice';
import { selectChosenCompany } from '../../redux/companies/chosenCompanySlice';
import clsx from 'clsx';
import { selectType } from '../../redux/companies/companiesSlice';
import { selectChosenUserData, getUserByIdAsync } from '../../redux/users/chosenUserSlice';


const TableComponent = forwardRef((props, ref) => {
	const { data, pageType } = props;
	const dispatch = useDispatch();
	const classes = useStyles();
	const type = useSelector(selectType);
	const chosenUser = useSelector(selectChosenUserData);
	const chosenCompany = useSelector(selectChosenCompany);
	// const tableRowsRefs = useRef([]);
	const almostLastRowRef = useRef(null);

	const chooseRow = (id) => {
		if (pageType === 'companies') {
			dispatch(chosenCompanyActions.getChosenCompanyAsync(id));
		} else if (pageType === 'authorsUsers' || pageType === 'salesUsers') {
			dispatch(getUserByIdAsync(id));
		}
	};

	const tableHeadText = (col, index) => {
		return (
			<StyledTableCell key={index}>
				<Typography
					style={{
						textTransform: 'capitalize',
						textAlign: col === 'status' || col === 'contract_status' ? 'center' : 'left',
					}}
				>
					{col.replaceAll('_', ' ')}
				</Typography>
			</StyledTableCell>
		);
	};


	useEffect(() => {
		if (data.length < 16) return;
		almostLastRowRef.current.scrollIntoView({ behavior: 'smooth' });
	}, [data]);

	return data.length ? (
		<Table stickyHeader className={classes.table}>
			<TableHead>
				<TableRow>
					{Object.keys(data[0]).map((col, index) => {
						if (type === 'client') {
							if (col !== 'id' && col !== 'members' && col !== 'logo' && col !== 'end_at') {
								return tableHeadText(col, index);
							}
						} else if (type === 'prospect') {
							if (
								col !== 'id' &&
								col !== 'members' &&
								col !== 'logo' &&
								col !== 'periodicity' &&
								col !== 'contract_status'
							) {
								return tableHeadText(col, index);
							}
						} else {
							if (
								col !== 'id' &&
								col !== 'members' &&
								col !== 'logo' &&
								col !== 'periodicity' &&
								col !== 'end_at'
							) {
								if (col === 'last_connected_at') {
									return tableHeadText('last_logs', index);
								} else {
									return tableHeadText(col, index);
								}
							}
						}
					})}
				</TableRow>
			</TableHead>
			<TableBody>
				{data.map((row, index) => (
					<StyledTableRow
						key={index}
						// ref={(el) => (tableRowsRefs.current[index] = el)}
						className={clsx(classes.tableRow, {
							[classes.selectedRow]:
								(chosenCompany && row.id === chosenCompany.id) ||
								(chosenUser && row.id === chosenUser.id),
						})}
						onClick={() => chooseRow(row.id)}
						{...(data.length === index + 1 && { ref: ref })}
						{...(index === data.length - 16 && { ref: almostLastRowRef })}
					>
						{Object.entries(row).map(([key, value], i) => {
							if (key !== 'id' && key !== 'members' && key !== 'logo') {
								if (key === 'start_at' || key === 'last_connected_at') {
									return (
										<StyledTableCell
											key={i}
											style={{ whiteSpace: 'nowrap' }}
											align="center"
										>
											{value ? (
												format(new Date(value), 'HH:mm dd MMM, yyyy')
											) : (
												<Typography>&#8211;</Typography>
											)}
										</StyledTableCell>
									);
								} else if (key === 'created_at') {
									return (
										<StyledTableCell
											key={i}
											style={{ whiteSpace: 'nowrap' }}
											align="center"
										>
											{value ? (
												format(new Date(value), 'dd MMM, yyyy')
											) : (
												<Typography>&#8211;</Typography>
											)}
										</StyledTableCell>
									);
								} else if (key === 'country') {
									return (
										<StyledTableCell key={i} style={{ whiteSpace: 'nowrap' }}>
											{value.name.length > 12
												? `${value.name.slice(0, 12)}...`
												: value.name}
										</StyledTableCell>
									);
								} else if (key === 'contract_status') {
									if (type !== 'prospect') {
										if (value) {
											return (
												<StyledTableCell key={i} align="center">
													{<GreenCheckmark className={classes.checkmark} />}
												</StyledTableCell>
											);
										} else {
											if (row.type === 'client') {
												return (
													<StyledTableCell key={i} align="center">
														{<RedCheckmark className={classes.checkmark} />}
													</StyledTableCell>
												);
											} else {
												return (
													<StyledTableCell key={i} align="center">
														<Typography>&#8211;</Typography>
													</StyledTableCell>
												);
											}
										}
									}
								} else if (key === 'status') {
									return (
										<StyledTableCell key={i} align="center">
											{
												<FiberManualRecordIcon
													style={{
														fill: value ? '#00CA80' : '#FF3939',
														fontSize: '14px',
													}}
												/>
											}
										</StyledTableCell>
									);
								} else if (key === 'periodicity') {
									return type === 'client' ? (
										<StyledTableCell key={i} style={{ textTransform: 'capitalize' }}>
											{row.contract_status ? value : <Typography>&#8211;</Typography>}
										</StyledTableCell>
									) : null;
								} else if (key === 'end_at') {
									return type === 'prospect' ? (
										<StyledTableCell key={i} style={{ whiteSpace: 'nowrap' }}>
											{format(new Date(value), 'HH:mm dd MMM, yyyy')}
										</StyledTableCell>
									) : null;
								} else if (key === 'email' || key === 'name') {
									return (
										<StyledTableCell key={i}>
											{value.length > 12 ? `${value.slice(0, 12)}...` : value}
										</StyledTableCell>
									);
								} else {
									return <StyledTableCell key={i}>{value}</StyledTableCell>;
								}
							}
						})}
					</StyledTableRow>
				))}
			</TableBody>
		</Table>
	) : null;
});

TableComponent.displayName = 'TableComponent';

export default TableComponent;
