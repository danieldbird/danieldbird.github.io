const technologies = ["HTML", "CSS", "Javascript"];
const technologyElement = document.querySelector(".technology-highlight");
technologyElement.innerHTML = technologies[0];

let counter = 1;
setInterval(() => {
  // technologyElement.style.opacity = 1;
  technologyElement.innerHTML = technologies[counter];
  // technologyElement.style.opacity = 0;
  if (counter === technologies.length - 1) {
    counter = 0;
  } else {
    counter++;
  }
}, 2000);
