const navigation = document.querySelector(".nav-links"),
      navToggle = document.querySelector(".nav-menu-icon");

navToggle.addEventListener("click", () => {
  navigation.classList.toggle("active");
});