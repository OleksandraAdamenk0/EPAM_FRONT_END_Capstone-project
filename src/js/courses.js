let currentPage = 1;

let sortingASC = {
    "level": true,
    "participants": true,
    "duration": true,
    "price": true,
};

async function getData() {
    const response = await fetch('data/courses.json');
    return await response.json();
}

function updatePagination(totalCourses) {
    const totalPages = Math.ceil(totalCourses / 10);
    const currentPageContainer = document.getElementById('current-page');
    const allPagesContainer = document.getElementById('all-pages');

    currentPageContainer.textContent = String(currentPage);
    allPagesContainer.textContent = String(totalPages);
}

function displayCourses(courses, prices) {
    const container = document.getElementById('courses-container');
    container.innerHTML = '';

    const startIndex = (currentPage - 1) * 10;
    const endIndex = startIndex + 10;
    const coursesToDisplay = courses.slice(startIndex, endIndex);

    courses.forEach((course, index) => {
        const courseDiv = document.createElement('div');
        courseDiv.className = 'course';

        if (index < startIndex || index >= endIndex) {
            courseDiv.classList.add('inactive');
        }

        courseDiv.innerHTML = `
                    <img src="${course.photo}" alt="background">
                    <div class="info">
                    <h3>${course.title}</h3>
                    <p>${course.description}</p>
                    <p><strong>Level:</strong> ${course.level.charAt(0).toUpperCase() + course.level.slice(1)}</p>
                    <p><strong>Duration:</strong> ${course.duration}</p>
                    <p><strong>Instructor${course.instructors.length > 1 ? 's' : ''}:</strong> ${course.instructors.join(', ')}</p>
                    <p><strong>Price:</strong> $${prices[course.title].price} ${prices[course.title].currency}</p>
                    </div>
                `;

        container.appendChild(courseDiv);
    });

    updatePagination(courses.length);
}

async function loadCourses() {
    try {
        const data = await getData();
        displayCourses(data.courses, data.prices);
    } catch (error) {
        console.error('error', error);
    }
}

async function searchCourses() {
    const input = document.getElementById('search');
    const searchText = input.value;
    if (searchText === '') {
        input.placeholder = "Enter something to search";
        input.classList.add('error-search');
        setTimeout(() => {
            input.placeholder = "Search courses...";
            input.classList.remove('error-search');
        }, 8000);
        return;
    }

    const data = await getData();
    const courses = data.courses;
    let resultCourses = [];

    const searchWords = searchText.toLowerCase().trim().split(' ');

    courses.forEach(course => {
        const keyWords = course.title.toLowerCase().trim().split(' ')
            .concat(course.description.toLowerCase().trim().split(' '))
            .concat(course.level.toLowerCase().trim().split(' '))
            .concat(course.topics.map(topic => topic.toLowerCase().split(" ")).flat())
            .concat(course.skills.map(skill => skill.toLowerCase().split(" ")).flat())
            .concat(course.instructors.map(instructor => instructor.toLowerCase().split(" ")).flat())

        const hasIntersection = keyWords.some(item => searchWords.includes(item));
        if (hasIntersection) resultCourses.push(course);
    });

    displayCourses(resultCourses, data.prices);
    console.log(resultCourses);
}

async function sortByLevel() {
    const lvls = ["beginner", "intermediate", "advanced"];
    const data = await getData();
    const courses = data.courses;

    const lvlMap = lvls.reduce((acc, lvl, index) => {
        acc[lvl] = index;
        return acc;
    }, {});

    if (sortingASC.level)
        courses.sort((a, b) => lvlMap[a.level] - lvlMap[b.level]);
    else
        courses.sort((a, b) => lvlMap[b.level] - lvlMap[a.level]);

    sortingASC.level = !sortingASC.level;

    displayCourses(courses, data.prices);
}

async function sortByParticipants() {
    console.log('sortByParticipants');
}

async function sortByDuration() {
    console.log('sortByDuration');
}

async function sortByPrice() {
    console.log('sortByPrice');
}

function toggleSortingOptions() {
    const options = document.querySelectorAll('.sorting-option');
    const hidden = options[0].classList.contains('inactive');
    if (hidden)
        for (const option of options)
            option.classList.remove('inactive');
    else
        for (const option of options)
            option.classList.add('inactive');
}

function sortingClick(e) {
    if (!e.target.classList.contains('sorting-option')) return;
    const option = e.target.textContent;
    switch (option.toLowerCase().trim()) {
        case 'level':
            sortByLevel();
            break;
        case 'participants':
            sortByParticipants();
            break;
        case 'duration':
            sortByDuration();
            break;
        case 'price':
            sortByPrice();
            break;
    }
}

function toggleFilteringOptions() {
    const options = document.querySelectorAll('.filtering-option');
    const hidden = options[0].classList.contains('inactive');
    if (hidden)
        for (const option of options)
            option.classList.remove('inactive');
    else
        for (const option of options)
            option.classList.add('inactive');
}

function toggleOptionCheckboxesVisibility(e) {
    if (document.querySelector('.filtering-option .options').classList.contains('inactive'))
        document.querySelector('.filtering-option .options').classList.remove('inactive');
    else document.querySelector('.filtering-option .options').classList.add('inactive');
}

function levelFilterClicked(e) {
    if (!e.target.classList.contains('option')) return;

    setTimeout(async () => {
        const checked = Array.from(document.querySelectorAll('.filtering-option .options input'))
            .filter(input => input.checked)
            .map(input => input.value);

        const data = await getData();
        const courses = data.courses.filter(course => checked.some(item => item.toLowerCase() === course.level.toLowerCase()));
        displayCourses(courses, data.prices);
    }, 0);
}

function getCourseFromDiv(courseDiv) {
    const title = courseDiv.querySelector('h3').textContent;
    const description = courseDiv.querySelector('p').textContent;
    const level = courseDiv.querySelectorAll('p')[1].textContent.split(': ')[1];
    const duration = courseDiv.querySelectorAll('p')[2].textContent.split(': ')[1];
    const instructors = courseDiv.querySelectorAll('p')[3].textContent.split(': ')[1].split(', ');
    const price = courseDiv.querySelectorAll('p')[4].textContent.split(': ')[1];

    const photo = courseDiv.querySelector('img').src;

    return {
        title: title,
        description: description,
        level: level.toLowerCase(),
        duration: duration,
        instructors: instructors,
        price: parseFloat(price.replace('$', '')),
        currency: 'USD',
        photo: photo
    };
}

async function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        const data = await getData();
        const coursesNodes = document.querySelectorAll('.course');
        let courses = []
        coursesNodes.forEach(node => courses.push(getCourseFromDiv(node)));
        console.log(courses);
        displayCourses(courses, data.prices);
    }
}

async function nextPage() {
    const coursesNodes = document.querySelectorAll('.course');
    const totalPages = Math.ceil(coursesNodes.length / 10);
    if (currentPage < totalPages) {
        currentPage++;
        const data = await getData();
        let courses = []
        coursesNodes.forEach(node => courses.push(getCourseFromDiv(node)));
        console.log(courses);
        displayCourses(courses, data.prices);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    let logos = document.querySelectorAll('.logo-img');
    for (const logo of logos) {
        logo.src = 'images/dark-logo.png';
    }

    document.querySelector('#search-btn').addEventListener('click', searchCourses);
    document.querySelector('#open-sorting-options').addEventListener('click', toggleSortingOptions);
    document.querySelector('.sorting').addEventListener('click', sortingClick);
    document.querySelector('#open-filtering-options').addEventListener('click', toggleFilteringOptions);
    document.querySelector('.filtering-option .name').addEventListener('click', toggleOptionCheckboxesVisibility);
    document.querySelector('.filtering-option .options').addEventListener('click', levelFilterClicked);

    document.getElementById('previous').addEventListener('click', previousPage);

    document.getElementById('next').addEventListener('click', nextPage);

    loadCourses();
});