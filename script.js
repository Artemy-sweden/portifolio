// const menu = document.getElementById("menu");
// menu.onclick = function () {
//   menu.classList.toggle("active");
// };

const changetheme = document.getElementById("dropdown-changetheme");
var isThemeActive = false;
changetheme.onclick = function () {
  if (!isThemeActive) {
    document.getElementById("menuxa").style.display = "flex";
    isThemeActive = true;
    changetheme.style.transform = "rotate(180deg)";
  } else {
    document.getElementById("menuxa").style.display = "none";
    isThemeActive = false;
    changetheme.style.transform = "rotate(0)";
  }
};

function scrollTo(element) {
  window.scroll({
    left: 0,
    top: element.offsetTop,
    behavior: "smooth",
  });
}

var link0 = document.getElementById("link0");
var link1 = document.getElementById("link1");
var link2 = document.getElementById("link2");
var link3 = document.getElementById("link3");
var link32 = document.getElementById("link32");
var sec0 = document.getElementById("sec0");
var sec1 = document.getElementById("sec1");
var sec2 = document.getElementById("portfolio");
var sec3 = document.getElementById("sec3");
link0.addEventListener("click", () => {
  scrollTo(sec0);
});
link1.addEventListener("click", () => {
  scrollTo(sec1);
});
link2.addEventListener("click", () => {
  scrollTo(sec2);
});
link3.addEventListener("click", () => {
  scrollTo(sec3);
});
link32.addEventListener("click", () => {
  scrollTo(sec3);
});
