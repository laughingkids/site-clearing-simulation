import {Grid, Stack} from '@mui/material';
import {useState} from 'react';
import {Layout} from '../../components/common';
import {SitemapReader} from '../../components/site-cleaning';
import SitemapGrid from '../../components/site-cleaning/sitemap-grid';
import {
  CellType,
  Directions,
  TrainingStatus,
  TrainingSummary,
} from '../../types/site-cleaning';
import TrainingSummaryTable from '../../components/site-cleaning/training-summary-table';
import TrainingCommandTable from '../../components/site-cleaning/training-summary-table/traing-commands';

export const initSummary: TrainingSummary = {
  userInput: [],
  status: TrainingStatus.STANDBY,
  consumedFuel: 0,
  credit: 0,
  moveTo: Directions.East,
};

const SiteCleaningPage = () => {
  const [matrix, setMatrix] = useState([] as CellType[][]);
  const [trainingSummary, setTrainingSummary] = useState(initSummary);

  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <SitemapReader
            successCallback={matrix => {
              console.log(matrix);
              setMatrix(matrix);
              setTrainingSummary({
                ...trainingSummary,
                status: TrainingStatus.PROGRESSING,
              });
            }}
            onErrorCallback={(message: string) => console.error(message)}
            validFileTypes={['.txt']}
          />
        </Grid>
        <Grid item xs={12}>
          <SitemapGrid
            matrix={matrix}
            onKeyDown={({status, ...summary}: TrainingSummary) => {
              setTrainingSummary({
                status,
                ...summary,
              });
              if (status === TrainingStatus.QUIT) {
                console.log({
                  status,
                  ...summary,
                });
              }
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <TrainingSummaryTable {...trainingSummary} />
        </Grid>
        <Grid item xs={8}>
          <TrainingCommandTable {...trainingSummary} />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default SiteCleaningPage;
