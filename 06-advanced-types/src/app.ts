// Type
type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  age: number;
};

type DevOps = Admin & Employee;

const e1: DevOps = {
  name: "Budi",
  age: 20,
  privileges: ["maintenance-server"],
};

type Combineable = string | number;
type Numeric = number | boolean;

type Universal = Combineable & Numeric;
console.log("-------------------------------------------------");
// end of Type

// Type Guards
type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
  console.log("Name:", emp.name);
  if ("privileges" in emp) {
    console.log("Privileges: ", emp.privileges);
  }
  if ("age" in emp) {
    console.log("Age: ", emp.age);
  }
}

printEmployeeInformation(e1);

class Car {
  drive() {
    console.log("Driving a car...");
  }
}

class Truck {
  drive() {
    console.log("Driving a truck...");
  }

  loadCargo(amount: number) {
    console.log("Load cargo with amount: ", amount);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  if (vehicle instanceof Truck) {
    vehicle.loadCargo(10);
  }
}

useVehicle(v1);
useVehicle(v2);
console.log("-------------------------------------------------");
// end of Type Guards

// Discriminated Union
interface Bird {
  type: "bird";
  flyingSpeed: number;
}

interface Horse {
  type: "horse";
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed;
  switch (animal.type) {
    case "bird":
      speed = animal.flyingSpeed;
      break;
    case "horse":
      speed = animal.runningSpeed;
      break;
    default:
      speed = 0;
      break;
  }
  if (speed === 0) {
    throw new Error("No Animal");
  } else {
    console.log("The animal move at speed: ", speed);
  }
}

moveAnimal({ type: "bird", flyingSpeed: 100 });
console.log("-------------------------------------------------");
// end of Discriminated Union

// Type Casting
const inputName = document.querySelector("#input-name") as HTMLInputElement;
const btnSubmit = document.querySelector("#btn-submit") as HTMLButtonElement;

inputName.value = "Muhazizal";
btnSubmit.addEventListener("click", () => {
  alert(inputName.value);
});
// end of Type Casting

// Index Property
interface ErrorContainer {
  [props: string]: string;
}

const errorMessages: ErrorContainer = {
  username: "Not a valid username",
  usernameEmpty: "Username is required",
  email: "Not a valid email",
};

console.log(errorMessages);
console.log("-------------------------------------------------");
// end of Index Property

// Function Overloads
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: Combineable, b: Combineable) {
  // part of Type Guard
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

const result = add("Muhammad", "Aziz");
console.log("Result Add Function: ", result.toUpperCase());
console.log("-------------------------------------------------");
// end of Function Overloads

// Optional Chaining
const data = {
  name: "Muhazizal",
  age: 20,
  job: {
    title: "Software Engineer",
  },
};

console.log(data?.job?.title);
console.log("-------------------------------------------------");
// end of Optional Chaining

// Nullish Coalescing
const nullishCoalescing = {};

console.log(nullishCoalescing ?? "DEFAULT");
console.log("-------------------------------------------------");
// end of Nullish Coalescing
