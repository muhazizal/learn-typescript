// ** Using Types: number, string, boolean
// function sum(x: number, y: number, phrase: string, showResult: boolean) {
//   if (showResult) {
//     console.log(phrase + (x + y));
//   } else {
//     return x + y;
//   }
// }

// // let test: number
// // test = 100
// const x = 9;
// const y = 1;
// const phrase = "Result is: ";
// const showResult = true;

// sum(x, y, phrase, showResult);

// ** Using Types: object, array, tuples, enums, any
// enum Role {
//   ADMIN = 1,
//   CLIENT = 2,
// }

// // const anything: any = 1

// // const person: {
// //   name: string;
// //   age: number;
// //   hobbies: string[];
// //   foods: [string, string]; // tuples
// //   job: {
// //     title: string;
// //     salary: number;
// //   };
// // } = {
// const person = {
//   name: "Muhazizal",
//   age: 20,
//   hobbies: ["code", "anime", "movie", "workout"],
//   foods: ["Fried Rice", "Noodle"], // tuples
//   job: {
//     title: "Software Engineer",
//     salary: 5000000,
//   },
//   role: Role.ADMIN, // enum
// };

// for (const food of person.foods) {
//   console.log(food.toLowerCase());
// }

// console.log(person.role);

// ** Using Types: Union, Literal, Aliases
// type CombineTypes = number | string;
// type CombineConversion = "as-number" | "as-string";

// function combine(input1: CombineTypes, input2: CombineTypes, conversion: CombineConversion) {
//   typeof input1 === "number" && typeof input2 === "number";
//   if (conversion === "as-number") {
//     console.log(+input1 + +input2);
//   } else {
//     console.log(input1.toString() + input2.toString());
//   }
// }

// combine(1, 2, "as-number");
// combine(1, 2, "as-string");
// combine("satu", "dua", "as-string");

// ** Function Return Types & void
// function sum(x: number, y: number) {
//   return x + y;
// }

// function printResult(result: number): void {
//   console.log("Result: " + result);
// }

// printResult(sum(99, 1));

// ** Function Return as type
// let sumResult: (x: number, y: number) => number;
// sumResult = sum;

// console.log("sumResult: ", sumResult(20, 6));

// ** Function Callback
// function handleSumWithCallback(x: number, y: number, callback: (z: number) => void) {
//   const result = x + y;
//   return callback(result);
// }

// handleSumWithCallback(69, 1, (result) => {
//   console.log("Result with Callback: ", result);
//   return true;
// });

// ** Unknown type
// let userInput: unknown;
// let userName: string;

// userInput = 99;
// userName = "Muhazizal";

// if (typeof userInput === "string") {
//   userName = userInput;
// }

// ** Never type

function generateError(message: string, code: number): never {
  throw { message, code };
}

generateError("Error occured on Server", 500);
