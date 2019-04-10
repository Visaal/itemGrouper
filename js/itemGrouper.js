"use strict";

class MasterItemList {
  constructor() {
    this.masterItemList = {};
    this.itemUlList = document.querySelector("#itemListArea ul");
  }
  createListItem(masterItem, masterList, masterItemSymbol) {
    let listItem = document.createElement("li");
    let text = document.createTextNode(masterItem);
    var attributesButton = document.createElement("button");
    attributesButton.innerText = "Associate";
    attributesButton.addEventListener("click", function() {
      // calling method from within another method - passed the masterList context into the button
      masterList.deleteMasterItem(listItem, masterItemSymbol);
    });
    attributesButton.id = masterItem;
    listItem.appendChild(text);
    this.itemUlList.appendChild(listItem);
    listItem.appendChild(attributesButton);
  }
  addMasterItem(masterItem, masterList) {
    if (masterItem) {
      let masterItemSymbol = Symbol(masterItem);
      this.masterItemList[masterItemSymbol] = masterItem;
      this.createListItem(masterItem, masterList, masterItemSymbol);
    }
  }
  showMasterItems(htmlListAreaId) {
    Object.keys(this.masterItemList).forEach(masterItem => {
      this.createListItem(this.masterItemList[masterItem]);
    });
  }
  deleteMasterItem(listItem, masterItemSymbol) {
    let ul = listItem.parentNode;
    ul.removeChild(listItem);
    delete this.masterItemList[masterItemSymbol];
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
  masterList.addMasterItem(itemToAdd, masterList);
  itemForm.reset();
  itemForm.classList.toggle("hide");
  event.preventDefault();
});

window.addEventListener("load", masterList.showMasterItems());
