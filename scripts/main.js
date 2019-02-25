let tBody = document.getElementById("table-body");
let dropDownItems = document.querySelectorAll(".dropdown-item");
var dropDownButton = document.querySelector(".dropdown-toggle");

// Load planet_list object from planet_list.js
let planetList = planet_list;

//Show tables row
//by default sorting by "name"
sortTableRow("Name");

// sort an array of objects by a property value
// but when the property value  is same, sorting again by "name"
function sortTableRow(textContent) {
  if (textContent == "Name") {
    planetList.sort((a, b) => (a.name > b.name ? 1 : -1));
  } else if (textContent == "Rotation Period") {
    planetList.sort((a, b) =>
      parseInt(a.rotation_period) > parseInt(b.rotation_period)
        ? 1
        : a.rotation_period === b.rotation_period
        ? a.name > b.name
          ? 1
          : -1
        : -1
    );
  } else if (textContent == "Orbital Period") {
    planetList.sort((a, b) =>
      parseInt(a.orbital_period) > parseInt(b.orbital_period) ? 1 : -1
    );
  } else if (textContent == "Diameter") {
    planetList.sort((a, b) =>
      parseInt(a.diameter) > parseInt(b.diameter) ? 1 : -1
    );
  } else if (textContent == "Surface Water") {
    planetList.sort((a, b) =>
      parseInt(a.surface_water) > parseInt(b.surface_water) ? 1 : -1
    );
  }

  showTableRow();
}

// After sorting, show tables row
function showTableRow() {
  // Remove all old tables rows
  // Before append new table
  resetTableBody();

  // Create new table row from planetlist data
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
}

// Reset / remove all tables row in table (tBody)
function resetTableBody() {
  while (tBody.childNodes.length > 0) {
    tBody.lastChild.remove();
  }
}

// Create element table data (TD) and return it
function createTableData(teksNode) {
  let td = document.createElement("TD");
  tdText = document.createTextNode(teksNode);

  td.appendChild(tdText);
  return td;
}

// Dropdown event listener for sorting table row
dropDownItems.forEach(dropDown => {
  dropDown.addEventListener("click", () => {
    sortTableRow(dropDown.textContent);

    // Update selected dropdown label
    dropDownButton.innerHTML = `<img src="./images/sort_asc.png"> ${
      dropDown.textContent
    }`;
  });
});
