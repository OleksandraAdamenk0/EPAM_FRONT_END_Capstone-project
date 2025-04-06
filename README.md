# 🚀 Course Galaxy
A web application for an online learning platform that allows users to browse and enroll in courses.
## 📦 Features

* Display of available courses
* Slider showcasing top courses (determined by the number of enrolled users)
* Filtering by course level
* Sorting by level (ascending and descending)
* Search (matches if at least one word from the query is found in the title, description, topics, level, instructors, or skills)
* Pagination (shows 10 items per page)
* Flexible architecture for easy expansion

## 🔧 Requirements

Make sure the following are installed on your machine:
* Git
* npm
* npx 
* Any modern web browser (Chrome, Firefox, Edge, etc.)

## 📥 Installation

1. Download the project

    You can either:
    
    Download the ZIP archive from GitHub and extract it
    
    OR
    
    Clone the repository using Git:
    
    ```
    git@github.com:OleksandraAdamenk0/EPAM_FRONT_END_Capstone-project.git
    ```

2. Go to the project directory and install dependencies

    ```
    cd course-galaxy
    ```

    ```
    npm install
    ```

3. Start a local development server (e.g., using lite-server)

    ```
    npx lite-server
    ```


## 🌐 Open in Browser

You're all set! The project will open automatically in your browser at:
http://localhost:3000/src/index.html

## 📁 Project Structure

```
├── package.json
├── package-lock.json
├── README.md
└── src
├── about.html
├── courses.html
├── css
│   ├── about.css
│   ├── constants.css
│   ├── courses.css
│   ├── header.css
│   ├── index.css
│   ├── mixins.css
│   └── slider.css
├── data
│   └── courses.json
├── images
│   ├── courses
│   │   ├── advanced_js.jpeg
│   │   ├── android.png
│   │   ├── intropandas.jpg
│   │   ├── java_script.jpg
│   │   ├── python_advanced.jpg
│   │   ├── python_basics.jpg
│   │   ├── python_data.jpg
│   │   ├── react.png
│   │   ├── scikit.png
│   │   ├── sql.png
│   │   ├── tensorflow_ml.png
│   │   └── web_scraping.png
│   ├── cover.jpg
│   ├── dark-logo.png
│   ├── icons
│   │   ├── anna.png
│   │   ├── dmitry.png
│   │   ├── elena.png
│   │   ├── ivan.png
│   │   └── petr.png
│   ├── light-arrow.png
│   ├── light-logo.png
│   └── shit.jpeg
├── index.html
├── js
│   ├── about.js
│   ├── Course.js
│   ├── courses.js
│   ├── index.js
│   └── slider.js
└── sass
├── about.css
├── about.css.map
├── about.sass
├── constants.css
├── constants.css.map
├── constants.sass
├── courses.css
├── courses.css.map
├── courses.sass
├── header.css
├── header.css.map
├── header.sass
├── index.css
├── index.css.map
├── index.sass
├── mixins.css
├── mixins.css.map
├── mixins.sass
├── slider.css
├── slider.css.map
└── slider.sass
```

