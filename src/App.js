import React, {Component} from 'react';
import './App.css';
import events from './data/events';
import logo from './logo.svg';

class App extends Component {
    constructor(props) {
        window.setInterval(() => {
            this.forceUpdate();
        }, 60 * 1000);

        super(props);
    }

    render() {
        const date = new Date();
        const currentHour = date.getHours();
        const currentMinute = date.getMinutes();

        return (
            <div>
                <header>
                    <div className="clock">{
                        ("0" + currentHour).slice(-2) + ":" +
                        ("0" + currentMinute).slice(-2)}
                    </div>
                    <p>get connected</p>
                    <div>
                        <img src={logo} className="logo"/>
                    </div>
                </header>
                <main>
                    <table>
                        <thead>
                        <tr>
                            <td/>
                            {Object.keys(events.rooms).map(room => {
                                return <td key={room}
                                           className={"roomNr roomNr--" + events.rooms[room].type.toLowerCase()}>{room}</td>
                            })}
                        </tr>
                        </thead>
                        <tbody>
                        {events.timeslots.map((time, timeIndex) => {
                                const eventHour = parseInt(time.split(':')[0]);

                            // if (currentHour + 2 >= eventHour) {

                            const nextTimeSlot = events.timeslots[timeIndex + 1];

                            if (nextTimeSlot) {
                                const nextHour = parseInt(nextTimeSlot.split(':')[0]);
                                const nextMinute = parseInt(nextTimeSlot.split(':')[1]);

                                if (
                                    // current hour and next event in current hour has started
                                    eventHour === currentHour &&
                                    nextHour === currentHour &&
                                    nextMinute <= currentMinute
                                ) {
                                    return ""
                                }
                            }
                            if (eventHour >= currentHour) {
                                /* const numberOfEventsAtThisTime = Object.values(events.rooms).reduce((eventCounter, room) => {
                                    Object.keys(room.events).forEach((event) => {
                                        if (event === time) {
                                            eventCounter++;
                                        }
                                    });
                                    return eventCounter;
                                }, 0); */

                                return (
                                    <tr key={time}>
                                        <td>{time}</td>
                                        {Object.keys(events.rooms).map(roomNr => {
                                            const roomType = events.rooms[roomNr].type;
                                            const event = events.rooms[roomNr].events[time];
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
                                )
                            }
                            //}
                            }
                        )}
                        <tr>
                            <td>18:00</td>
                            <td colSpan={Object.keys(events.rooms).length} className="live">
                                <h2>Abendveranstaltung – OUTPUT Lounge</h2>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </main>
            </div>
        );
    }
}

export default App;
