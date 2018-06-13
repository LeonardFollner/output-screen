import React, {Component} from 'react';

class Event extends Component {
    render() {
        return (
            <td key={this.props.roomNr} colSpan={1}
                className={this.props.type}>
                <h2>{this.props.event.title}</h2>
                {this.props.event.details.map(detail => {
                    return (
                        <p key={detail}>{detail}</p>
                    )
                })}
            </td>
        );
    }
}

export default Event;