import React, {Component} from 'react';
import styles from './App.css';
import {Tooltip, Legend, YAxis, XAxis, CartesianGrid, BarChart, Bar, LineChart, Line} from 'recharts';
import m from './m.js';

class Lab1 extends Component {

  componentWillMount() {
    this.initValues(this.props.experiment);
  }

  componentWillReceiveProps(nextProps) {
    this.initValues(nextProps.experiment)
  }

  initValues = (array = []) => {
    let data = [];
    const dataKey = 'value';
    array.forEach((item, i) => {
      let obj = {};
      obj[dataKey] = item;
      obj['name'] = `${i + 1}`;
      data.push(obj);
    });

    const newArray = m.getNewArray(array);
    let arrayResult = [];

    array.forEach((item, i) => {
      if(i === (array.length - 1)) return;
      arrayResult.push(m.countInInterval(newArray[i + 1], newArray[i], array));
    });

    let sr = (m.getArraySum(array) / array.length);
    let variances = m.getVariances(array);
    let allocationArray = [];
    allocationArray.push(0);
    arrayResult.forEach((item, i) => {
      let val = allocationArray[i] + item / array.length;
      allocationArray.push(m.awesomeRound(val));
    });
    let allocationObj = [];
    allocationArray.forEach((item, i) => {
      let obj = {};
      obj[dataKey] = item;
      obj['name'] = i;
      allocationObj.push(obj);
    });

    this.setState({
      dataKey,
      data,
      arrayResult,
      sr,
      variances,
      newArray,
      allocationObj
    });
  };

  render() {
    const {
      dataKey,
      data,
      arrayResult,
      sr,
      variances,
      newArray,
      allocationObj
    } = this.state;
    const { experiment } = this.props;
    return (
      <div>
        <div>
          <h2>Гистограмма</h2>
          <BarChart
            width={600}
            height={300}
            data={data}
            margin={{top: 20, right: 30, left: 20, bottom: 5}}
          >
            <XAxis dataKey="name"/>
            <YAxis/>
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip/>
            <Legend/>
            <Bar dataKey={dataKey} stackId="a" fill="#8884d8"/>
          </BarChart>
        </div>
        <div>
          <h2>Статистические характеристики случайной величины</h2>
          <div>
            <div>Выборочное среднее: {sr.toFixed(1)}</div>
            <div>Оценка дисперсии: {variances.toFixed(1)}</div>
          </div>
        </div>
        <div>
          <h2>Эмпирический закон случайной величины</h2>
          <div className={styles.awesomeBlock}>
            <div>
              <div>Границы интервалов</div>
              <div>Эмпирические частоты</div>
            </div>
            {arrayResult && arrayResult.length && arrayResult.map((item, i) => {
              return (
                <div key={i} className={styles.test}>
                  <div>{newArray[i].toFixed(2)} - {newArray[i + 1].toFixed(2)}</div>
                  <div>{`${item}/${experiment.length}`}</div>
                </div>)
            })}
          </div>
        </div>
        <div>
          <h2>Статистическая  функция распределения </h2>
          <LineChart
            width={600}
            height={300}
            data={allocationObj}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}
          >
            <XAxis dataKey="name"/>
            <YAxis/>
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip/>
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#82ca9d" />
          </LineChart>
        </div>
      </div>
    );
  };
}

// Lab1.PropTypes = {
//   experiment: React.PropTypes.array,
// };

export default Lab1;
