var React = require('react');

var Clock = require('Clock');
var CountdownForm = require('CountdownForm');
var Controls = require('Controls');

var Countdown = React.createClass({
    getInitialState: function() {
        return {
            count: 0,
            countdownStatus: 'stopped'
        };
    },
    handleSetCountdown: function(seconds) {
        this.setState({
            count: seconds,
            countdownStatus: 'started'
        });
    },
    handleStatusChange: function(newStatus) {
        this.setState({
            countdownStatus: newStatus
        });
    },
    startTimer: function() {
        this.timer = setInterval(() => {
            var newCount = --this.state.count;
            this.setState({
                count: newCount >= 0 ? newCount : 0
            });
        }, 1000);
    },
    componentDidUpdate: function(prevProps, prevState) {
        if (this.state.count === 0 && this.state.countdownStatus !== 'stopped') {
            this.setState({
                countdownStatus: 'stopped'
            });
        }
        if (this.state.countdownStatus !== prevState.countdownStatus) {
            switch(this.state.countdownStatus) {
                case 'started':
                    this.startTimer();
                    break;
                case 'stopped':
                    this.setState({
                        count: 0
                    });
                case 'paused':
                    clearInterval(this.timer);
                    this.timer = undefined;
                    break;
                
            }
        }
    },
    render: function() {
        var {count, countdownStatus} = this.state;

        var renderControlArea = () => {
            if(countdownStatus !== 'stopped') {
                return <Controls countdownStatus={countdownStatus} onStatusChange={this.handleStatusChange}/>
            } else {
                return <CountdownForm onSetCountdown={this.handleSetCountdown}/> 
            }
        };

        return (
            <div>
                <Clock totalSeconds={count}/>
                {renderControlArea()}
            </div>
        );
    }
});

module.exports = Countdown;