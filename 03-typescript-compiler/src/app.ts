console.log("Time to get started.....");

// comment here
const today: number = 8;

function clickHandler(message: string): void {
  alert(message);
}

const alertBtn = document.querySelector("#alert-btn")!;
alertBtn.addEventListener("click", clickHandler.bind(null, "Hi Muhazizal"));
