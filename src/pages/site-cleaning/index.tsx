import {Box} from '@mui/material';
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
      <Box>
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
        <Box>
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
          <TrainingSummaryTable {...trainingSummary} />
        </Box>
      </Box>
    </Layout>
  );
};

export default SiteCleaningPage;
