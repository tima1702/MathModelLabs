import React, {Component} from 'react';
import m from './m.js';
import styles from './App.css';
import Lab1 from './Lab1.js'
import Lab2 from './Lab2.js'
import Lab3 from './Lab3.js'

class App extends Component {
  constructor() {
    super();
    this.state = {
      experiment:  m.getRandomArray(1, 10, 10)
    };
  }

  setNewValues = () => {
   this.setState({
     experiment:  m.getRandomArray(1, 10, 10)
   });
  };

  render() {
    const {
      experiment
    } = this.state;
    console.log('m.getAsymmetryCoef(experiment)', m.getAsymmetryCoef(experiment));
    console.log('m.getExcess(experiment)', m.getExcess(experiment));
    return (
      <div>
        <h2>Сгенерировать новые значения</h2>
        <button onClick={() => this.setNewValues()}>Сгенировать</button>
        <div>
          <h2>Выборочные данные случайной величины</h2>
          <div className={styles.awesomeBlock}>
            <div>
              <div>Номер опыта</div>
              <div>Наблюдаемые значения</div>
            </div>
            {experiment && experiment.length && experiment.map((item, i) => {
              return (
                <div key={`block ${i}`}>
                  <div>Опыт: {i + 1}</div>
                  <div>{item}</div>
                </div>)
            })}
          </div>
        </div>
        <Lab1 experiment={experiment}/>
        <Lab2 experiment={experiment}/>
        <Lab3 experiment={experiment}/>
      </div>
    );
  };
}

export default App;
