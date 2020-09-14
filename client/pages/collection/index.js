import { useEffect, useState } from 'react';
import axios from 'axios';
const keys = require('../../config/keys');

import { LocationBar } from '../../components/location-bar';
import { BoxBar } from '../../components/box-bar';
import { BoxIssueList } from '../../components/box-list';

const LocationIndex = ({ currentUser, locations }) => {
  const [selectedLocation, setLocation] = useState(locations[0]);
  const [selectedBoxes, setBoxes] = useState(selectedLocation.boxes);
  const [selectedBox, setBox] = useState(selectedBoxes[0]);
  const [issues, setIssues] = useState([]);

  const handleLocationChange = (location) => {
    setIssues([]);
    setLocation(location);
    setBoxes(location.boxes);
    setBox(location.boxes[0]);
    getIssues();
  };

  const handleBoxChange = (box) => {
    setIssues([]);
    setBox(box);
    getIssues();
  };

  const getIssues = async () => {
    const { data } = await axios.get(
      `${keys.redirectDomain}api/user/collection/${selectedLocation.name}/${selectedBox.name}`
    );
    setIssues(data.items);
  };

  useEffect(async () => {
    const getIssues = async () => {
      const { data } = await axios.get(
        `${keys.redirectDomain}api/user/collection/${selectedLocation.name}/${selectedBox.name}`
      );
      setIssues(data.items);
    };

    await getIssues();
  }, []);

  return (
    <div>
      <div>
        <h1>Locations</h1>
        <LocationBar
          Locations={locations}
          UpdateLocation={handleLocationChange}
          ActiveLocation={selectedLocation}
        ></LocationBar>
      </div>
      <div>
        <h1>Boxes</h1>
        <BoxBar
          Boxes={selectedBoxes}
          UpdateBox={handleBoxChange}
          ActiveBox={selectedBox}
        ></BoxBar>
      </div>
      <div>
        <h1>Issues</h1>
        <BoxIssueList Issues={issues}></BoxIssueList>
      </div>
    </div>
  );
};
LocationIndex.getInitialProps = async (context, client, currentUser) => {
  const { data } = await client.get(`api/user/collection`);

  const locations = data.locations;

  return { locations };
};

export default LocationIndex;
