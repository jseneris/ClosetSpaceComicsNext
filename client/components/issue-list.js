import React from 'react';
import Link from 'next/link';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 250,
    display: 'inline-block',
  },
  issueList: {
    textAlign: 'center',
  },
  issue: {
    cursor: 'pointer',
    '& img': {
      height: '300px',
      display: 'block',
    },
  },
}));

export const IssueList = (props) => {
  const classes = useStyles();

  const imageList = () => {
    let filteredList = props.Issues.slice();
    if (props.ActiveFilters.length > 0) {
      filteredList = filteredList.filter((issue) => {
        let indexOf = props.ActiveFilters.indexOf(issue.title.publisher);
        return indexOf > -1;
      });
    }

    return filteredList.map((issue) => {
      return (
        <Link
          href="/catalog/[publisher]/[title]/[issue]"
          as={`/catalog/${issue.title.publisher.seoFriendlyName}/${issue.title.seoFriendlyName}/${issue.seoFriendlyName}`}
        >
          <Card className={classes.root}>
            <CardContent>
              <div className={classes.issue}>
                <img
                  src={issue.imageUrl}
                  title={issue.title.name}
                  alt={issue.title.name}
                ></img>
                <span>{issue.title.name}</span>
              </div>
            </CardContent>
          </Card>
        </Link>
      );
    });
  };

  return <div className={classes.issueList}>{imageList()}</div>;
};
