/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
const main = document.querySelector('main');
const header = document.querySelector('.main__hero');
const navList = document.getElementById('navbar__list');
const [...sections] = document.getElementsByTagName('section');
/**
 * End Global Variables
 * Start Helper Functions
 *
*/

// build a menu link
const createMenuLink = (section) => {
    // Create a new li element
    const li = document.createElement('li');
    // Create a new anchor element
    const link = document.createElement('a');
    // Assigning class name to the link
    link.className = 'menu__link';
    // Appent the data-nav attribute of a section into the link text content
    link.textContent = section.dataset.nav;
    // Modify href attribute for the link
    link.setAttribute('href', `#${section.id}`)
    // Add event to the link
    link.addEventListener('click', goToSection);
    // Appent the link into li element
    li.appendChild(link);
    return li;
}

// check the loaction of a section in the viewport
const isInViewport = (section) => {
    // destructing some properties
    const { top, bottom } = section.getBoundingClientRect();
    return top <= 150 && bottom >= 150;
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// Scroll to anchor ID using scrollIntoView event
const goToSection = (event) => {
    event.preventDefault();
    const target = event.target.getAttribute('href');
    const section = document.querySelector(target);
    section.scrollIntoView({ behavior: "smooth" });
}

// build the nav
const navBuilder = (sections) => {
    // Create links according to the number of sections
    const fragment = document.createDocumentFragment();
    sections.forEach((section) => {
        const newLink = createMenuLink(section);
        fragment.appendChild(newLink);
    })
    navList.appendChild(fragment);
}
navBuilder(sections);

// Bulid scroll to up button
const createUpButton = (main, header) => {
    // Create a new span element
    const up = document.createElement("span");
    // Assigning class name to the new span
    up.className = 'up';
    // Append the font awesome icon
    up.innerHTML = '<i class="fa-solid fa-chevron-up"></i>'
    // Append the new span into the main section
    main.insertBefore(up, header);
}
createUpButton(main, header);

// Add class 'active' to section when near top of viewport
const isActive = (sections) => {
    const menuLinks = document.querySelectorAll('.menu__link');
    sections.forEach((section, index) => {
        if (isInViewport(section)) {
            menuLinks[index].classList.add('active__link');
            section.classList.add('your-active-class');
        }
        else {
            menuLinks[index].classList.remove('active__link');
            section.classList.remove('your-active-class');
        }
    })
}

/**
 * End Main Functions
 * Begin Events
 *
*/

// Set sections as active
window.addEventListener('scroll', (e) => {
    isActive(sections);
});

// Scroll to up
const up = document.querySelector('.up');
window.onscroll = () => {
    this.scrollY >= 500 ? up.classList.add('show') : up.classList.remove('show');
}
up.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
})

// Hide menu while not scrolling
let interval = null;
const pageHeader = document.querySelector('.page__header');

window.addEventListener('scroll', function () {
    // check if the navlist is not appear
    if (interval) {
        // clear the interval
        clearTimeout(interval);
        // make the navlist appear
        pageHeader.style.top = "0px";
    }
    // make navlist not appear after 1 second of not scrolling
    interval = setTimeout(() => {
        pageHeader.style.top = "-55px";
    }, 1000);
});

// -----------------------------------------------------------
/*
if there is a hover on the navlist => make it appear
pageHeader.addEventListener('mouseover', () => {
    if (interval) {
        clearTimeout(interval);
        pageHeader.style.top = "0px";
    }
}
);

check if there the mouse leaves from the navlist => make it disappear
pageHeader.addEventListener('mouseout', () => {
    interval = setTimeout(() => {
        pageHeader.style.top = "-55px";
    }, 1000);
}
);
*/
// -----------------------------------------------------------