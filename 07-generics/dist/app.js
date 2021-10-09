"use strict";
const names = [];
const promise = new Promise((resolve, reject) => {
    if (names.length > 0) {
        setTimeout(() => {
            resolve("This is array of string");
        }, 1000);
    }
    else {
        reject("Array is empty");
    }
});
console.log("-------------------------------------------------");
function mergeObject(objA, objB) {
    return Object.assign(objA, objB);
}
const objA = {
    name: "Muhazizal",
};
const objB = {
    age: 21,
};
const mergedObjectResult = mergeObject(objA, objB);
console.log("Merged Object:", mergedObjectResult);
console.log("-------------------------------------------------");
function mergeArray(arrA, arrB) {
    return arrA.concat(arrB);
}
const arrA = ["One"];
const arrB = ["Two"];
const mergedArrayResult = mergeArray(arrA, arrB);
console.log("Merged Array: ", mergedArrayResult);
console.log("-------------------------------------------------");
function countAndDescribe(element) {
    let descriptionText = "Got no value.";
    if (element.length === 1) {
        descriptionText = "Got 1 element.";
    }
    else if (element.length > 1) {
        descriptionText = `Got ${element.length} elements.`;
    }
    return [element, descriptionText];
}
console.log("Count and Describe: ", countAndDescribe(["Hello", "Aziz"]));
console.log("-------------------------------------------------");
function extractAndConvert(obj, key) {
    return `Value: ${obj[key]}`;
}
console.log("Extract And Convert:", extractAndConvert({ name: "Muhazizal" }, "name"));
console.log("-------------------------------------------------");
class DataStorage {
    constructor() {
        this.data = [];
    }
    addItem(item) {
        this.data.push(item);
    }
    removeItem(item) {
        this.data.splice(this.data.indexOf(item), 1);
    }
    getItems() {
        return this.data;
    }
}
const textStorage = new DataStorage();
textStorage.addItem("Burger");
textStorage.addItem("Hotdog");
textStorage.removeItem("Hotdog");
console.log("Text Storage:", textStorage.getItems());
const numberStorage = new DataStorage();
numberStorage.addItem(1);
numberStorage.addItem(26);
numberStorage.removeItem(1);
console.log("Number Storage:", numberStorage.getItems());
console.log("-------------------------------------------------");
function createVehicle(title, year, manual) {
    const vehicleResult = {};
    vehicleResult.name = title;
    vehicleResult.year = year;
    vehicleResult.manual = manual;
    return vehicleResult;
}
const HKEsquad = ["Muhazizal", "Raihan", "Bram", "Tian", "Ali"];
//# sourceMappingURL=app.js.map