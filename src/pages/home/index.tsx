import {
  Stack,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import * as React from 'react';
import {Layout} from '../../components/common';

type FuelUsage = {activity: string; fuel: number};
const fuelUsage: FuelUsage[] = [
  {activity: 'Clearing plain land', fuel: 1},
  {activity: 'Visiting and land that has already been cleared', fuel: 1},
  {activity: 'Clearing rocky land', fuel: 2},
  {activity: 'Clearing land containing a tree', fuel: 2},
];
type Credit = {item: string; cost: string};
const credits: Credit[] = [
  {item: 'Fuel', cost: '1 credit per fuel unit'},
  {item: 'Uncleared square at end of simulation', cost: '3 credits per square'},
];

const HomePage = () => {
  return (
    <Layout>
      <Stack direction="row" spacing={2}>
        <TableContainer>
          <TableHead>
            <TableCell>Activity</TableCell>
            <TableCell>Fuel Usage</TableCell>
          </TableHead>
          {fuelUsage.map(({activity, fuel}: FuelUsage) => (
            <TableRow>
              <TableCell>{activity}</TableCell>
              <TableCell>{fuel}</TableCell>
            </TableRow>
          ))}
        </TableContainer>
        <TableContainer>
          <TableHead>
            <TableCell>Item</TableCell>
            <TableCell>Cost</TableCell>
          </TableHead>
          {credits.map(({item, cost}: Credit) => (
            <TableRow>
              <TableCell>{item}</TableCell>
              <TableCell>{cost}</TableCell>
            </TableRow>
          ))}
        </TableContainer>
      </Stack>
    </Layout>
  );
};

export default HomePage;
