import React, {Component} from 'react';
import Event from "./Event";

class TimeSlot extends Component {
    render() {
        return (
            <tr key={this.props.time}>
                <td>{this.props.time}</td>
                {Object.keys(this.props.rooms).map(roomNr => {
                    const roomType = this.props.rooms[roomNr].type;
                    const event = this.props.rooms[roomNr].events[this.props.time];
                    if (event) {
                        return (
                            <Event roomNr={roomNr} type={event.type ? event.type.toLowerCase() : roomType.toLowerCase()}
                                   event={event}/>
                        )
                    } else {
                        return <td key={roomNr}/>
                    }
                })}
            </tr>
        );
    }
}

export default TimeSlot;