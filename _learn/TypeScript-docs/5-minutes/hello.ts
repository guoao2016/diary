interface Person {
  firstName: string;
  lastName: string;
  fullName: string;
}

class Student {
  fullName: string;
  constructor(
    public firstName: string,
    public middleInitial: string,
    public lastName: string
  ) {
    this.fullName = `${firstName} ${middleInitial} ${lastName}`;
  }
}

function greeter(person: Person) {
  return `Hello, ${person.fullName}`;
}

let user = new Student("cody", "M.", "tang");

console.log(greeter(user));
