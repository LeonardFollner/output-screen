import React, {Component} from 'react';
import './App.css';
import events from './data/events';
import logo from './logo.svg';
import TimeSlot from './TimeSlot';

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
                    <p>get . connected</p>
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
                            const nextTimeSlot = events.timeslots[timeIndex + 1];

                            let nextHour;
                            let nextMinute;

                            if (nextTimeSlot) {
                                nextHour = parseInt(nextTimeSlot.split(':')[0]);
                                nextMinute = parseInt(nextTimeSlot.split(':')[1]);

                                if (
                                    nextMinute && nextHour && // current hour and next event in current hour has started
                                    eventHour === currentHour &&
                                    nextHour === currentHour &&
                                    nextMinute <= currentMinute
                                ) {
                                    return "";
                                }
                            }
                            if (eventHour >= currentHour
                                || nextHour > currentHour || (nextHour === currentHour && nextMinute > currentMinute)) {
                                /* const numberOfEventsAtThisTime = Object.values(events.rooms).reduce((eventCounter, room) => {
                                    Object.keys(room.events).forEach((event) => {
                                        if (event === time) {
                                            eventCounter++;
                                        }
                                    });
                                    return eventCounter;
                                }, 0); */

                                return (
                                    <TimeSlot time={time} rooms={events.rooms}/>
                                )
                            }
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
