//Instantiating Rellax parallax library
window.addEventListener("DOMContentLoaded", (event) => {
  // function initRellax() {
  //   if (document.getElementsByClassName("rellax").length > 0) {
  //     if (window.Rellax) {
  //     } else {
  //       setTimeout(initRellax, 100);
  //     }
  //   }
  // }

  const rellax = new Rellax(".rellax");

  ///Function to Handle menu items active class depending on location
  const navLinks = document.querySelectorAll(".nav-link");
  let path = location.pathname;

  function activeClassToggle() {
    navLinks.forEach((item) => {
      if (item.getAttribute("href") == path) {
        item.classList.add("active");
      }
    });
  }

  activeClassToggle();

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

  //fuction to handle toTop arrow
  const btn = [...document.getElementsByClassName("toTop")];
  btn.forEach((element) => {
    window.addEventListener("scroll", (e) => {
      if (window.scrollY > 200) {
        element.style.opacity = 1;
      } else {
        element.style.opacity = 0;
      }
    });

    element.addEventListener("click", () => {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    });
  });
});
