let tBody = document.getElementById("table-body");
let dropDownItems = document.querySelectorAll(".dropdown-item");
let dropDownButton = document.querySelector(".dropdown-toggle");
let btnFilter = document.getElementById("btn-filter");
let filterContainer = document.getElementById("filter-container");
let inputValueFiltersBy = document.querySelectorAll(".filter-by");

// Load planet_list object from planet_list.js
let planetList = planet_list;

// Show tables row & by default sorting by "name"
sortTableRow("name");
// by default highlight "Name" columns
highLightTableColumns("name");

// sort an array of objects by a property value
// but when the property value  is same, sorting again by "name"
function sortTableRow(objKeyAttribute) {
  if (objKeyAttribute === "name") {
    planetList.sort((a, b) => (a.name > b.name ? 1 : -1));
  } else {
    planetList.sort((a, b) =>
      parseInt(a[objKeyAttribute]) > parseInt(b[objKeyAttribute])
        ? 1
        : a[objKeyAttribute] === b[objKeyAttribute]
        ? a.name > b.name
          ? 1
          : -1
        : -1
    );
  }

  showTableRow();
}

// After sorting, show tables row
function showTableRow() {
  // Remove all old tables rows, before append new table
  resetTableBody();

  // Create new table row from planetlist data, and append it to table (tBody)
  planetList.forEach((planet, index) => {
    let tr = document.createElement("TR");

    tr.appendChild(createTableData(index + 1, `${index + 1}`));
    tr.appendChild(createTableData(planet.name, "name"));
    tr.appendChild(createTableData(planet.rotation_period, "rotation_period"));
    tr.appendChild(createTableData(planet.orbital_period, "orbital_period"));
    tr.appendChild(createTableData(planet.diameter, "diameter"));

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
function createTableData(teksNode, objectKey) {
  let td = document.createElement("TD");
  td.className = objectKey;

  let tdText = document.createTextNode(teksNode);

  td.appendChild(tdText);
  return td;
}

// Dropdown event listener for sorting table row
dropDownItems.forEach(dropDown => {
  dropDown.addEventListener("click", () => {
    // dropDown.getAttribute("object_key") is same with planetList key object
    sortTableRow(dropDown.getAttribute("object_key"));

    // Highlight filter table columns
    highLightTableColumns(dropDown.getAttribute("object_key"));

    // Update selected dropdown label
    dropDownButton.innerHTML = `<img src="./images/sort_asc.png"> ${
      dropDown.textContent
    }`;
  });
});

function highLightTableColumns(objectKeyAttr) {
  tBody.childNodes.forEach(tr => {
    tr.childNodes.forEach(td => {
      if (td.className === `${objectKeyAttr}`) {
        td.classList.toggle(`planet-${objectKeyAttr}`);
      }
    });
  });
}

// Show / hide filter container table
btnFilter.addEventListener("click", () => {
  filterContainer.classList.toggle("view-gone");
});

// ============ Filter =======================
// Handle every input value from column input filter form
inputValueFiltersBy.forEach(input => {
  input.addEventListener("keyup", () => filterTableByColumn(input));
});

// Filter planetList by value from input filter form
function filterTableByColumn(filterBy) {
  planetList = planet_list;

  // Check if input value filter contains/includes in planetList object array
  planetList = planetList.filter(planet =>
    // filterBy.placeholder is same with planetList key object
    planet[filterBy.placeholder]
      .toLocaleLowerCase()
      .includes(filterBy.value.toLocaleLowerCase())
  );

  // Update new table data after filtering
  showTableRow();
}
// ============ End Filter =======================
