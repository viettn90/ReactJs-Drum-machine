import React from 'react';
import ReactDOM from 'react-dom';
import DrumPad from './drumPad.js';
import App from '../App.js';

class PadBank extends React.Component {
    constructor(props) {
      super(props);
    }
    
    render() {
      let padBank;
      if (this.props.power) {
        padBank = this.props.currentPadBank.map((drumObj, i, padBankArr) => {
          return (
            <DrumPad
              clip={padBankArr[i].url}
              clipId={padBankArr[i].id}
              keyCode={padBankArr[i].keyCode}
              keyTrigger={padBankArr[i].keyTrigger}
              power={this.props.power}
              updateDisplay={this.props.updateDisplay}
              record={this.props.record}
              recordArray={this.props.recordArray}
            />
          );
        });
      } else {
        padBank = this.props.currentPadBank.map((drumObj, i, padBankArr) => {
          return (
            <DrumPad
              clip='#'
              clipId={padBankArr[i].id}
              keyCode={padBankArr[i].keyCode}
              keyTrigger={padBankArr[i].keyTrigger}
              power={this.props.power}
              updateDisplay={this.props.updateDisplay}
              record={this.props.record}
              recordArray={this.props.recordArray}
            />
          );
        });
      }
      return (
        <div>
          <div className='pad-bank'>{padBank}</div>
        </div>
        
      )
    }
};

export default PadBank
