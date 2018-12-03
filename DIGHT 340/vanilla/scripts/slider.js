const slider = document.querySelector('.slider');
const sliderStyles = getComputedStyle(slider);
const slides = document.querySelectorAll('.slide');
const slideWidth = document.querySelector('.slide').clientWidth;
const arrowForward = document.querySelector('.arrow-forward');
const arrowBackward = document.querySelector('.arrow-backward');

let imageIndex = 0;
let translateValue = sliderStyles.getPropertyPriority('--translateValue');

arrowForward.addEventListener(
    'click',
    () => {
        //Increment the imageIndex
        imageIndex++;

        if (imageIndex === slides.length) {
            imageIndex = 0;
            translateValue = 0;
        }
        else {
            translateValue = translateValue - slideWidth;
        }
        slider.style.setProperty('--translateValue', `${translateValue}px`);
    }
);

arrowBackward.addEventListener(
    'click',
    () => {
        imageIndex--;
        if (imageIndex < 0) {
            imageIndex = slides.length-1;
            translateValue = translateValue - slideWidth*(imageIndex);
        }
        else {
            translateValue = translateValue + slideWidth;
        }

        slider.style.setProperty('--translateValue', `${translateValue}px`);
    }
);

document.addEventListener('keydown', function(e) {
        console.log("right arrow");
        if (e.code == 'ArrowRight' || e.code == 'Space') {
            console.log("right arrow worked");

            //Increment the imageIndex
            imageIndex++;

            if (imageIndex === slides.length) {
                imageIndex = 0;
                translateValue = 0;
            }
            else {
                translateValue = translateValue - slideWidth;
            }
            slider.style.setProperty('--translateValue', `${translateValue}px`);
        }
    }
);

document.addEventListener('keydown', function(e) {
        console.log("left arrow");
        if (e.code == 'ArrowLeft') {
            console.log("left arrow worked");

            imageIndex--;
            if (imageIndex < 0) {
                imageIndex = slides.length - 1;
                translateValue = translateValue - slideWidth * (imageIndex);
            }
            else {
                translateValue = translateValue + slideWidth;
            }

            slider.style.setProperty('--translateValue', `${translateValue}px`);
        }
    }
);