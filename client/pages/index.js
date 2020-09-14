import { useState } from 'react';
import Link from 'next/link';
import { TextField } from '@material-ui/core';
import { FilterBar } from '../components/filter-bar';
import { IssueList } from '../components/issue-list';
import axios from 'axios';
const keys = require('../../config/keys');

const LandingPage = ({ currentUser, issues, publishers, dateSearch }) => {
  const [activeFilters, setActiveFilter] = useState([]);
  const [searchDate, setDateSearch] = useState(dateSearch);
  const [currentIssues, setIssues] = useState(issues);
  const [currentPublishers, setPublishers] = useState(publishers);

  const updateActiveFilter = (filterList) => {
    setActiveFilter([...filterList]);
  };

  const onDateChange = async (date) => {
    console.log(date);
    const { data } = await axios.get(
      `${keys.redirectDomain}api/catalog/issue?date=${date}`
    );
    console.log(currentUser);
    setIssues(data.issues);
    setActiveFilter([]);
    setPublishers(publishers);
  };

  return (
    <div>
      <div>
        <TextField
          id="date"
          label=""
          type="date"
          // defaultValue="2020-05-27"
          defaultValue={searchDate}
          className="date-picker"
          onChange={(e) => onDateChange(e.target.value)}
          InputLabelProps={{
            shrink: 'true',
          }}
        />
        <h1>Publishers</h1>
        <FilterBar
          Filters={currentPublishers}
          UpdateActiveFilter={updateActiveFilter}
          ActiveFilters={activeFilters}
        ></FilterBar>
      </div>
      <div>
        <h1>Issues</h1>
        <IssueList
          Issues={currentIssues}
          ActiveFilters={activeFilters}
        ></IssueList>
      </div>
    </div>
  );
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
  const dateSearch = '2020-05-25';
  const { data } = await client.get(`api/catalog/issue?date=${dateSearch}`);
  console.log(currentUser);
  return { issues: data.issues, publishers: data.publishers, dateSearch };
};

export default LandingPage;
