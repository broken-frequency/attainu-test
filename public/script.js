var divContainer = document.getElementById("table-container");
divContainer.innerHTML = "";
$.getJSON(document.URL + "users", function(data) {
  //get the json file
  let users = data.users;
  //console.log(users);

  // HTML Table Header Extraction
  let tableHeaders = JSON.parse(JSON.stringify(data.headers));
  let headerArray = [];

  tableHeaders.map(function(header) {
    headerArray.push(header);
  });

  users.map(function(user, index) {
    user["id"] = index + 1;
    var result = Object.keys(user).reduce(
      (r, k, i) => ((r[i] = user[k]), r),
      []
    );
    result.push(result.shift());
    user = Object.assign({}, result);
  });

  //Creating dynamic heading
  var h1 = document.createElement("h1");
  h1.className = "text-center";
  h1.innerHTML = data.appName;
  divContainer.appendChild(h1);
  // Creating table tag dynamically
  var table = $("<table/>")
    .attr({ class: "table" })
    .appendTo("#table-container");
  //table.className = "table";

  // Creating thead tag
  var thead = $("<thead/>")
    .attr({ class: "thead-dark" })
    .appendTo(table);

  // creating table header rows using extracted values
  var tr = $("<tr/>").appendTo(thead); // TABLE ROW.
  for (var i = 0; i < headerArray.length; i++) {
    var th = $("<th/>")
      .text(`${headerArray[i]}`)
      .appendTo(tr); // TABLE HEADER.
  }
  headerArray.pop();
  //Creating tbody and td
  var tbody = $("<tbody/>")
    .attr({ id: "items" })
    .appendTo(table);
  for (var i = 0; i < users.length; i++) {
    var tr2 = $("<tr/>").appendTo(tbody);
    for (var j = 0; j < headerArray.length; j++) {
      //console.log(users[i]);
      $("<td/>")
        .text(`${users[i][headerArray[j].toLowerCase()]}`)
        .appendTo(tr2);
      //TODO append tab cells with populated users data
      //console.log(headerArray[j]);
    }
    var buttonTd = $("<td/>").appendTo(tr2);
    $("<button/>")
      .text("Delete")
      .attr({ class: "btn btn-danger delete" })
      .appendTo(buttonTd);
  }

  // To Delete items
  var itemList = document.getElementById("items");
  itemList.addEventListener("click", removeItem);
  function removeItem(e) {
    if (e.target.classList.contains("delete")) {
      if (confirm("are you sure?")) {
        var li = e.target.parentElement.parentElement;
        itemList.removeChild(li);
      }
    }
  }
});
