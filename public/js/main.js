const btns = document.querySelectorAll(".nav-link");

for (let i = 0; i < btns.length; i++) {
  //TODO to rewrite using href as reference
  btns[i].addEventListener("click", function () {
    let current = document.getElementsByClassName("active");

    current[0].className = current[0].className.replace(" active", "");

    this.className += " active";
  });
}

const sections = [...document.querySelectorAll("section")];
const options = {
  rootMargin: "0px",
  threshold: 0.25,
};
const callback = (entries, observer) => {
  entries.forEach((entry) => {
    const { target } = entry;

    if (entry.intersectionRatio >= 0.25) {
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
