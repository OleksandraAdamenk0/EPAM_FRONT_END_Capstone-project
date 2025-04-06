import { Course } from './Course.js'

// let animationTimer
const defaultSpeed = 3
let isPaused = false

function getTopCourses () {
  return fetch('./data/courses.json')
    .then(res => res.json())
    .then(data => {
      const courses = data.courses.map(course =>
        new Course(course.title,
          course.description,
          course.photo,
          course.level,
          course.participants,
          course.duration,
          course.topics,
          course.skills,
          course.instructors
        )
      )

      return courses.sort((a, b) => b.participants - a.participants).slice(0, 5)
    })
    .catch(err => console.log(err))
}

function runAnimation (speed) {
  console.log('Starting animation...')
  const courses = document.querySelectorAll('.course')
  courses.forEach(course => {
    course.style.animation = 'none'
    // eslint-disable-next-line no-void
    void course.offsetWidth
    console.log(speed)
    course.style.animation = `slideLeft ${speed}s ease-in-out forwards`
    console.log(course.style.animation)
  })

  setTimeout(() => {
    const firstCourse = document.querySelector('.course')
    const clone = firstCourse.cloneNode(true)
    firstCourse.remove()
    document.querySelector('.slider').appendChild(clone)
  }, speed * 1000)
}

function animation () {
  if (isPaused) return
  runAnimation(defaultSpeed)
}
//
// function stopAnimation () {
//   clearInterval(animationTimer)
// }

function pauseAnimation () {
  console.log('Paused animation...')
  isPaused = true
}

function continueAnimation () {
  console.log('Continue animation...')
  isPaused = false
}

function startAnimation () {
  // animationTimer = setInterval(animation, defaultSpeed * 1000)
  setInterval(animation, defaultSpeed * 1000)
}

function setUpImages () {
  const coursesNodes = document.querySelectorAll('.course')
  getTopCourses()
    .then(courses => {
      for (let i = 0; i < 5; i++) {
        coursesNodes[i].querySelector('img').src = courses[i].photo
      }
    })
    .catch(err => console.log(err))
}

function setUpAnimation () {
  document.querySelector('.slider').addEventListener('mouseenter', pauseAnimation)
  document.querySelector('.slider').addEventListener('mouseleave', continueAnimation)
  document.querySelector('.slider').addEventListener('click', (event) => {
    const target = event.target
    console.log(target)
    if (target.classList.contains('btn')) {
      console.log('btn')
      return
    }
    runAnimation(1)
  })
  startAnimation()
}

export function setUpSlider () {
  setUpImages()
  console.log('images set')
  setUpAnimation()
  console.log('animation set')
}
