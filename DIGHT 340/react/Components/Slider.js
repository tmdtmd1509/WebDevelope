class Slider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: ['artanis', 'johanna', 'muradin', 'king', 'warcraft', 'lux', 'graves', 'baron'],
            currentIndex: 0,
            translateValue: 0,
            indexNum: 0,
            intervalId: 1 ,
        };
    }

    slideWidth = () => {
        return document.querySelector('.slide').clientWidth;
    }

    handleKeyPress = (e) => {
        switch(e.keyCode) {
            case 32:
                this.autoSlideshow();
                break;

            case 39:
                this.goToNextSlide();
                this.stopAutoSlideshow();
                break;

            case 37:
                this.goToBackSlide();
                this.stopAutoSlideshow();
                break;

            default:
                break;
        }
    }

    goToBackSlide = () => {
        if (this.state.currentIndex === 0) {
            return this.setState((prevState) => ({
                currentIndex: this.state.images.length-1,
                translateValue: prevState.translateValue -(this.slideWidth() * (this.state.images.length-1)),
            }));
        }

        this.setState((prevState) => ({
            currentIndex: prevState.currentIndex - 1,
            translateValue: prevState.translateValue + (this.slideWidth()),
        }));
    }

    // goToNextSlide() {} also work
    goToNextSlide = () => {
        if (this.state.currentIndex === this.state.images.length -1) {
            return this.setState({
                currentIndex: 0,
                translateValue: 0,
            });
        }

        this.setState((prevState) => ({
            currentIndex: prevState.currentIndex + 1,
            //translateValue: prevState.translateValue - (document.querySelector('.slide').clientWidth),
            translateValue: prevState.translateValue - (this.slideWidth()),
        }));
    }

    goToSlide = (indexNum) => {
        this.stopAutoSlideshow();
        this.setState(() => ({
            currentIndex: indexNum,
            translateValue: this.slideWidth() * -indexNum,
    }));
    }

    autoSlideshow = () => {
        console.log("autoSlideshow");
        if(!this.intervalId) {
            console.log("on");
            this.intervalId = window.setInterval(() => {this.goToNextSlide()}, 2000);
            // console.log(this.intervalId);
        }
        else {
            console.log("off");
            // console.log(this.intervalId);
            this.stopAutoSlideshow();
        }
    }
    stopAutoSlideshow = () => {
        console.log("stopAutoSlideshow");
        window.clearInterval(this.intervalId);
    }

    backwardArrow = () => {
        this.goToBackSlide();
        this.stopAutoSlideshow();
    }

    forwardArrow = () => {
        this.goToNextSlide();
        this.stopAutoSlideshow();
    }

    render() {
        const styles = {
            position: 'relative',
            width: '100%',
            margin: '0 auto',
            height: '100%',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
        };

        return (
            <div
                className = "slider"
                style={styles}
                onKeyUp={this.handleKeyPress}
                tabIndex='0'//necessary!! for keyboard listener
            >
                <Arrow
                    direction="backward"
                    clickHandler={this.backwardArrow}
                />

                 <Slides
                     translateValue={this.state.translateValue}
                     images={this.state.images}
                 />

                <Arrow
                    direction="forward"
                    clickHandler={this.forwardArrow}
                />

                <Pips
                    images={this.state.images}
                    clickHandler={this.goToSlide}
                    curIndex={this.state.currentIndex}
                />
            </div>
        );
    }
}