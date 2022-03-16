import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import TabContext from '@material-ui/lab/TabContext';
import PublicationsTab from '../PublicationsTab/PublicationsTab';
import TabPanel from '../TabPanel/TabPanel';
import Grid from '@material-ui/core/Grid';
import { AddButton } from '../../../../../styles/MainStyles';
import AddIcon from '@material-ui/icons/Add';
import AuthorsNewArticleModal from '../../AuthorsNewArticleModal/AuthorsNewArticleModal';

import useStyles from './AllPublicationsTabs.style';

function a11yProps(index) {
	return {
		'id': `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}
const AllPublicationsTabsView = (props) => {
	const classes = useStyles();
  const publishedResearches = props.publications.filter((research) => research.status === 'published');
	const draftResearches = props.publications.filter((research) => research.status === 'draft');

  return (
    <div className={classes.root}>
			<TabContext value={props.value.toString()}>
				<Grid item xs={12}>
					<Grid container className={classes.barWrapper}>
						<Grid item xs={4}>
							<Tabs
								value={props.value}
								onChange={props.handleChange}
								className={classes.tabs}
								aria-label="tabs"
							>
								<Tab label="Published" {...a11yProps(0)} className={classes.tab} />
								<Tab label="Drafts" {...a11yProps(1)} className={classes.tab} />
							</Tabs>
						</Grid>
						<Grid item xs={1}>
							<AddButton className={classes.newBtn} onClick={() => props.handleOpenNewPublication()}>
								<AddIcon />
								New
							</AddButton>
						</Grid>
					</Grid>
					{props.publications.length ? (
						<Grid container>
							<TabPanel value={props.value} index={0} className={classes.tabPanel}>
								{publishedResearches.length ? (
									publishedResearches.map((pub, idx) => {
										return (
											<PublicationsTab
												key={`${pub.title}${idx}`}
												publication={pub}
												fetchPublications={props.fetchPublications}
												fetchStatistics={props.fetchStatistics}
											/>
										);
									})
								) : (
									<Typography className={classes.noPublications}>
										No published publications yet
									</Typography>
								)}
							</TabPanel>

							<TabPanel value={props.value} index={1} className={classes.tabPanel}>
								{draftResearches.length ? (
									draftResearches.map((pub, idx) => {
										return (
											<PublicationsTab
												key={`${pub.title}${idx}`}
												publication={pub}
												fetchPublications={props.fetchPublications}
												fetchStatistics={props.fetchStatistics}
											/>
										);
									})
								) : (
									<Typography className={classes.noPublications}>No drafts yet</Typography>
								)}
							</TabPanel>
						</Grid>
					) : (
						<Typography className={classes.noPublications}>No publications yet</Typography>
					)}
				</Grid>
				<AuthorsNewArticleModal handleClose={props.handleCloseNewPublication} open={props.openNewPublication} />
			</TabContext>
		</div>
  );
};

AllPublicationsTabsView.displayName = 'AllPublicationsTabsView';
AllPublicationsTabsView.defaultProps = {};

export default React.memo(AllPublicationsTabsView);
