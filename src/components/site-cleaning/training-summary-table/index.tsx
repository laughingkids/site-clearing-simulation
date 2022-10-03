import * as React from 'react';
import {TrainingStatus, TrainingSummary} from '../../../types/site-cleaning';

const TrainingSummaryTable = ({moveTo, status}: TrainingSummary) => {
  if (status === TrainingStatus.STANDBY) {
    return <p>Training is not start yet</p>;
  }
  return <>{moveTo}</>;
};

export default TrainingSummaryTable;
