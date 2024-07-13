let arrayOfNames = [];
let input = document.querySelector("input");
let buttons = document.getElementsByTagName("button");
let output = document.querySelector(".output");
let check = document.querySelector(".check");
let add = document.querySelector(".add");
let Delete = document.querySelector(".delete");
let show = document.querySelector(".show");

if (localStorage.getItem("Names")) {
  arrayOfNames = JSON.parse(localStorage.getItem("Names"));
} else {
  output.innerHTML = "Local Storage Is Empty";
}

function showMessage() {
  output.innerHTML = "Input Can't Be Empty";
}

add.addEventListener("click", function () {
  if (input.value) {
    if ([...arrayOfNames.values().map((e) => e.name)].includes(input.value)) {
      output.innerHTML = `This Item <span>${input.value}</span> Is in Local Storage, Give me Another Name`;
    } else {
      arrayOfNames.push({ name: input.value });
      addNamesToLocalStorage(arrayOfNames);
      output.innerHTML = `Local Storage Item <span>${input.value}</span> Added`;
      input.value = "";
    }
  } else {
    showMessage();
  }
});

show.addEventListener("click", function () {
  if (localStorage.getItem("Names")) {
    output.innerHTML = "";
    for (let element of arrayOfNames) {
      output.innerHTML += `<p>${element.name}</p>`;
    }
  } else {
    output.innerHTML = "Local Storage Is Empty";
  }
});

check.addEventListener("click", function () {
  if (input.value) {
    if ([...arrayOfNames.values().map((e) => e.name)].includes(input.value)) {
      output.innerHTML = `Found Local Storage Item Called <span>${input.value}</span>`;
    } else {
      output.innerHTML = `No Local Storage Item with This name <span>${input.value}</span>`;
    }
  } else {
    showMessage();
  }
});

Delete.addEventListener("click", function () {
  if (input.value) {
    if (!localStorage.getItem("Names")) {
      output.innerHTML = "Local Storage Is Empty";
    } else {
      if ([...arrayOfNames.values().map((e) => e.name)].includes(input.value)) {
        arrayOfNames = [
          ...arrayOfNames.values().filter((e) => e.name != input.value),
        ];
        addNamesToLocalStorage(arrayOfNames);
        output.innerHTML = `Delete Local Storage Item <span>${input.value}</span>`;
        input.value = "";
      } else {
        output.innerHTML = `No Local Storage Item with This name <span>${input.value}</span>`;
      }
    }
  } else {
    showMessage();
  }
});

function addNamesToLocalStorage(arrayOfNames) {
  localStorage.setItem("Names", JSON.stringify(arrayOfNames));
  if (!JSON.parse(localStorage.getItem("Names")).length) {
    localStorage.clear();
  }
}
