import WeightChart from './WeightChart';
import HourChart from './HourChart';
import MainHeader from '../../shared/Navigation/MainHeader';
import classes from './HourChart.module.css';
import Wrapper from '../../shared/UIElement/Wrapper';

const Chart = () => {
  return (
    <Wrapper className={classes.container} id={classes.chart}>
      <MainHeader />
      <div className={classes.hour__container}>
        <div className={classes.chart__title}>
          <h1>Time of workout</h1>
        </div>
        <div className={classes.chart__content}>
          <HourChart />
        </div>
      </div>
      <div className={classes.weight__container}>
        <div className={classes.chart__title}>
          <h1>Weight</h1>
        </div>
        <div className={classes.chart__content}>
          <WeightChart />
        </div>
      </div>
    </Wrapper>
  );
};

export default Chart;
