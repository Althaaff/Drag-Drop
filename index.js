const draggable_list = document.getElementById("draggable-list");
// console.log(" element:", draggable_list);
const check = document.getElementById("check");

const richestPeople = [
  "Jeff Bezos",
  "Bill Gates",
  "Warren Buffett",
  "Bernard Arnault",
  "Carlos Slim",
  "Ratan Tata",
  "Larry Ellison",
  "Mark ZuckerBurg",
  "Michel BloomBurg",
  "Larry Page",
];

const listItems = [];
console.log("listItems :", listItems);

let dragStartIndex;

// create one function named as createList :
createList();

function createList() {
  [...richestPeople]
    .map((a) => ({
      value: a,
      sort: Math.random(),
    }))
    .sort((a, b) => {
      // console.log("sorted :", a.sort - b.sort);
      return a.sort - b.sort;
    })
    .map((a) => a.value)
    .forEach((person, index) => {
      const listItem = document.createElement("li");

      listItem.setAttribute("data-index", index); // 'li' element custom attribute is 'data-index' then index value is assigned to that 'data-index'
      // console.log("person :", person, "index :", index);

      listItem.innerHTML = `<span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
          <p class="person-name">${person}</p>
          <i class="fas fa-grip-lines"></i>
        </div>`;

      listItems.push(listItem);

      draggable_list.appendChild(listItem);
    });

  addEventListeners();
  console.log("draggable_list :", draggable_list);
}

function dragStart() {
  dragStartIndex = +this.closest("li").getAttribute("data-index");

  console.log("drag started from here -->", dragStartIndex);
}

function dragEnter() {
  this.classList.add("over");
}

function dragLeave() {
  this.classList.remove("over");
}

function dragOver(e) {
  e.preventDefault();
}

function dragDrop() {
  const dragEndIndex = +this.getAttribute("data-index");

  swapItems(dragStartIndex, dragEndIndex);
  this.classList.remove("over");
  // console.log("drag End Index : ", dragEndIndex);
}

function swapItems(fromIndex, toIndex) {
  const item1 = listItems[fromIndex].querySelector(".draggable");
  const item2 = listItems[toIndex].querySelector(".draggable");

  listItems[fromIndex].appendChild(item2);
  listItems[toIndex].appendChild(item1);
}

// Check the order of list items
function checkOrder() {
  listItems.forEach((listItem, index) => {
    const personName = listItem.querySelector(".draggable").innerText.trim();
    console.log("personName: ", personName);

    if (personName !== richestPeople[index]) {
      listItem.classList.add("wrong");
    } else {
      listItem.classList.remove("wrong");
      listItem.classList.add("right");
    }
  });
}

function addEventListeners() {
  const draggables = document.querySelectorAll(".draggable");

  const draggableItems = document.querySelectorAll(".draggable-list li");
  console.log("list :", draggable_list);

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart);
  });

  draggableItems.forEach((item) => {
    item.addEventListener("dragover", dragOver);
    item.addEventListener("drop", dragDrop);
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragleave", dragLeave);
  });
}

check.addEventListener("click", checkOrder);

// console.log("map used for richestPeople:", { value: a, sort: Math.random(),});
// console.log("sorted list :", sortedList);
