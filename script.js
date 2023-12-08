import { containerImage } from "./designer/design.js";

let y;
let x;
let i = 1;
const boxNotMetal = document.querySelector(".box-not-metal");
const metalTitle = document.querySelector(".metal-box");
const notmetalTitle = document.querySelector(".non-metal-box");
const boxMetal = document.querySelector(".box-metal");
const container = [];
mainFunction();
localStorage.clear();

function mainFunction() {
  const images = document.querySelectorAll("img");
  images.forEach((image) => {
    backtogame(image);
    image.addEventListener("dragend", (e) => {
      y = topY(e.pageY);
      x = leftX(e.pageX);
      image.style = `position:absolute; top:${y - 8}vh; 
  left:${x - 5}vw;
  z-index:${i}`;
      dragstop(image);
      i++;
      if (e.target.matches(".metal")) {
        borderDesign(image);
      } else if (e.target.matches(".non-metal")) {
        borderDesign(image);
      }
    });
  });
}

function dragstop(image) {
  document.addEventListener("dragleave", () => {
    document.removeEventListener("drag", image);
    boxMetal.classList.remove("add", "addred");
    boxNotMetal.classList.remove("add", "addred");
    metalTitle.classList.remove("addbg");
    notmetalTitle.classList.remove("addbg");
  });
}

function borderDesign(image) {
  const sense = document.querySelector(".sensor");

  if (y > 31 && y < 55 && x > 5 && x < 21 && image.className === "metal") {
    sense.innerHTML = `<p class = "opaque">${image.id}</p>`;
    boxMetal.classList.add("add");
    addInContainer(image);
  } else if (
    y > 71 &&
    y < 90 &&
    x > 5 &&
    x < 21 &&
    image.className === "metal"
  ) {
    sense.innerHTML = `<p class = "opaque">Metal!!</p>`;
    boxNotMetal.classList.add("addred");
    metalTitle.classList.add("addbg");
    image.style = "";
  } else if (
    y > 71 &&
    y < 90 &&
    x > 5 &&
    x < 21 &&
    image.className === "non-metal"
  ) {
    sense.innerHTML = `<p class = "opaque">${image.id}</p>`;
    addInContainer(image);
    boxNotMetal.classList.add("add");
  } else if (
    y > 31 &&
    y < 55 &&
    x > 5 &&
    x < 21 &&
    image.className === "non-metal"
  ) {
    sense.innerHTML = `<p class = "opaque">Non-metal!!</p>`;
    boxMetal.classList.add("addred");
    notmetalTitle.classList.add("addbg");
    image.style = "";
  } else {
    sense.innerHTML = `<p class = "opaque">Again!</p>`;
    image.style = "";
  }
}

// function stop(movement,image) {
// const j = document.querySelector('.metal-box');
// const a = document.querySelector('.non-metal-box');
// const sense = document.querySelector('.sensor');
// const boxnotMetal  = document.querySelector('.box-not-metal');
// const boxMetal = document.querySelector('.box-metal');
//     boxnotMetal.addEventListener("mousedown", () => {
//       if (image.className === "non-metal") {
//       addInContainer(image);
//       j.classList.remove('add');
//       a.classList.remove('add');
//       sense.innerHTML = `<p class = "opaque">${image.id}</p>`;
//       document.removeEventListener("mousemove", movement);
//       boxnotMetal.classList.remove('box-notmetal-red');
//       console.log(image.className);
//       } else if (image.className === "metal") {
//         sense.innerHTML = `<p class = "opaque">metal!!</p>`;
//         j.classList.add('add');
//       }
// });

//     boxMetal.addEventListener("mousedown", () => {
//       if (image.className === "metal") {
//       sense.innerHTML = `<p class = "opaque">${image.id}</p>`;
//       addInContainer(image)
//       j.classList.remove('add');
//       a.classList.remove('add');
//       document.removeEventListener("mousemove", movement);
//       boxMetal.classList.remove('box-metal-red');
//     } else if (image.className === "non-metal") {
//       sense.innerHTML = `<p class = "opaque"> non-metal!!</p>`;
//       a.classList.add('add');
//     }
//     });
//   }

// convert to vh/vw
function leftX(leftClientX) {
  return (leftClientX / window.innerWidth) * 100;
}
function topY(topClientY) {
  return (topClientY / window.innerHeight) * 100;
}

export function addInContainer(image) {
  if (image.className === "metal") {
    const metal = image.id;
    container.push({ metal });
  } else if (image.className === "non-metal") {
    const notmetal = image.id;
    container.push({ notmetal });
  }

  // NEW SET IF IT HAS DUPLICATE IN CONTAINER
  const filtering = container.filter((value, index) => {
    return (
      index ===
      container.findIndex((obj) => {
        return (value.metal || value.notmetal) === (obj.metal || obj.notmetal);
      })
    );
  });
  const myObject = JSON.stringify(filtering);
  localStorage.setItem("myObject", myObject);
}

function backtogame(image) {
  const reset = document.querySelector(".reset");
  reset.addEventListener("click", () => {
    localStorage.clear();
    image.style = ``;
    document.removeEventListener("mousemove", movement);
  });
}

const checkItems = document.querySelector(".check-items");
checkItems.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "table.html";
});
