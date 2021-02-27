const navItem = document.querySelector(".nav-item");
const btn = document.getElementById("button");
// function activeClassToggle() {
// navItem.addEventListener("click", (e) => {
//   let href = e.target.firstElementChild.getAttribute("href");
//   console.log(href);
//   localStorage.setItem("href", href);
//   let activeLink = localStorage.getItem("href");
//   let path = location.pathname;
//   if (activeLink === path) e.target.classList.add("active");
// });
// // }

// // activeClassToggle(); ////////////////////////////NEEDS WORK

// / Creating scrolling effect on Features Page
const sections = [...document.querySelectorAll("section")];
const options = {
  rootMargin: "0px",
  threshold: 0.2,
};
const callback = (entries, observer) => {
  entries.forEach((entry) => {
    const { target } = entry;

    if (entry.intersectionRatio >= 0.2) {
      target.classList.add("is-visible");
    } else {
      target.classList.remove("is-visible");
    }
  });
};
const observer = new IntersectionObserver(callback, options);

sections.forEach((section, index) => {
  observer.observe(section);
});