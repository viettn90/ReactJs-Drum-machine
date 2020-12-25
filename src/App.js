import React from 'react';
import ReactDOM from 'react-dom';
// import logo from './logo.svg';
import './App.css';
import DrumPad from './component/drumPad';
import PadBank from './component/padBank';

const projectName = 'drum-machine';

const bankOne = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];

const bankTwo = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Chord-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Chord-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Chord-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Shaker',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: 'Punchy-Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Side-Stick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Snare',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
  }
];


const nullRecordArray = [81, 87, 69, 65, 83, 68, 90, 88, 67];




class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      power: true,
      record: false,
      play: false,
      display: String.fromCharCode(160),
      currentPadBank: bankOne,
      currentPadBankId: 'Heater Kit',
      sliderVal: 0.3,
      recordArray: [],
    };
    this.displayClipName = this.displayClipName.bind(this);
    this.selectBank = this.selectBank.bind(this);
    this.adjustVolume = this.adjustVolume.bind(this);
    this.powerControl = this.powerControl.bind(this);
    this.clearDisplay = this.clearDisplay.bind(this);
    this.recordControl = this.recordControl.bind(this);
    this.playControl = this.playControl.bind(this);
  }
  powerControl() {
    this.setState({
      power: !this.state.power,
      display: String.fromCharCode(160)
    });
  }
  
  recordControl() {
    if (this.state.power && !this.state.play) {
      //this.setState({ play: false });
      if (!this.state.record) {
        // Start Recording
        this.state.recordArray.length = 0; // purge array contents
        this.setState({ record: true });
        document.getElementById("btn-record");
        
      }
      else {
        this.setState({ record: false });
        document.getElementById("btn-record");
      }
    }
  }

  playControl() {
    if (this.state.power && !this.state.record && !this.state.play) {
        // Start Playing Recording
        this.setState({ play: true });
        document.getElementById("btn-play");
        var arr = (this.state.recordArray.length > 0 ? this.state.recordArray : nullRecordArray);
        arr.forEach(function(key, index){
          setTimeout(function(){
            fireKeyboardEvent('keydown', key);
          }, 500 * index );    
        });
        setTimeout(() => {
          this.setState({ play: false });
          document.getElementById("btn-play")
        }, 500 * arr.length);
      }
  }

  selectBank() {
    if (this.state.power) {
      if (this.state.currentPadBankId === 'Heater Kit') {
        this.setState({
          currentPadBank: bankTwo,
          display: 'Smooth Piano Kit',
          currentPadBankId: 'Smooth Piano Kit'
        });
      } else {
        this.setState({
          currentPadBank: bankOne,
          display: 'Heater Kit',
          currentPadBankId: 'Heater Kit'
        });
      }
    }
  }
  displayClipName(name) {
    if (this.state.power) {
      this.setState({
        display: name
      });
    }
  }
  adjustVolume(e) {
    if (this.state.power) {
      this.setState({
        sliderVal: e.target.value,
        display: 'Volume: ' + Math.round(e.target.value * 100)
      });
      setTimeout(() => this.clearDisplay(), 1000);
    }
  }
  clearDisplay() {
    this.setState({
      display: String.fromCharCode(160)
    });
  }
  render() {
    const powerSlider = this.state.power
      ? {
          float: 'right'
        }
      : {
          float: 'left'
        };
    const recordSlider = this.state.record
      ? {
          float: 'right'
        }
      : {
          float: 'left'
        };
    const playSlider = this.state.play
      ? {
          float: 'right'
        }
      : {
          float: 'left'
        };
    const bankSlider =
      this.state.currentPadBank === bankOne
        ? {
            float: 'left'
          }
        : {
            float: 'right'
          };
    {
      const clips = [].slice.call(document.getElementsByClassName('clip'));
      clips.forEach(sound => {
        sound.volume = this.state.sliderVal;
      });
    }
    return (
      <div className='inner-container' id='drum-machine'>
        <PadBank
          clipVolume={this.state.sliderVal}
          currentPadBank={this.state.currentPadBank}
          power={this.state.power}
          updateDisplay={this.displayClipName}
          play={this.state.play}
          record={this.state.record}
          recordArray={this.state.recordArray}
        />

        <div className='logo'>
          <div className='inner-logo '>{'FCC' + String.fromCharCode(160)}</div>
          <i className='inner-logo fa fa-free-code-camp' />
        </div>

        <div className='controls-container'>
          <div className='control'>
            <div className='btn-container'>
              <p>Power</p>
              <div className='select' onClick={this.powerControl}>
                <div className='power-record-play' style={powerSlider} />
              </div>
              <p>Record</p>
              <div className='select' id='btn-record' onClick={this.recordControl}>
                <div className='power-record-play' style={recordSlider} />
              </div>
              <p>Play</p>
              <div className='select' id='btn-play' onClick={this.playControl}>
                <div className='power-record-play' style={playSlider} />
              </div>
            </div>
            
          </div>
          <p id='display'>{this.state.display}</p>
          <div className='volume-slider'>
            <input
              max='1'
              min='0'
              onChange={this.adjustVolume}
              step='0.01'
              type='range'
              value={this.state.sliderVal}
            />
          </div>
          <div className='control'>
            <p>Bank</p>
            <div className='select' onClick={this.selectBank}>
              <div className='inner' style={bankSlider} />
            </div>
          </div>
          <DrumPad 
            record={this.state.record}
            recordArray={this.state.recordArray}
          />
        </div>
      </div>
    )
  }
}

function fireKeyboardEvent(event, keycode) {
  console.log('in fireKeyboardEvent=' + keycode);
    var keyboardEvent = document.createEventObject ?
        document.createEventObject() : document.createEvent("Events");

    if(keyboardEvent.initEvent) {
        keyboardEvent.initEvent(event, true, true);
    }

    keyboardEvent.keyCode = keycode;
    keyboardEvent.which = keycode;

    document.dispatchEvent ? document.dispatchEvent(keyboardEvent) 
                           : document.fireEvent(event, keyboardEvent);
  }
  
export default App
