import {Box} from '@mui/material';
import {useState, useEffect} from 'react';
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

const initSummary: TrainingSummary = {
  userInput: [],
  status: TrainingStatus.STANDBY,
  consumedFuel: 0,
  credit: 0,
  moveTo: Directions.East,
};

const SiteCleaningPage = () => {
  const [matrix, setMatrix] = useState([] as CellType[][]);
  const [trainingSummary, setTrainingSummary] = useState(initSummary);
  useEffect(() => {
    console.log(trainingSummary);
  }, [trainingSummary]);
  return (
    <Layout>
      <Box>
        <SitemapReader
          successCallback={setMatrix}
          onErrorCallback={(message: string) => console.error(message)}
          validFileTypes={['.txt']}
        />
        <Box>
          <SitemapGrid
            matrix={matrix}
            onKeyDown={(summary: TrainingSummary) => {
              setTrainingSummary({...summary});
              if (summary.status === TrainingStatus.QUIT) {
                console.log(summary);
              }
            }}
          />
          <p>{trainingSummary.moveTo}</p>
          <TrainingSummaryTable {...trainingSummary} />
        </Box>
      </Box>
    </Layout>
  );
};

export default SiteCleaningPage;
