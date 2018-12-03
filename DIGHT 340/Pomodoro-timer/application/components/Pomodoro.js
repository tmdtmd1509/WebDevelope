class Pomodoro extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            work: true,
            numWork: 0,
            numRest: 0,
            numLoop: 0,
        };
    }

    // componentDidUpdate(prevState) {
    //     if (this.state.work !== prevState.work) {
    //         this.updateState();
    //         console.log('update')
    //     }
    // }
    //
    // updateState = () => {
    //     this.setState({
    //         work: this.state.work,
    //     })
    // }

    countWork = () => {
        this.setState({
            numWork: this.state.numWork + 1,
        });
        this.restState();
        if(this.state.numWork === this.state.numRest) {
            this.addLoop();
            console.log('countwork');
        }
    }

    countRest = () => {
        this.setState({
            numRest: this.state.numRest + 1,
        });
        this.workState();
        if(this.state.numWork === this.state.numRest) {
            this.addLoop();
            console.log('countrest');
        }
    }

    workState = () => {
        this.setState({
            work: true,
        });
    }

    restState = () => {
        this.setState({
            work: false,
        });
    }

    addLoop = () => {
        this.setState({
            numLoop: this.state.numLoop + 1,
        })
    }

    render() {
        return (
            <React.Fragment>
                <button className="btn-work" onClick={this.workState}>Work</button>
                <button className="btn-rest" onClick={this.restState}>Rest</button>

                {this.state.work && <Timer time={4} zeroHandler = {this.countWork} work={this.state.work}/>}
                {!this.state.work && <Timer time={2} zeroHandler = {this.countRest} work={this.state.work}/>}

                <p>You did {this.state.numLoop} times</p>

                {/*or*/}
                {/*{this.state.work ? (*/}
                    {/*<Timer time={1500} />*/}
                {/*) : (*/}
                    {/*<Timer time={300} />*/}
                {/*)}*/}
            </React.Fragment>
        );
    }
};