async function loadCourses() {
    try {
        const response = await fetch('data/courses.json');
        const data = await response.json();

        const container = document.getElementById('courses-container');

        data.courses.forEach(course => {
            const courseDiv = document.createElement('div');
            courseDiv.className = 'course';

            courseDiv.innerHTML = `
                    <img src="${course.photo}" alt="background">
                    <div class="info">
                    <h3>${course.title}</h3>
                    <p>${course.description}</p>
                    <p><strong>Level:</strong> ${course.level.charAt(0).toUpperCase() + course.level.slice(1)}</p>
                    <p><strong>Duration:</strong> ${course.duration}</p>
                    <p><strong>Instructor${course.instructors.length > 1 ? 's' : ''}:</strong> ${course.instructors.join(', ')}</p>
                    <p><strong>Price:</strong> $${data.prices[course.title].price} ${data.prices[course.title].currency}</p>
                    </div>
                `;

            container.appendChild(courseDiv);
        });
    } catch (error) {
        console.error('error', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    let logos = document.querySelectorAll('.logo-img');
    for (const logo of logos) {
        logo.src = 'images/dark-logo.png';
    }
    loadCourses();
});