"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
function Logger(log) {
    return function (constructor) {
        console.log(log);
        console.log(constructor);
    };
}
function WithTemplate(template, hookId) {
    console.log("TEMPLATE FACTORY");
    return function (originalConstructor) {
        return class extends originalConstructor {
            constructor(..._) {
                super();
                console.log("RENDERING TEMPLATE");
                const hookEl = document.getElementById(hookId);
                if (hookEl) {
                    hookEl.innerHTML = template;
                    hookEl.querySelector("h2").textContent = this.name;
                }
            }
        };
    };
}
let Person = class Person {
    constructor() {
        this.name = "Muhazizal";
        console.log("Creating an object...");
    }
    greeting() {
        console.log(`Hello My Name is ${this.name}`);
    }
};
Person = __decorate([
    WithTemplate("<h2>Hook El with Template</h2>", "app")
], Person);
const developer = new Person();
console.log(developer);
console.log("-------------------------------------------------");
function Log(target, name) {
    console.log("Property Decorator!");
    console.log(target, name);
}
function Log2(target, name, descriptor) {
    console.log("Accessor Decorator!");
    console.log(target);
    console.log(name);
    console.log(descriptor);
    return { value: "PropertyDescriptor" };
}
function Log3(target, name, descriptor) {
    console.log("Method Decorator!");
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
function Log4(target, name, position) {
    console.log("Parameter Decorator!");
    console.log(target);
    console.log(name);
    console.log(position);
}
class Product {
    constructor(title, price) {
        this.title = title;
        this._price = price;
    }
    set price(price) {
        if (price > 0) {
            this._price = price;
        }
        else {
            throw new Error("Invalid Price - should be Positive");
        }
    }
    get price() {
        return this._price;
    }
    getPriceWithTax(tax) {
        return this._price * (1 + tax);
    }
}
__decorate([
    Log
], Product.prototype, "title", void 0);
__decorate([
    Log2
], Product.prototype, "price", null);
__decorate([
    Log3,
    __param(0, Log4)
], Product.prototype, "getPriceWithTax", null);
console.log("-------------------------------------------------");
function Autobind(target, name, descriptor) {
    console.log("Target:", target);
    console.log("Name:", name);
    const originalMethod = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        },
    };
    return adjDescriptor;
}
class Printer {
    constructor() {
        this.message = "This Works";
        console.log("Rendering Printer");
    }
    showMessage() {
        console.log(this.message);
    }
}
__decorate([
    Autobind
], Printer.prototype, "showMessage", null);
const printer = new Printer();
const button = document.querySelector("button");
button.addEventListener("click", printer.showMessage);
console.log("-------------------------------------------------");
const validators = {};
function Required(target, propName) {
    var _a, _b;
    validators[target.constructor.name] = Object.assign(Object.assign({}, validators[target.constructor.name]), { [propName]: [...((_b = (_a = validators[target.constructor.name]) === null || _a === void 0 ? void 0 : _a[propName]) !== null && _b !== void 0 ? _b : []), "required"] });
}
function PositiveNumber(target, propName) {
    var _a, _b;
    validators[target.constructor.name] = Object.assign(Object.assign({}, validators[target.constructor.name]), { [propName]: [...((_b = (_a = validators[target.constructor.name]) === null || _a === void 0 ? void 0 : _a[propName]) !== null && _b !== void 0 ? _b : []), "positive"] });
}
function validate(payload) {
    const validatorConfig = validators[payload.constructor.name];
    if (!validatorConfig) {
        return true;
    }
    let isValid = true;
    for (const prop in validatorConfig) {
        for (const validator in validatorConfig[prop]) {
            switch (validator) {
                case "required":
                    isValid = isValid && !!payload[prop];
                case "positive":
                    isValid = isValid && payload[prop] > 0;
            }
        }
    }
    return isValid;
}
class Course {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }
}
__decorate([
    Required
], Course.prototype, "title", void 0);
__decorate([
    PositiveNumber
], Course.prototype, "price", void 0);
const courseForm = document.querySelector("form");
courseForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const titleEl = document.getElementById("title");
    const priceEl = document.getElementById("price");
    const title = titleEl.value;
    const price = +priceEl.value;
    const createdCourse = new Course(title, price);
    if (!validate(createdCourse)) {
        alert("Invalid input, please try again");
        return;
    }
    else {
        console.log(createdCourse);
    }
    console.log("-------------------------------------------------");
});
//# sourceMappingURL=app.js.map