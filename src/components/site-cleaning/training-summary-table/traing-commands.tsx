import {TableContainer, TableHead, TableCell, TableRow} from '@mui/material';
import * as React from 'react';
import {
  TrainingStatus,
  TrainingSummary,
  ValidKey,
  ValidKeysList,
} from '../../../types/site-cleaning';
import {getTrainingCommand} from './utilities';

const TrainingCommandTable = ({userInput, status}: TrainingSummary) => {
  if (status === TrainingStatus.STANDBY) {
    return <></>;
  }
  return (
    <>
      <TableContainer>
        <TableHead>
          <TableCell>Command</TableCell>
          <TableCell>Count</TableCell>
        </TableHead>
        {ValidKeysList.map((key: ValidKey) => (
          <TableRow key={`${key}`}>
            <TableCell>{getTrainingCommand(key)}</TableCell>
            <TableCell>
              {
                userInput.filter(input => {
                  if (input === 'q') {
                    return input.toUpperCase() === key;
                  }
                  return input === key;
                }).length
              }
            </TableCell>
          </TableRow>
        ))}
        <TableRow>
          <TableCell>User Input</TableCell>
          <TableCell>{userInput.join(' | ')}</TableCell>
        </TableRow>
      </TableContainer>
    </>
  );
};

export default TrainingCommandTable;
