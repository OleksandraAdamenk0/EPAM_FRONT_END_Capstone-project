import * as Slider from "./slider.js";

document.addEventListener('DOMContentLoaded', function(e) {
    let logos = document.querySelectorAll('.logo-img');
    for (const logo of logos) {
        logo.src = 'images/dark-logo.png';
    }

    // setTopCourses();
    Slider.setUpSlider();
})