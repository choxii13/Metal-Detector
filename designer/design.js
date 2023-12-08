import { imagess } from "../contain/container.js";
export let containerImage = "";
imagess.forEach((image) => {
  containerImage += `
    <div class = "div-container">
    <div class = "div-design"><div></div></div>
    <img src = "${image.link}" class = "${image.class}" id = "${image.id}">
    </div>`;
});
document.querySelector(".container-all").innerHTML = containerImage;
