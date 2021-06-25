function scrollTo(element) {
  window.scroll({
    left: 0,
    top: element.offsetTop,
    behavior: "smooth",
  });
}

var link1 = document.getElementById("link1");
var link2 = document.getElementById("link2");
var link3 = document.getElementById("link3");
var link4 = document.getElementById("link4");

var sec1 = document.getElementById("sec1");
var sec2 = document.getElementById("sec2");
var sec3 = document.getElementById("sec3");
var sec4 = document.getElementById("sec4");
var sec5 = document.getElementById("sec5");

link1.addEventListener("click", () => {
  scrollTo(sec2);
});
link2.addEventListener("click", () => {
  scrollTo(sec3);
});
link3.addEventListener("click", () => {
  scrollTo(sec4);
});
link4.addEventListener("click", () => {
  scrollTo(sec5);
});
