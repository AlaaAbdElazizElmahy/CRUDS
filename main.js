let title = document.getElementById("title");
let price = document.getElementById("price");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let taxes = document.getElementById("taxes");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mode = "create";
let tmp;
//get total
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#040";
  } else {
    total.innerHTML = "";
    total.style.background = "#a00d02";
  }
}
//create product
//save localStorage
let dataPro;
if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}
submit.onclick = function () {
  let newPro = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };
  //count
  if (title.value != "" && price.value != "" && category.value != "" && newPro.count < 100) {
    
    if (mode === "create") {
      if (newPro.count > 1) {
        for (let j = 0; j < newPro.count; j++) {
          dataPro.push(newPro);
        }
      } else {
        dataPro.push(newPro);
      }
    } else {
      dataPro[tmp] = newPro;
      mode = "create";
      submit.innerHTML = "Create";
      count.style.display = "block";
    }
    clearData();
  }

  localStorage.setItem("product", JSON.stringify(dataPro));


  readPro();
};
//clear inputs
let clearData = function () {
  title.value = "";
  price.value = "";
  ads.value = "";
  taxes.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
};

//read

let readPro = function () {
  getTotal();
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    table += `
          <tr>
              <td>${i+1}</td>
              <td>${dataPro[i].title}</td>
              <td>${dataPro[i].price}</td>
              <td>${dataPro[i].taxes}</td>
              <td>${dataPro[i].ads}</td>
              <td>${dataPro[i].discount}</td>
              <td>${dataPro[i].total}</td>
              <td>${dataPro[i].category}</td>
              <td><button onclick="updateData(${i})" id="update">update</button></td>
              <td><button onclick="deletePro(${i})" id="delete">delete</button></td>
            </tr>
    `;
  }
  document.getElementById("tbody").innerHTML = table;
  let btnDelete = document.getElementById("deleteAll");
  if (dataPro.length > 0) {
    btnDelete.innerHTML = `
    <button onclick="deleteAll()">Delete All (${dataPro.length})</button>
    `;
  } else {
    btnDelete.innerHTML = "";
  }
};
readPro();
//delete
let deletePro = function (i) {
  dataPro.splice(i, 1);
  localStorage.product = JSON.stringify(dataPro);
  readPro();
};
let deleteAll = function () {
  dataPro = [];
  localStorage.product = JSON.stringify(dataPro);
  readPro();
};

//update
let updateData = function (i) {
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  category.value = dataPro[i].category;
  submit.innerHTML = "Update";
  count.style.display = "none";
  getTotal();
  mode = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
};

//search
let searchMode = "title";
function getSearchMode(id) {
  let search = document.getElementById("search");
  if (id === "searchTitle") {
    searchMode = "title";
  } else {
    searchMode = "category";
  }
  search.placeholder = "Search By " + searchMode;
  search.focus();
  search.value = "";
  readPro();
}
function searchData(value) {
  let table = "";
  for (i = 0; i < dataPro.length; i++) {
    if (searchMode === "title") {
      if (dataPro[i].title.toLowerCase().includes(value.toLowerCase())) {
        table += `
        <tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deletePro(${i})" id="delete">delete</button></td>
          </tr>
  `;
      }
    } else {
      if (dataPro[i].category.toLowerCase().includes(value.toLowerCase())) {
        table += `
        <tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deletePro(${i})" id="delete">delete</button></td>
          </tr>
  `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
//clean data
