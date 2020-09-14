import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  issue: {
    height: '100px',
    display: 'inline-block',
    listStyle: 'none',
  },
  issueImg: {
    height: '100%',
    width: 'auto',
  },
  rootlist: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
}));

const IssueShow = ({ currentUser, issue, titleList }) => {
  const classes = useStyles();

  const renderContent = () => {
    return titleList.map((iss) => {
      return (
        <GridListTile className={classes.issue} key={issue.id}>
          <Link
            href="/catalog/[publisher]/[title]/[issue]"
            as={`/catalog/${issue.title.publisher.seoFriendlyName}/${issue.title.seoFriendlyName}/${iss.seoFriendlyName}`}
          >
            <img
              className={classes.issueImg}
              src={iss.imageUrl}
              alt={iss.seoFriendlyName}
            ></img>
          </Link>
        </GridListTile>
      );
    });
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <h2>{`${issue.title.name} #${issue.seoFriendlyName} (${issue.title.publisher.name})`}</h2>
      </Grid>
      <Grid item xs={6}>
        <img src={issue.imageUrl} alt={issue.title.name} />
      </Grid>
      <Grid item xs={6}>
        <div>{issue.description}</div>
      </Grid>
      <Grid item xs={12}>
        <div className={classes.rootlist}>
          <GridList className={classes.gridList} cols={16}>
            {renderContent()}
          </GridList>
        </div>
      </Grid>
    </Grid>
  );
};

IssueShow.getInitialProps = async (context, client, currentUser) => {
  const { publisher, title, issue } = context.query;
  console.log(currentUser);

  const { data } = await client.get(
    `api/catalog/${publisher}/${title}/${issue}`
  );

  return { issue: data.issue, titleList: data.titleList };
};

export default IssueShow;
