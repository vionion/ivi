import React from 'react';
import {render} from 'react-dom';
import {MicrophoneRecorder} from "./MicrophoneRecorder";
import {FloorIndicator} from "./FloorIndicator";
import {ELEVATOR_STATE} from "./enums";
import styles from './index.css';
import {FloorList} from "./FloorList";


class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentFloor: 1,
            targetFloor: 1,
            state: ELEVATOR_STATE.STANDING_STILL
        };

        setInterval(this.moveElevator, 1000);
    }

    moveElevator = () => {
        if (this.state.currentFloor !== this.state.targetFloor) {
            let goingUp = this.state.targetFloor - this.state.currentFloor > 0;
            let nextFloor = goingUp ? this.state.currentFloor + 1 : this.state.currentFloor - 1;
            this.setState({
                currentFloor: nextFloor,
                state: goingUp ? ELEVATOR_STATE.MOVING_UP : ELEVATOR_STATE.MOVING_DOWN
            });
        } else {
            this.setState({
                state: ELEVATOR_STATE.STANDING_STILL
            });
        }
    };

    moveToFloor = (floor) => {
        let goingUp = floor - this.state.currentFloor > 0;
        this.setState({
            targetFloor: floor,
            state: goingUp ? ELEVATOR_STATE.MOVING_UP : ELEVATOR_STATE.MOVING_DOWN
        });
    };

    render() {
        return (
            <div className={styles.center}>
                <div className={styles.centerInside}>
                    <img src="https://i.imgur.com/VVtCp1i.png"/>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/KONE.svg/1200px-KONE.svg.png"/>
                </div>
                <FloorIndicator floor={this.state.currentFloor} state={this.state.state}/>
                <FloorList minFloor={-1} maxFloor={8} targetFloor={this.state.targetFloor} state={this.state.state}
                           onChange={this.moveToFloor}/>
                <MicrophoneRecorder onChange={this.moveToFloor}/>
            </div>
        );
    }
}

render(<App/>, document.getElementById('app'));
