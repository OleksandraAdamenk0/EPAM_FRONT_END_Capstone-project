import * as Slider from "./slider.js";

function populateFooter() {
    const footer = document.getElementById('footer');
    const currentYear = new Date().getFullYear();
    footer.innerHTML = `
            <p>© ${currentYear} Online Learning Platform. All rights reserved.</p>
        `;
}

document.addEventListener('DOMContentLoaded', function(e) {
    let logos = document.querySelectorAll('.logo-img');
    for (const logo of logos) {
        logo.src = 'images/dark-logo.png';
    }

    populateFooter();
    Slider.setUpSlider();
})