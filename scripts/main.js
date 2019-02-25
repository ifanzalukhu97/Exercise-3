let tBody = document.getElementById("table-body");
let dropDownItems = document.querySelectorAll(".dropdown-item");
var dropDownButton = document.querySelector(".dropdown-toggle");

// Load planet_list object from planet_list.js
let planetList = planet_list;

// Create table row from planetlist data
// and append it to table (tBody)
planetList.forEach((planet, index) => {
  let tr = document.createElement("TR");

  tr.appendChild(createTableData(index + 1));
  tr.appendChild(createTableData(planet.name));
  tr.appendChild(createTableData(planet.rotation_period));
  tr.appendChild(createTableData(planet.orbital_period));
  tr.appendChild(createTableData(planet.diameter));

  tBody.appendChild(tr);
});

// Create element table data (TD) and return it
function createTableData(teksNode) {
  let td = document.createElement("TD");
  tdText = document.createTextNode(teksNode);

  td.appendChild(tdText);
  return td;
}
