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
 * Define Global Variables
 *
 */
// <nav>
const navBarMenu = document.getElementsByClassName("navbar__menu");
//Page Header constant
const pageHeader = document.getElementsByClassName("page__header");
const startingTime = performance.now();
/**
 * End Global Variables
 * Start Helper Functions
 *
 */

// build the nav
function generateListEntry(Section, textContent) {
  let sectionItem = document.createElement("li");
  let sectionItemLink = document.createElement("a");
  sectionItemLink.textContent = textContent;
  let currentSectionId = Section.parentNode.getAttribute("id");
  sectionItemLink.href = `#${currentSectionId}`;
  sectionItem.appendChild(sectionItemLink);
  addStylingToEntry(sectionItem);
  return sectionItem;
}
// function to add styling to the navbarlist items
function addStylingToEntry(SectionItem) {
  SectionItem.style.padding = "10px";
}

//function to tell which section is active based on getBoundClientRect().top
function whichSectionIsInViewPort() {
  const sections = document.querySelectorAll(".landing__container");
  const topVar = new Array();
  for (i = 0; i < sections.length; i++) {
    topVar[i] = sections[i].getBoundingClientRect().top;
    if (topVar[i] < 0) topVar[i] = -1;
  }
  let minIndex = -1;
  for (j = 0; j < sections.length; j++) {
    if (topVar[j] >= 0) {
      if (minIndex == -1) {
        minIndex = j;
      } else if (topVar[j] <= topVar[minIndex]) {
        minIndex = j;
      }
    }
  }
  return minIndex;
}
//Add and remove "your-active-class" based on which section is active
//Also adding border to the active index
function activateIndex() {
  const sections = document.querySelectorAll(".landing__container");
  let minIndex = whichSectionIsInViewPort();
  for (i = 0; i < sections.length; i++) {
    if (i == minIndex) {
      sections[i].parentNode.classList.add("your-active-class");
      sections[i].parentNode.style.border = "thin dotted red";
    } else {
      sections[i].parentNode.classList.remove("your-active-class");
      sections[i].parentNode.style.border = "none";
    }
  }
}

/**
 * End Helper Functions
 */

// Build menu
document.addEventListener("DOMContentLoaded", function(event) {
  const sections = document.querySelectorAll(".landing__container");
  const navBarList = document.querySelector("#navbar__list");
  for (i = 0; i < sections.length; i++) {
    const currentSection = sections[i];
    let sectionItem = generateListEntry(
      currentSection,
      currentSection.parentNode.getAttribute("data-nav")
    );
    navBarList.appendChild(sectionItem);
  }
  // Scroll to section on link click
  navBarMenu[0].addEventListener("click", function(event) {
    if (event.target && event.target.nodeName == "A") {
      event.preventDefault();
      window.scroll({
        left: 0,
        top: sections[
          event.target.textContent.slice(
            event.target.innerText.search("[0-9]")
          ) - 1
        ].getBoundingClientRect().top,
        behavior: "smooth"
      });
    }
  });
});
// event listener to set "your-active-class" for section which is more prominent in the viewport
// Set sections as active
document.addEventListener("scroll", activateIndex);

/* When the user scrolls down, hide the navbar. When the user scrolls to top of page, show the navbar */
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScroll = window.pageYOffset;
  if (currentScroll <= 50) {
    pageHeader[0].style.top = "initial";
  } else {
    pageHeader[0].style.top = "-100px";
  }
  prevScrollpos = currentScroll;
};
const endingTime = performance.now();
console.log("This code took " + (endingTime - startingTime) + " milliseconds");
