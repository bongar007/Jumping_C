const navItem = document.querySelectorAll(".nav-item");

for (const item of navItem) {
  item.addEventListener("click", function (e) {
    let _this = e.target;
    item.classList.remove("active");
    _this.classList.add("active");
  });
}
