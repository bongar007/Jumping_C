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

  const rellax = new Rellax(".rellax", {
    breakpoints: [1201, 1402, 1803],
  });

  //Making sure mobile size does not display Game tab in Nav

  //   const setNavInnerHTML = (html) => {
  //     const nav = document.querySelector(".navbar-nav");
  //     nav.innerHTML = html;
  //   };

  //   const Component1 = `
  //       <li class="nav-item">
  //         <a class="nav-link" href="/game"
  //           >Game
  //           <span class="sr-only">(current)</span>
  //         </a>
  //       </li>
  //       <li class="nav-item">
  //         <a class="nav-link" href="/features">Features</a>
  //       </li>

  //       <li class="nav-item">
  //         <a class="nav-link" href="/about">About</a>
  //       </li>
  //       <li class="nav-item offset-lg-10 login logout">
  //         <% if (typeof user !== 'undefined' && user) { %>
  //         <a href="/users/logout" class="nav-link">Logout</a>
  //         <% } else { %>
  //         <a href="/users/login" class="nav-link">login</a>
  //         <% } %>
  //       </li>
  // `;

  //   const Component2 = `
  //   <li class="nav-item">
  //         <a class="nav-link" href="/features">Features</a>
  //       </li>

  //       <li class="nav-item">
  //         <a class="nav-link" href="/about">About</a>
  //       </li>
  //       <li class="nav-item offset-lg-10 login logout">
  //         <% if (typeof user !== 'undefined' && user) { %>
  //         <a href="/users/logout" class="nav-link">Logout</a>
  //         <% } else { %>
  //         <a href="/users/login" class="nav-link">login</a>
  //         <% } %>
  //       </li>
  // `;

  //   const mql = window.matchMedia("(max-width: 600px)");

  //   // For first render
  //   let mobileView = mql.matches;
  //   if (mobileView) {
  //     setNavInnerHTML(Component2);
  //   } else {
  //     setNavInnerHTML(Component1);
  //   }

  //   // For subsequent renders if screen size changes
  //   mql.addEventListener("change", (e) => {
  //     let mobileView = e.matches;
  //     if (mobileView) {
  //       setNavInnerHTML(Component2);
  //     } else {
  //       setNavInnerHTML(Component1);
  //     }
  //   });

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
