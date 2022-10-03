import {TableContainer, TableHead, TableCell, TableRow} from '@mui/material';
import * as React from 'react';
import {TrainingStatus, TrainingSummary} from '../../../types/site-cleaning';

const TrainingSummaryTable = ({
  moveTo,
  status,
  consumedFuel,
  credit,
}: TrainingSummary) => {
  if (status === TrainingStatus.STANDBY) {
    return <p>Please upload sitemap to start the training</p>;
  }
  return (
    <TableContainer>
      <TableHead>
        <TableCell>Item</TableCell>
        <TableCell>Value</TableCell>
      </TableHead>
      <TableRow key={'move-to'}>
        <TableCell>Next Direction</TableCell>
        <TableCell>{moveTo}</TableCell>
      </TableRow>
      <TableRow key={'fuel'}>
        <TableCell>Fuel Consumption</TableCell>
        <TableCell>{consumedFuel}</TableCell>
      </TableRow>
      <TableRow key={'credit'}>
        <TableCell>Credit</TableCell>
        <TableCell>
          {credit ? credit : 'credit will display when the training done'}
        </TableCell>
      </TableRow>
    </TableContainer>
  );
};

export default TrainingSummaryTable;
