import React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import Grid from '@mui/material/Grid';
import Helmet from 'react-helmet';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import Carousel from 'react-material-ui-carousel';

import useStyles, {Tab, TabPanel,TabsList} from './GeneralHome.style';

const GeneralHomeView = (props) => {
	const classes = useStyles();
	const renderDay = (day) => {
		const dates = day.getDate();
		const dateStyle = {
			color: '#000',
			fontSize: 20,
		};
		const cellStyle = {
			width: 38,
		};

		return (
			<div style={cellStyle}>
				<div style={dateStyle}>{dates}</div>
				{props.events2.includes(dates) ? (
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
							marginTop: '4px',
						}}
					>
						<div
							style={{
								background: '#1c67ff',
							}}
							className="circle"
						></div>
					</div>
				) : (
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
							marginTop: '4px',
						}}
					>
						<div
							style={{
								background: '#ACB1BF',
							}}
							className="circle"
						></div>
					</div>
				)}
			</div>
		);
	};

	return (
		<main style={{ padding: '1% 15% 1% 15%' }} className={classes.mainWrapper}>
			<Grid container spacing={2}>
				<Grid item xs={5}>
					<section className={classes.carousel}>
						<div className={classes.header}>Featured</div>
						<Carousel
							style={{ display: 'flex' }}
							navButtonsProps={{
								style: {
									backgroundColor: '#B8C3D8',
									borderRadius: '30px',
								},
							}}
							indicatorIconButtonProps={{
								style: {
									color: '#E2EBFC',
								},
							}}
							activeIndicatorIconButtonProps={{
								style: {
									color: '#1C67FF',
								},
							}}
						>
							<div className={classes.carouselContect}>
								Churchill Capital: GCP/SGO FP - Discussion with GCP Applied Temporarily
							</div>
							<div className={classes.carouselContect}>
								Lorem Ipsum has been the industry-s standard dummy text ever since the 1500s,
								w
							</div>
							<div className={classes.carouselContect}>
								Examples might be simplified to improve reading and learning. Tutorials,
								references, and exampleTutorials, references, and avoid
							</div>
						</Carousel>
					</section>
				</Grid>
				<Grid item xs={7}>
					<section
						style={{
							borderRadius: '8px',
							backgroundColor: '#fff',
							border: '2px solid #EDEEF1',
							padding: '10px',
						}}
					>
						<div className={classes.header}>Most Clicked Ideas</div>
						<div className={classes.horizontalScrollWrapper}>
							<section className={classes.mostClickedIdeasWrapper}>
								<div style={{ marginRight: '15px' }}>
									<div className={classes.mostClickedIdeasTitle}>idea</div>
									<div className={classes.mostClickedIdeasContent}>SJR/B CN | RCI/B CN</div>
								</div>
								<div>
									<div className={classes.mostClickedIdeasTitle}>Strategy</div>
									<div
										className={classes.mostClickedIdeasTitle}
										style={{ fontSize: '1.2rem' }}
									>
										Merger
									</div>
								</div>
							</section>
							<section className={classes.mostClickedIdeasWrapper}>
								<div style={{ marginRight: '15px' }}>
									<div className={classes.mostClickedIdeasTitle}>idea</div>
									<div className={classes.mostClickedIdeasContent}>SJR/B CN | RCI/B CN</div>
								</div>
								<div>
									<div className={classes.mostClickedIdeasTitle}>Strategy</div>
									<div
										className={classes.mostClickedIdeasTitle}
										style={{ fontSize: '1.2rem' }}
									>
										Merger
									</div>
								</div>
							</section>
							<section className={classes.mostClickedIdeasWrapper}>
								<div style={{ marginRight: '15px' }}>
									<div className={classes.mostClickedIdeasTitle}>idea</div>
									<div className={classes.mostClickedIdeasContent}>SJR/B CN | RCI/B CN</div>
								</div>
								<div>
									<div className={classes.mostClickedIdeasTitle}>Strategy</div>
									<div
										className={classes.mostClickedIdeasTitle}
										style={{ fontSize: '1.2rem' }}
									>
										Merger
									</div>
								</div>
							</section>
						</div>
					</section>
				</Grid>
				<Grid item xs={3.5}>
					<section className={classes.lastPublications}>
						<div
							style={{
								fontWeight: 700,
								marginBottom: '10px',
							}}
						>
							Last Publications
						</div>
						<TabsUnstyled defaultValue={0}>
							<TabsList>
								<Tab>Asia-Pacific</Tab>
								<Tab>Europe</Tab>
								<Tab>United-States</Tab>
							</TabsList>
							<TabPanel value={0}>
								<section className={classes.lastPublicationsWrapper}>
									<div
										style={{
											display: 'flex',
											flexDirection: 'row',
											justifyContent: 'space-between',
										}}
									>
										<div className={classes.lastPublicationsTitle}>Churchill Capital</div>
										<div className={classes.lastPublicationsTitle}>02/28/2022</div>
									</div>
									<div>
										<div className={classes.lastPublicationsContent}>
											Asia Weekly Wrap of finance news...
										</div>
									</div>
								</section>
								<section className={classes.lastPublicationsWrapper}>
									<div
										style={{
											display: 'flex',
											flexDirection: 'row',
											justifyContent: 'space-between',
										}}
									>
										<div className={classes.lastPublicationsTitle}>Churchill Capital</div>
										<div className={classes.lastPublicationsTitle}>02/28/2022</div>
									</div>
									<div>
										<div className={classes.lastPublicationsContent}>
											Asia Weekly Wrap of finance news...
										</div>
									</div>
								</section>
								<section className={classes.lastPublicationsWrapper}>
									<div
										style={{
											display: 'flex',
											flexDirection: 'row',
											justifyContent: 'space-between',
										}}
									>
										<div className={classes.lastPublicationsTitle}>Churchill Capital</div>
										<div className={classes.lastPublicationsTitle}>02/28/2022</div>
									</div>
									<div>
										<div className={classes.lastPublicationsContent}>
											Asia Weekly Wrap of finance news...
										</div>
									</div>
								</section>
							</TabPanel>
							<TabPanel value={1}>Second content</TabPanel>
							<TabPanel value={2}>Third content</TabPanel>
						</TabsUnstyled>
					</section>
					<section className={classes.latestNews}>
						<div className={classes.header}>Latest News</div>
						<div className={classes.latestNewsScroll}>
							<section className={classes.latestNewsWrapper}>
								<div
									style={{
										display: 'flex',
										flexDirection: 'row',
										justifyContent: 'space-between',
									}}
								>
									<div className={classes.latestNewsHeader}>127 HK</div>
									<div className={classes.latestNewsHeader}>02/28/2022</div>
								</div>
								<div>
									<div className={classes.latestNewsContent}>
										Chinese Estates to record losses from the...
									</div>
								</div>
							</section>
							<section className={classes.latestNewsWrapper}>
								<div
									style={{
										display: 'flex',
										flexDirection: 'row',
										justifyContent: 'space-between',
									}}
								>
									<div className={classes.latestNewsHeader}>127 HK</div>
									<div className={classes.latestNewsHeader}>02/28/2022</div>
								</div>
								<div>
									<div className={classes.latestNewsContent}>
										Chinese Estates to record losses from the...
									</div>
								</div>
							</section>
							<section className={classes.latestNewsWrapper}>
								<div
									style={{
										display: 'flex',
										flexDirection: 'row',
										justifyContent: 'space-between',
									}}
								>
									<div className={classes.latestNewsHeader}>127 HK</div>
									<div className={classes.latestNewsHeader}>02/28/2022</div>
								</div>
								<div>
									<div className={classes.latestNewsContent}>
										Chinese Estates to record losses from the...
									</div>
								</div>
							</section>
							<section className={classes.latestNewsWrapper}>
								<div
									style={{
										display: 'flex',
										flexDirection: 'row',
										justifyContent: 'space-between',
									}}
								>
									<div className={classes.latestNewsHeader}>127 HK</div>
									<div className={classes.latestNewsHeader}>02/28/2022</div>
								</div>
								<div>
									<div className={classes.latestNewsContent}>
										Chinese Estates to record losses from the...
									</div>
								</div>
							</section>
						</div>
					</section>
					<section className={classes.morningNotes}>
						<div className={classes.header} style={{ marginBottom: '10px' }}>
							Morning Notes
						</div>
						<TabsUnstyled defaultValue={0}>
							<TabsList>
								<Tab>Asia-Pacific</Tab>
								<Tab>Europe</Tab>
								<Tab>United-States</Tab>
							</TabsList>
							<TabPanel value={0}>
								<div className={classes.morningNotesScroll}>
									<section className={classes.morningNotesWrapper}>
										<div
											style={{
												display: 'flex',
												flexDirection: 'row',
												justifyContent: 'space-between',
												padding: '5px',
											}}
										>
											<div className={classes.morningNotesContent}>
												Morning Note Asia-Pacific
											</div>
											<div className={classes.morningNotesDate}>02/28/2022</div>
										</div>
									</section>
									<section className={classes.morningNotesWrapper}>
										<div
											style={{
												display: 'flex',
												flexDirection: 'row',
												justifyContent: 'space-between',
												padding: '5px',
											}}
										>
											<div className={classes.morningNotesContent}>
												Morning Note Asia-Pacific
											</div>
											<div className={classes.morningNotesDate}>02/28/2022</div>
										</div>
									</section>
									<section className={classes.morningNotesWrapper}>
										<div
											style={{
												display: 'flex',
												flexDirection: 'row',
												justifyContent: 'space-between',
												padding: '5px',
											}}
										>
											<div className={classes.morningNotesContent}>
												Morning Note Asia-Pacific
											</div>
											<div className={classes.morningNotesDate}>02/28/2022</div>
										</div>
									</section>
									<section className={classes.morningNotesWrapper}>
										<div
											style={{
												display: 'flex',
												flexDirection: 'row',
												justifyContent: 'space-between',
												padding: '5px',
											}}
										>
											<div className={classes.morningNotesContent}>
												Morning Note Asia-Pacific
											</div>
											<div className={classes.morningNotesDate}>02/28/2022</div>
										</div>
									</section>
									<section className={classes.morningNotesWrapper}>
										<div
											style={{
												display: 'flex',
												flexDirection: 'row',
												justifyContent: 'space-between',
												padding: '5px',
											}}
										>
											<div className={classes.morningNotesContent}>
												Morning Note Asia-Pacific
											</div>
											<div className={classes.morningNotesDate}>02/28/2022</div>
										</div>
									</section>
									<section className={classes.morningNotesWrapper}>
										<div
											style={{
												display: 'flex',
												flexDirection: 'row',
												justifyContent: 'space-between',
												padding: '5px',
											}}
										>
											<div className={classes.morningNotesContent}>
												Morning Note Asia-Pacific
											</div>
											<div className={classes.morningNotesDate}>02/28/2022</div>
										</div>
									</section>
									<section className={classes.morningNotesWrapper}>
										<div
											style={{
												display: 'flex',
												flexDirection: 'row',
												justifyContent: 'space-between',
												padding: '5px',
											}}
										>
											<div className={classes.morningNotesContent}>
												Morning Note Asia-Pacific
											</div>
											<div className={classes.morningNotesDate}>02/28/2022</div>
										</div>
									</section>
									<section className={classes.morningNotesWrapper}>
										<div
											style={{
												display: 'flex',
												flexDirection: 'row',
												justifyContent: 'space-between',
												padding: '5px',
											}}
										>
											<div className={classes.morningNotesContent}>
												Morning Note Asia-Pacific
											</div>
											<div className={classes.morningNotesDate}>02/28/2022</div>
										</div>
									</section>
									<section className={classes.morningNotesWrapper}>
										<div
											style={{
												display: 'flex',
												flexDirection: 'row',
												justifyContent: 'space-between',
												padding: '5px',
											}}
										>
											<div className={classes.morningNotesContent}>
												Morning Note Asia-Pacific
											</div>
											<div className={classes.morningNotesDate}>02/28/2022</div>
										</div>
									</section>
								</div>
							</TabPanel>
							<TabPanel value={1}>Second content</TabPanel>
							<TabPanel value={2}>Third content</TabPanel>
						</TabsUnstyled>
					</section>
				</Grid>
				<Grid item xs={5}>
					<section className={classes.industryRecoursed}>
						<div className={classes.header}>Industry Recoursed</div>
						<section className={classes.industryRecoursedWrapper}>
							<div
								style={{
									display: 'flex',
									flexDirection: 'row',
									justifyContent: 'space-between',
								}}
							>
								<Stack direction="row" spacing={1}>
									<Chip
										style={{
											backgroundColor: '#E2EBFC',
											color: '#1C67FF',
											fontWeight: '600',
											fontSize: '.85rem',
										}}
										label="GCP US"
									/>
									<Chip
										style={{
											backgroundColor: '#E2EBFC',
											color: '#1C67FF',
											fontWeight: '600',
											fontSize: '.85rem',
										}}
										label="SGO FP"
									/>
								</Stack>
								<div className={classes.industryRecoursedDate}>02/28/2022</div>
							</div>
							<div>
								<div className={classes.industryRecoursedContent}>
									Churchill Capital:&nbsp;
									<span style={{ fontWeight: 'bold' }}>
										GCP/SGO FP - Discussion with GCP Applied Te...
									</span>
								</div>
							</div>
						</section>
						<section className={classes.industryRecoursedWrapper}>
							<div
								style={{
									display: 'flex',
									flexDirection: 'row',
									justifyContent: 'space-between',
								}}
							>
								<Stack direction="row" spacing={1}>
									<Chip
										style={{
											backgroundColor: '#E2EBFC',
											color: '#1C67FF',
											fontWeight: '600',
											fontSize: '.85rem',
										}}
										label="GCP US"
									/>
									<Chip
										style={{
											backgroundColor: '#E2EBFC',
											color: '#1C67FF',
											fontWeight: '600',
											fontSize: '.85rem',
										}}
										label="SGO FP"
									/>
								</Stack>
								<div className={classes.industryRecoursedDate}>02/28/2022</div>
							</div>
							<div>
								<div className={classes.industryRecoursedContent}>
									Churchill Capital:&nbsp;
									<span style={{ fontWeight: 'bold' }}>
										GCP/SGO FP - Discussion with GCP Applied Te...
									</span>
								</div>
							</div>
						</section>
						<section className={classes.industryRecoursedWrapper}>
							<div
								style={{
									display: 'flex',
									flexDirection: 'row',
									justifyContent: 'space-between',
								}}
							>
								<Stack direction="row" spacing={1}>
									<Chip
										style={{
											backgroundColor: '#E2EBFC',
											color: '#1C67FF',
											fontWeight: '600',
											fontSize: '.85rem',
										}}
										label="GCP US"
									/>
									<Chip
										style={{
											backgroundColor: '#E2EBFC',
											color: '#1C67FF',
											fontWeight: '600',
											fontSize: '.85rem',
										}}
										label="SGO FP"
									/>
								</Stack>
								<div className={classes.industryRecoursedDate}>02/28/2022</div>
							</div>
							<div>
								<div className={classes.industryRecoursedContent}>
									Churchill Capital:&nbsp;
									<span style={{ fontWeight: 'bold' }}>
										GCP/SGO FP - Discussion with GCP Applied Te...
									</span>
								</div>
							</div>
						</section>
						<section className={classes.industryRecoursedWrapper}>
							<div
								style={{
									display: 'flex',
									flexDirection: 'row',
									justifyContent: 'space-between',
								}}
							>
								<Stack direction="row" spacing={1}>
									<Chip
										style={{
											backgroundColor: '#E2EBFC',
											color: '#1C67FF',
											fontWeight: '600',
											fontSize: '.85rem',
										}}
										label="GCP US"
									/>
									<Chip
										style={{
											backgroundColor: '#E2EBFC',
											color: '#1C67FF',
											fontWeight: '600',
											fontSize: '.85rem',
										}}
										label="SGO FP"
									/>
								</Stack>
								<div className={classes.industryRecoursedDate}>02/28/2022</div>
							</div>
							<div>
								<div className={classes.industryRecoursedContent}>
									Churchill Capital:&nbsp;
									<span style={{ fontWeight: 'bold' }}>
										GCP/SGO FP - Discussion with GCP Applied Te...
									</span>
								</div>
							</div>
						</section>
						<section className={classes.industryRecoursedWrapper}>
							<div
								style={{
									display: 'flex',
									flexDirection: 'row',
									justifyContent: 'space-between',
								}}
							>
								<Stack direction="row" spacing={1}>
									<Chip
										style={{
											backgroundColor: '#E2EBFC',
											color: '#1C67FF',
											fontWeight: '600',
											fontSize: '.85rem',
										}}
										label="GCP US"
									/>
									<Chip
										style={{
											backgroundColor: '#E2EBFC',
											color: '#1C67FF',
											fontWeight: '600',
											fontSize: '.85rem',
										}}
										label="SGO FP"
									/>
								</Stack>
								<div className={classes.industryRecoursedDate}>02/28/2022</div>
							</div>
							<div>
								<div className={classes.industryRecoursedContent}>
									Churchill Capital:&nbsp;
									<span style={{ fontWeight: 'bold' }}>
										GCP/SGO FP - Discussion with GCP Applied Te...
									</span>
								</div>
							</div>
						</section>
					</section>
					<section className={classes.focusIdeas}>
						<div className={classes.header}>Focus Ideas</div>
						<div className={classes.focusIdeasScroll}>
							<section className={classes.focusIdeasWrapper}>
								<div
									style={{
										display: 'flex',
										flexDirection: 'row',
										justifyContent: 'space-between',
									}}
								>
									<Stack direction="row" spacing={1}>
										<Chip
											style={{
												backgroundColor: '#B8C3D8',
												color: '#3E3E3E',
												fontWeight: '600',
												fontSize: '.85rem',
											}}
											label="PVG CN"
										/>
										<Chip
											style={{
												backgroundColor: '#B8C3D8',
												color: '#3E3E3E',
												fontWeight: '600',
												fontSize: '.85rem',
											}}
											label="NCM CN"
										/>
									</Stack>
									<div className={classes.focusIdeasDate}>02/28/2022</div>
								</div>
								<div>
									<div className={classes.focusIdeasContent}>
										PRETIUM RECOURSES INC |&nbsp;
										<span style={{ color: '#000' }}>NEWCREST MINING LTD</span>
									</div>
								</div>
							</section>
							<section className={classes.focusIdeasWrapper}>
								<div
									style={{
										display: 'flex',
										flexDirection: 'row',
										justifyContent: 'space-between',
									}}
								>
									<Stack direction="row" spacing={1}>
										<Chip
											style={{
												backgroundColor: '#B8C3D8',
												color: '#3E3E3E',
												fontWeight: '600',
												fontSize: '.85rem',
											}}
											label="PVG CN"
										/>
										<Chip
											style={{
												backgroundColor: '#B8C3D8',
												color: '#3E3E3E',
												fontWeight: '600',
												fontSize: '.85rem',
											}}
											label="NCM CN"
										/>
									</Stack>
									<div className={classes.focusIdeasDate}>02/28/2022</div>
								</div>
								<div>
									<div className={classes.focusIdeasContent}>
										PRETIUM RECOURSES INC |&nbsp;
										<span style={{ color: '#000' }}>NEWCREST MINING LTD</span>
									</div>
								</div>
							</section>
							<section className={classes.focusIdeasWrapper}>
								<div
									style={{
										display: 'flex',
										flexDirection: 'row',
										justifyContent: 'space-between',
									}}
								>
									<Stack direction="row" spacing={1}>
										<Chip
											style={{
												backgroundColor: '#B8C3D8',
												color: '#3E3E3E',
												fontWeight: '600',
												fontSize: '.85rem',
											}}
											label="PVG CN"
										/>
										<Chip
											style={{
												backgroundColor: '#B8C3D8',
												color: '#3E3E3E',
												fontWeight: '600',
												fontSize: '.85rem',
											}}
											label="NCM CN"
										/>
									</Stack>
									<div className={classes.focusIdeasDate}>02/28/2022</div>
								</div>
								<div>
									<div className={classes.focusIdeasContent}>
										PRETIUM RECOURSES INC |&nbsp;
										<span style={{ color: '#000' }}>NEWCREST MINING LTD</span>
									</div>
								</div>
							</section>
							<section className={classes.focusIdeasWrapper}>
								<div
									style={{
										display: 'flex',
										flexDirection: 'row',
										justifyContent: 'space-between',
									}}
								>
									<Stack direction="row" spacing={1}>
										<Chip
											style={{
												backgroundColor: '#B8C3D8',
												color: '#3E3E3E',
												fontWeight: '600',
												fontSize: '.85rem',
											}}
											label="PVG CN"
										/>
										<Chip
											style={{
												backgroundColor: '#B8C3D8',
												color: '#3E3E3E',
												fontWeight: '600',
												fontSize: '.85rem',
											}}
											label="NCM CN"
										/>
									</Stack>
									<div className={classes.focusIdeasDate}>02/28/2022</div>
								</div>
								<div>
									<div className={classes.focusIdeasContent}>
										PRETIUM RECOURSES INC |&nbsp;
										<span style={{ color: '#000' }}>NEWCREST MINING LTD</span>
									</div>
								</div>
							</section>
							<section className={classes.focusIdeasWrapper}>
								<div
									style={{
										display: 'flex',
										flexDirection: 'row',
										justifyContent: 'space-between',
									}}
								>
									<Stack direction="row" spacing={1}>
										<Chip
											style={{
												backgroundColor: '#B8C3D8',
												color: '#3E3E3E',
												fontWeight: '600',
												fontSize: '.85rem',
											}}
											label="PVG CN"
										/>
										<Chip
											style={{
												backgroundColor: '#B8C3D8',
												color: '#3E3E3E',
												fontWeight: '600',
												fontSize: '.85rem',
											}}
											label="NCM CN"
										/>
									</Stack>
									<div className={classes.focusIdeasDate}>02/28/2022</div>
								</div>
								<div>
									<div className={classes.focusIdeasContent}>
										PRETIUM RECOURSES INC |&nbsp;
										<span style={{ color: '#000' }}>NEWCREST MINING LTD</span>
									</div>
								</div>
							</section>
							<section className={classes.focusIdeasWrapper}>
								<div
									style={{
										display: 'flex',
										flexDirection: 'row',
										justifyContent: 'space-between',
									}}
								>
									<Stack direction="row" spacing={1}>
										<Chip
											style={{
												backgroundColor: '#B8C3D8',
												color: '#3E3E3E',
												fontWeight: '600',
												fontSize: '.85rem',
											}}
											label="PVG CN"
										/>
										<Chip
											style={{
												backgroundColor: '#B8C3D8',
												color: '#3E3E3E',
												fontWeight: '600',
												fontSize: '.85rem',
											}}
											label="NCM CN"
										/>
									</Stack>
									<div className={classes.focusIdeasDate}>02/28/2022</div>
								</div>
								<div>
									<div className={classes.focusIdeasContent}>
										PRETIUM RECOURSES INC |&nbsp;
										<span style={{ color: '#000' }}>NEWCREST MINING LTD</span>
									</div>
								</div>
							</section>
							<section className={classes.focusIdeasWrapper}>
								<div
									style={{
										display: 'flex',
										flexDirection: 'row',
										justifyContent: 'space-between',
									}}
								>
									<Stack direction="row" spacing={1}>
										<Chip
											style={{
												backgroundColor: '#B8C3D8',
												color: '#3E3E3E',
												fontWeight: '600',
												fontSize: '.85rem',
											}}
											label="PVG CN"
										/>
										<Chip
											style={{
												backgroundColor: '#B8C3D8',
												color: '#3E3E3E',
												fontWeight: '600',
												fontSize: '.85rem',
											}}
											label="NCM CN"
										/>
									</Stack>
									<div className={classes.focusIdeasDate}>02/28/2022</div>
								</div>
								<div>
									<div className={classes.focusIdeasContent}>
										PRETIUM RECOURSES INC |&nbsp;
										<span style={{ color: '#000' }}>NEWCREST MINING LTD</span>
									</div>
								</div>
							</section>
							<section className={classes.focusIdeasWrapper}>
								<div
									style={{
										display: 'flex',
										flexDirection: 'row',
										justifyContent: 'space-between',
									}}
								>
									<Stack direction="row" spacing={1}>
										<Chip
											style={{
												backgroundColor: '#B8C3D8',
												color: '#3E3E3E',
												fontWeight: '600',
												fontSize: '.85rem',
											}}
											label="PVG CN"
										/>
										<Chip
											style={{
												backgroundColor: '#B8C3D8',
												color: '#3E3E3E',
												fontWeight: '600',
												fontSize: '.85rem',
											}}
											label="NCM CN"
										/>
									</Stack>
									<div className={classes.focusIdeasDate}>02/28/2022</div>
								</div>
								<div>
									<div className={classes.focusIdeasContent}>
										PRETIUM RECOURSES INC |&nbsp;
										<span style={{ color: '#000' }}>NEWCREST MINING LTD</span>
									</div>
								</div>
							</section>
							<section className={classes.focusIdeasWrapper}>
								<div
									style={{
										display: 'flex',
										flexDirection: 'row',
										justifyContent: 'space-between',
									}}
								>
									<Stack direction="row" spacing={1}>
										<Chip
											style={{
												backgroundColor: '#B8C3D8',
												color: '#3E3E3E',
												fontWeight: '600',
												fontSize: '.85rem',
											}}
											label="PVG CN"
										/>
										<Chip
											style={{
												backgroundColor: '#B8C3D8',
												color: '#3E3E3E',
												fontWeight: '600',
												fontSize: '.85rem',
											}}
											label="NCM CN"
										/>
									</Stack>
									<div className={classes.focusIdeasDate}>02/28/2022</div>
								</div>
								<div>
									<div className={classes.focusIdeasContent}>
										PRETIUM RECOURSES INC |&nbsp;
										<span style={{ color: '#000' }}>NEWCREST MINING LTD</span>
									</div>
								</div>
							</section>
							<section className={classes.focusIdeasWrapper}>
								<div
									style={{
										display: 'flex',
										flexDirection: 'row',
										justifyContent: 'space-between',
									}}
								>
									<Stack direction="row" spacing={1}>
										<Chip
											style={{
												backgroundColor: '#B8C3D8',
												color: '#3E3E3E',
												fontWeight: '600',
												fontSize: '.85rem',
											}}
											label="PVG CN"
										/>
										<Chip
											style={{
												backgroundColor: '#B8C3D8',
												color: '#3E3E3E',
												fontWeight: '600',
												fontSize: '.85rem',
											}}
											label="NCM CN"
										/>
									</Stack>
									<div className={classes.focusIdeasDate}>02/28/2022</div>
								</div>
								<div>
									<div className={classes.focusIdeasContent}>
										PRETIUM RECOURSES INC |&nbsp;
										<span style={{ color: '#000' }}>NEWCREST MINING LTD</span>
									</div>
								</div>
							</section>
						</div>
					</section>
				</Grid>
				<Grid item xs={3.5}>
					<section className={classes.events}>
						<div
							style={{
								fontWeight: 700,
								marginBottom: '10px',
							}}
						>
							Events
						</div>
						<TabsUnstyled defaultValue={0}>
							<TabsList>
								<Tab>Upcoming</Tab>
								<Tab>Marked</Tab>
							</TabsList>
							<TabPanel value={0}>
								<div>
									<Helmet>
										<style>{`
                      .DayPicker {
                        display: block;
                        overflow-x: scroll;
                      }
                      .DayPicker::-webkit-scrollbar-track {
                          border-radius: 10px;
                          background-color: #F3F4F8;
                      }
                      .DayPicker::-webkit-scrollbar {
                          border-radius: 10px;
                          height: 7px;
                          z-index: 2;
                          background-color: #F5F5F5
                      }
                      .DayPicker::-webkit-scrollbar-thumb {
                          border-radius: 10px;
                          background-color: #D5DBE7;
                      }
                      .DayPicker-Day--today {
                        font-weight: 400;
                        background-color: #E2EBFC;
                        border-radius: 5px;
                      }
                      .DayPicker-Day:hover {
                        border: '3px solid red';
                      }
                      .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside):hover {
                        background-color: white;
                        font-weight: bold;
                      }
                      .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside) {
                        font-weight: bold;
                        background-color: white;
                      }
                      .DayPicker-Month {
                        margin: 0;
                        margin-top: 20px;
                      }
                      .DayPicker-wrapper {
                        padding-bottom: 0;
                      }
                      .DayPicker-Months {
                        display: table;
                        width: 100%;
                        table-layout: fixed;
                      }
                      .DayPicker-NavButton {
                        margin-top: 8px;
                      },
                      .DayPicker-Weekdays {
                        margin-top: 0;
                      }
                  `}</style>
									</Helmet>
									<DayPicker
										renderDay={renderDay}
										selectedDays={props.selectedDay}
										onDayClick={props.setSelectedDay}
									/>
								</div>
								<section className={classes.eventsWrapper}>
									<div className={classes.eventsInnerWrapper}>
										<div
											style={{
												backgroundColor: '#ED5858',
											}}
											className={classes.eventsLabel}
										></div>
										<div className={classes.eventsContentWrapper}>
											<div className={classes.eventsInnerContentWrapper}>
												<div className={classes.eventsHeader}>ARNA US</div>
												<div style={{ color: '#868DA2' }}>02/28/2022</div>
											</div>
											<div className={classes.eventsInnerContentWrapper}>
												<div
													style={{
														color: '#0F0F0F',
														fontSize: '.9rem',
														fontWeight: '600',
													}}
													className={classes.eventsContent}
												>
													PFE at JPM presentation
												</div>
												<div
													style={{
														color: '#ED5858',
														fontSize: '.9rem',
														fontWeight: '600',
													}}
												>
													Today
												</div>
											</div>
										</div>
									</div>
									<div className={classes.eventsInnerWrapper}>
										<div
											style={{
												backgroundColor: '#FAC100',
											}}
											className={classes.eventsLabel}
										></div>
										<div className={classes.eventsContentWrapper}>
											<div className={classes.eventsInnerContentWrapper}>
												<div className={classes.eventsHeader}>ARNA US</div>
												<div style={{ color: '#868DA2' }}>02/28/2022</div>
											</div>
											<div className={classes.eventsInnerContentWrapper}>
												<div
													style={{
														color: '#0F0F0F',
														fontSize: '.9rem',
														fontWeight: '600',
													}}
													className={classes.eventsContent}
												>
													PFE at JPM presentation
												</div>
												<div
													style={{
														color: '#B8C3D8',
														fontSize: '.9rem',
														fontWeight: '600',
													}}
												>
													Tomorrow
												</div>
											</div>
										</div>
									</div>
									<div className={classes.eventsInnerWrapper}>
										<div
											style={{ backgroundColor: '#00CA80' }}
											className={classes.eventsLabel}
										></div>
										<div className={classes.eventsContentWrapper}>
											<div className={classes.eventsInnerContentWrapper}>
												<div className={classes.eventsHeader}>ARNA US</div>
												<div style={{ color: '#868DA2' }}>02/28/2022</div>
											</div>
											<div className={classes.eventsInnerContentWrapper}>
												<div
													style={{
														color: '#0F0F0F',
														fontSize: '.9rem',
														fontWeight: '600',
													}}
													className={classes.eventsContent}
												>
													PFE at JPM presentation
												</div>
												<div
													style={{
														color: '#B8C3D8',
														fontSize: '.9rem',
														fontWeight: '600',
													}}
												>
													2D
												</div>
											</div>
										</div>
									</div>
								</section>
							</TabPanel>
							<TabPanel value={1}>Second content</TabPanel>
						</TabsUnstyled>
					</section>
				</Grid>
			</Grid>
		</main>
	);
};

GeneralHomeView.displayName = 'MemberHomeView';
GeneralHomeView.defaultProps = {};

export default React.memo(GeneralHomeView);
