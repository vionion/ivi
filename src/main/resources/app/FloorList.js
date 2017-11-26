import React from 'react';
import styles from './FloorList.css';
import {ELEVATOR_STATE} from "./enums";

export class FloorList extends React.Component {
    render() {
        const onClick = (floor) => () => this.props.onChange(floor);

        let floorButtons = [];
        for (let i = this.props.minFloor; i <= this.props.maxFloor; i++) {
            let classes = styles.floorButton;
            if (i === this.props.targetFloor && this.props.state !== ELEVATOR_STATE.STANDING_STILL) {
                classes = classes + " " + styles.selected;
            }
            if ((i + 1 + this.props.minFloor) === this.props.maxFloor / 2) {
                floorButtons.push(<br/>)
            }
            floorButtons.push(<button onClick={onClick(i)} className={classes} type="button"
                                      key={i}>{i === 0 ? 'K' : i}</button>);
        }
        return <div className={styles.center}>{floorButtons}</div>;
    }
}
