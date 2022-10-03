import {
  TableContainer,
  TableHead,
  TableCell,
  TableRow,
  Box,
} from '@mui/material';
import * as React from 'react';
import {TrainingStatus, TrainingSummary} from '../../../types/site-cleaning';
import {getTrainingCommand} from './utilities';

const TrainingSummaryTable = ({
  moveTo,
  status,
  consumedFuel,
  credit,
  userInput,
}: TrainingSummary) => {
  if (status === TrainingStatus.STANDBY) {
    return <p>Please upload sitemap to start the training</p>;
  }
  return (
    <Box>
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
      <TableContainer>
        <TableRow>
          <TableCell>Keyboard Key</TableCell>
          <TableCell>Command</TableCell>
        </TableRow>
        {userInput.map((key, index) => (
          <TableRow key={`${key}-${index}`}>
            <TableCell>{key}</TableCell>
            <TableCell>{getTrainingCommand(key)}</TableCell>
          </TableRow>
        ))}
      </TableContainer>
    </Box>
  );
};

export default TrainingSummaryTable;
