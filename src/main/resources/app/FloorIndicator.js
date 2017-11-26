import React from 'react';
import styles from './FloorIndicator.css';
import {ELEVATOR_STATE} from "./enums";

export class FloorIndicator extends React.Component {
    render() {
        return (
            <div className={styles.center + " " + styles.floorIndicator}>
                <span className={styles.textFloor}>{this.props.floor === 0 ? 'K' : this.props.floor}</span>
                {this.props.state !== ELEVATOR_STATE.STANDING_STILL &&
                    <span className={styles.textDirection + " " + (this.props.state === ELEVATOR_STATE.MOVING_UP ? styles.rotatedUp : styles.rotatedDown)}>{"➤"}</span>
                }
            </div>
        );
    }
}
