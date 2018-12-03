const applicationRoot = document.querySelector('#application');

const styles = {
    position: 'absolute',
    left: '45%',
    bottom: '10%',
    display: 'block',
    padding: '10px',
    backgroundColor: '#26dd5c'
}

const pomo_style = {
    backgroundColor: '#dd8523',
    marginLeft: '35%',
    marginRight: '35%',
}

const h1_style = {
    fontSize: 30,
    marginLeft: '35%',
}

function Application() {
    return (
        <React.Fragment style={styles}>
            <h1 style={h1_style}>Pomodoro Timer</h1>

            <div style={pomo_style}>
            <Pomodoro />
            </div>
        </React.Fragment>
    );
};

ReactDOM.render(
    <Application/>,
    applicationRoot,
);