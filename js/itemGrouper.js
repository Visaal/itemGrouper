"use strict";

class MasterItemList {
  constructor() {
    this.masterItemList = ["aa", "bb", "cc"];
  }
  addMasterItem(masterItem) {
    if (masterItem) {
      this.masterItemList.push(masterItem);
    }
  }
  showMasterItems(htmlListAreaId) {
    let masterItems = "";
    let showList = document.getElementById(htmlListAreaId);
    this.masterItemList.forEach(
      masterItem => (masterItems += masterItem + "<br />")
    );
    showList.innerHTML = masterItems;
  }
}

let masterList = new MasterItemList();

let addItemButton = document.getElementById("addItemButton");
addItemButton.addEventListener("click", function() {
  itemForm.classList.toggle("hide");
});

let itemForm = document.getElementById("itemForm");
itemForm.addEventListener("submit", event => {
  let itemToAdd = itemForm.elements["itemName"].value;
  masterList.addMasterItem(itemToAdd);
  masterList.showMasterItems("itemListArea");
  itemForm.reset();
  itemForm.classList.toggle("hide");
  event.preventDefault();
});
