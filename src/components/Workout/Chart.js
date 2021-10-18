import WeightChart from './WeightChart';
import HourChart from './HourChart';
import MainHeader from '../../shared/Navigation/MainHeader';
import classes from './HourChart.module.css';

const Chart = () => {
  return (
    <div className={classes.container}>
      <MainHeader />
      <div className={classes.hour__container}>
        <div className={classes.chart__title}>
          <h1>운동시간</h1>
        </div>
        <div className={classes.chart__content}>
          <HourChart />
        </div>
      </div>
      <div className={classes.weight__container}>
        <div className={classes.chart__title}>
          <h1>몸무게</h1>
        </div>
        <div className={classes.chart__content}>
          <WeightChart />
        </div>
      </div>
    </div>
  );
};

export default Chart;
