class Timer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            time: props.time,
            work: props.work,
            newWork: 1,
        };
    }

    (prevProps, prevState) {

        if (this.props.work !== prevProps.work) {
            this.updateProps();
            console.log('update'+this.props.work);
        }
        console.log('no update'+this.props.time+prevProps.time);
    }

    updateProps = () => {
        this.setState({
            time: this.props.time,
        })
    }

    format(seconds) {
        const min = Math.floor(seconds / 60);
        const leadingMin = (min < 10) ? '0' : '';

        const sec = Math.floor(seconds % 60);
        const leadingSec = (sec < 10) ? '0' : '';

        const formattedTime = `${leadingMin + min}:${leadingSec + sec}`;

        return formattedTime;
    }

    componentWillUnmount() {
        this.stopTimer();
    }

    runTimer = () => {
        if (this.state.time !== 0) {
            this.setState((prevState) => ({
                time: prevState.time - 1,
            }));
            console.log('tik-tok');
        } else {
            this.stopTimer();
            this.props.zeroHandler();
            this.updateProps();
            console.log('restart'+this.props.time);
            this.startTimer();

        }
    };
    startTimer = () => {
        this.interval = setInterval(this.runTimer, 1000);
    };

    stopTimer = () => {
        clearInterval(this.interval);
    };

    resetTimer = () => {
        this.stopTimer();
        this.setState({
            time: this.props.time,
        });
    }



    render() {
        return (
            <React.Fragment>
                <div className="time">{this.format(this.state.time)}</div>

                <button className="btn-start" onClick={this.startTimer}>Start</button>
                <button className="btn-stop" onClick={this.stopTimer}>Stop</button>
                <button className="btn-reset" onClick={this.resetTimer}>Reset</button>
            </React.Fragment>
        );
    }
}

Timer.PropTypes = {
    time: PropTypes.string,
    zeroHandler: PropTypes.func,
};