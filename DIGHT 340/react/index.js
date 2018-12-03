const rootElement =document.querySelector('#application');

const styles = {
    height: '100%',
    width: '100%',
    margin: '0',
    padding: '0',
}

function Application() {
    return (
        <Slider />
    );
}
ReactDOM.render(<Application />, rootElement);