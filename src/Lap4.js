import React, {Component} from 'react';
import m from './m.js';
import styles from './App.css';


class Lab4 extends Component {

  componentWillMount() {
    this.initValues(this.props.experiment);
  }

  componentWillReceiveProps(nextProps) {
    this.initValues(nextProps.experiment)
  }

  initValues = (array = []) => {
    const arrayResult = m.getNewArray(array);
    const hitRandArray = m.getHitArray(arrayResult);
    this.setState({arrayResult, hitRandArray});
  };

  render() {
    const {
      arrayResult,
      hitRandArray,
    } = this.state;
    return (
      <div>
        <h2>Теоретические частоты попадания случайной величины в интервалы.</h2>
        <div className={styles.awesomeBlock}>
          <div>
            <div>Границы интервалов</div>
            <div>Теоретические Частоты</div>
          </div>
          {hitRandArray && hitRandArray.length && hitRandArray.map((item, i) => {
            return (
              <div key={i}>
                <div>{arrayResult[i].toFixed(2)} - {arrayResult[i + 1].toFixed(2)}</div>
                <div>{hitRandArray[i].toFixed(2)}</div>
              </div>)
          })}
        </div>
      </div>
    );
  };
}


export default Lab4;
