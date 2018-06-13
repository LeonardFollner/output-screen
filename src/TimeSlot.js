import React, {Component} from 'react';

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
                            <td key={roomNr} colSpan={1}
                                className={roomType.toLowerCase()}>
                                <h2>{event.title}</h2>
                                {event.details.map(detail => {
                                    return (
                                        <p key={detail}>{detail}</p>
                                    )
                                })}
                            </td>
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