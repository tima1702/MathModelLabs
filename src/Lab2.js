import React, {Component} from 'react';
import m from './m.js';

class Lab2 extends Component {

  componentWillMount() {
    this.initValues(this.props.experiment);
  }

  componentWillReceiveProps(nextProps) {
    this.initValues(nextProps.experiment)
  }

  initValues = (array = []) => {
    const asymmetryCoef = m.getAsymmetryCoef(array);
    const excess = m.getExcess(array)
    this.setState({asymmetryCoef, excess});
  };

  render() {
    const {
      asymmetryCoef,
      excess
    } = this.state;
    return (
      <div>
        <h2>Закон распределения случайной величины.</h2>
        <div>
          <div>Коэффициента асимметрии: {asymmetryCoef}</div>
          <div>Эксцесса : {excess}</div>
          <h4>Вывод:</h4>
          <p>Теоретический нормальный закон {!(asymmetryCoef === excess === 0) && 'не'} выполняется</p>
        </div>
      </div>
    );
  };
}


export default Lab2;
