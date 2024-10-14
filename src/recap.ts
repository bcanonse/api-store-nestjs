class Person {
  constructor(
    private age: number,
    private name: string,
  ) {}

  getSummary() {
    return `The name is ${this.name} of ${this.age} years old`;
  }
}

const bcanon = new Person(28, 'Bryan');

console.log(bcanon.getSummary());
