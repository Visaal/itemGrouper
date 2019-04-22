"use strict";

class MasterItemList {
  constructor() {
    this.masterItemList = {};
    this.masterItemAttributes = {};
    this.itemUlList = document.querySelector("#itemListArea ul");
  }
  createListItem(masterItem, masterList, masterItemSymbol) {
    let listItem = document.createElement("li");
    let tab = document.createTextNode("\t");
    let itemNameText = document.createTextNode(masterItem["itemName"]);
    let itemTypeText = document.createTextNode(masterItem["itemType"]);
    var attributesButton = document.createElement("button");
    attributesButton.innerText = "delete";
    attributesButton.addEventListener("click", function() {
      // calling method from within another method - passed the masterList context into the button
      masterList.deleteMasterItem(listItem, masterItemSymbol);
    });
    attributesButton.id = masterItem["itemName"];
    listItem.appendChild(itemNameText);
    listItem.appendChild(tab);
    listItem.appendChild(itemTypeText);
    this.itemUlList.appendChild(listItem);
    listItem.appendChild(attributesButton);
  }
  addMasterItem(masterItem, masterList) {
    if (masterItem["itemName"]) {
      let masterItemSymbol = Symbol(masterItem["itemName"]);
      this.masterItemList[masterItemSymbol] = masterItem;
      this.createListItem(masterItem, masterList, masterItemSymbol);
    }
  }
  deleteMasterItem(listItem, masterItemSymbol) {
    let ul = listItem.parentNode;
    ul.removeChild(listItem);
    delete this.masterItemList[masterItemSymbol];
  }
}

let addItemButton = document.getElementById("addItemButton");
addItemButton.addEventListener("click", function() {
  itemForm.classList.toggle("hide");
});

function createHtmlElementOnForm(
  appendTo,
  elementType,
  type,
  name,
  id,
  ...innerText
) {
  let newElement = document.createElement(elementType);
  newElement.setAttribute("type", type);
  newElement.setAttribute("name", name);
  newElement.setAttribute("id", id);
  if (innerText) {
    newElement.innerText = innerText[0];
  }
  return appendTo.appendChild(newElement);
}

let masterList = new MasterItemList();

let addAttributesButton = document.getElementById("addAttributesButton");
addAttributesButton.addEventListener("click", function() {
  let itemForm = document.getElementById("itemForm");

  // Create fields to add attributes - fields only added once
  if (!itemForm.elements["attributeName"]) {
    // Create 'attribute name' field
    let attributeName = createHtmlElementOnForm(
      itemForm,
      "input",
      "text",
      "attributeName",
      "attributeName"
    );

    // Create 'attribute value' field
    let attributeValue = createHtmlElementOnForm(
      itemForm,
      "input",
      "text",
      "attributeValue",
      "attributeValue"
    );

    // Button to save the attibute value
    let storeAttribute = createHtmlElementOnForm(
      itemForm,
      "button",
      "button",
      "storeAttributeButton",
      "storeAttributeButton",
      "Save Attribute"
    );

    storeAttribute.addEventListener("click", function() {
      if (attributeName.value && attributeValue.value) {
        masterList.masterItemAttributes[attributeName.value] =
          attributeValue.value;
        attributeName.value = null;
        attributeValue.value = null;
      }
    });
  }
});

let itemForm = document.getElementById("itemForm");
itemForm.addEventListener("submit", event => {
  let itemToAdd = {};
  itemToAdd["itemType"] = itemForm.elements["itemType"].value;
  itemToAdd["itemName"] = itemForm.elements["itemName"].value;
  itemToAdd["startDate"] = itemForm.elements["startDate"].value;
  itemToAdd["endDate"] = itemForm.elements["endDate"].value;
  itemToAdd["attributes"] = masterList.masterItemAttributes;

  masterList.addMasterItem(itemToAdd, masterList);
  itemForm.reset();
  masterList.masterItemAttributes = {};
  itemForm.classList.toggle("hide");
  event.preventDefault();
});
