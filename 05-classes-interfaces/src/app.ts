interface AddFn {
  (x: number, y: number): number;
}

let add: AddFn;

add = (x: number, y: number) => {
  return x + y;
};

interface Skills {
  skills: string[];
  outputSkills?: string[];
}

interface Developer extends Skills {
  readonly name: string;
  greet(phrase: string): void;
}

class Person implements Developer {
  public name: string;
  public skills: string[];
  public age: number = 30;

  constructor(name: string) {
    this.name = name;
    this.skills = [];
  }

  greet(phrase: string) {
    console.log(`${phrase} ${this.name}`);
  }
}

const user1 = new Person("Muhazizal");

user1.greet("Hi there! My name is");
