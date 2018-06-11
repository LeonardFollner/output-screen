import React, {Component} from 'react';
import './App.css';
import events from './data/events';

class App extends Component {
    render() {
        const date = new Date();
        const currentHour = date.getHours();
        const currentMinute = date.getMinutes();

        return (
            <div>
                <header>
                    <h1>OUTPUT Aktuell</h1>
                    <div>{currentHour}:{currentMinute}</div>
                </header>
                <main>
                    <table>
                        <thead>
                        <tr>
                            <td/>
                            {Object.keys(events.rooms).map(room => {
                                return <td key={room}>{room}</td>
                            })}
                        </tr>
                        </thead>
                        <tbody>
                        {events.timeslots.map((time, timeIndex) => {
                                const eventHour = parseInt(time.split(':')[0]);

                                if (currentHour + 2 >= eventHour) {

                                    const nextTimeSlot = events.timeslots[timeIndex + 1];
                                    let nextHour;

                                    let nextMinute;
                                    if (nextTimeSlot) {
                                        nextHour = parseInt(nextTimeSlot.split(':')[0]);
                                        nextMinute = parseInt(nextTimeSlot.split(':')[1]);

                                    }

                                    if (nextMinute && nextHour && // current hour and next event in current hour has started
                                        eventHour === currentHour &&
                                        nextHour === currentHour &&
                                        nextMinute <= currentMinute
                                    ) {
                                        return <td/>
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
                                                    const event = events.rooms[roomNr].events[time];
                                                    if (event) {
                                                        return (
                                                            <td key={roomNr} colSpan={1}>
                                                                <h2>{event.title}</h2>
                                                                {event.details.map(detail => {
                                                                    return (
                                                                        <p key={detail}>{detail}</p>
                                                                    )
                                                                })}
                                                            </td>
                                                        )
                                                    }
                                                })}
                                            </tr>
                                        )
                                    }
                                }
                            }
                        )}
                        <tr>
                            <td>18:00</td>
                            <td colSpan={Object.keys(events.rooms).length}>
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
