import dynamic from 'next/dynamic';

const StockPredictionChart = dynamic(
  () => import('./StockPredictionChart'),
  { ssr: false }
);

export default StockPredictionChart;
