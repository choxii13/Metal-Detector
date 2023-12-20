const newObj = JSON.parse(localStorage.getItem("newObj"));
const del = document.querySelector(".delete");
const obj = JSON.parse(localStorage.getItem("myObject"));

render();
function render() {
  let containerMetal = "";
  let containerNotMetal = "";
  obj.forEach((obj, index) => {
    if (obj.metal != undefined) {
      containerMetal += `
                <div class ="metal-button">
                <p> ${index + 1}. ${obj.metal}</p>
                <div class ='delete' onclick ="
                dels(${index});">delete</div></div>`;
    } else if (obj.notmetal != undefined) {
      containerNotMetal += `
        <div class ="not-metal-button">
          <p>${index + 1}. ${obj.notmetal}</p>
          <div class ='delete' onclick ="dels(${index});
          ">delete</div>
          </div>`;
    }
  });
  // new item in local storage
  localStorage.setItem("newObj", JSON.stringify(obj));
  document.querySelector(".metal-button-container").innerHTML = containerMetal;
  document.querySelector(".not-metal-button-container").innerHTML =
    containerNotMetal;
  console.log(document.querySelector(".not-metal-button-container"));
}

//function for delete button
function dels(index) {
  obj.splice(index, 1);
  render();
}
