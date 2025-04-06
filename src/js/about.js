function populateInstructors (structure) {
  const instructorList = document.getElementById('instructorList')
  structure.instructors.forEach(instructor => {
    const instructorDiv = document.createElement('div')
    instructorDiv.className = 'instructor'

    instructorDiv.innerHTML = `
                <img src="${instructor.photo}" alt="${instructor.name}">
                <h3>${instructor.name}</h3>
                <p>${instructor.biography}</p>
            `
    instructorList.appendChild(instructorDiv)
  })
}

function populateContacts (structure) {
  const contactSection = document.getElementById('contactSection')
  const contacts = structure.contacts

  contactSection.innerHTML = `
        <h2>Contact Us</h2>
        <p>Email: <a href="mailto:${contacts.email}">${contacts.email}</a></p>
        <p>Phone: ${contacts.phone}</p>
        <p>Address: ${contacts.address}</p>
        <div class="map-container">
            <iframe
                width="100%"
                height="300"
                frameborder="0"
                style="border:0"
                src="https://www.google.com/maps?q=${encodeURIComponent(contacts.mapQuery)}&output=embed"
                allowfullscreen>
            </iframe>
        </div>
    `
}

function populateFooter () {
  const footer = document.getElementById('footer')
  const currentYear = new Date().getFullYear()
  footer.innerHTML = `
            <p>© ${currentYear} Online Learning Platform. All rights reserved.</p>
        `
}

async function loadData () {
  try {
    const response = await fetch('./data/courses.json')
    if (!response.ok) throw new Error('Network response was not ok')
    const courses = await response.json()

    populateInstructors(courses)
    populateContacts(courses)
    populateFooter()
  } catch (error) {
    console.error('Error loading JSON:', error)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const logos = document.querySelectorAll('.logo-img')
  for (const logo of logos) {
    logo.src = 'images/dark-logo.png'
  }

  loadData()
})
