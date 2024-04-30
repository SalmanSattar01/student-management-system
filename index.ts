import inquirer from "inquirer";

interface Student {
  name: string;
  id: string;
  courses: string[];
  balance: number;
}

const students: Student[] = [];
function generateStudentID(): string {
  return (10000 + Math.floor(Math.random() * 90000)).toString();
}

async function addStudent(): Promise<void> {
  const answers = await inquirer.prompt([
    { type: "input", name: "name", message: "Enter student name:" },
    {
      type: "checkbox",
      name: "courses",
      message: "Select courses to enroll:",
      choices: ["Math", "Science", "History", "English"],
    },
    { type: "input", name: "deposit", message: "Enter The Deposit:" },
  ]);

  const id = generateStudentID();
  let balance = 100000;
  balance = balance - answers.deposit
  students.push({ name: answers.name, id, courses: answers.courses, balance });
  console.log(`Student ${answers.name} added with ID ${id}`);
  await mainMenu();
}

async function viewStatus(): Promise<void> {
  const { id } = await inquirer.prompt([
    { type: "input", name: "id", message: "Enter student ID:" },
  ]);

  const student = students.find((s) => s.id === id);
  if (student) {
    console.log("Student Details:");
    console.log(`Name: ${student.name}`);
    console.log(`ID: ${student.id}`);
    console.log(`Courses Enrolled: ${student.courses.join(", ")}`);
    console.log(`Balance: ${student.balance}`);
  } else {
    console.log("Student not found!");
  }
  await mainMenu();
}
 
async function makePayment(): Promise<void> {
    const  { id , payment}   = await inquirer.prompt([
      { type: "input", name: "id", message: "Enter student ID:" },
      { type: "input", name: "payment", message: "Enter Fee Payment:" }
    ]);
  
    const student = students.find((s) => s.id === id);
    if (student) {
      student.balance -= parseFloat(payment)
      console.log(`You have made the payment of Rs. ${payment} succesfully deducted from you balance` )
      console.log(`Your Current Balance is ${student.balance}`)
           } else {
      console.log("Student not found!");
    }
    await mainMenu();
  }

  async function viewBalance(): Promise<void> {
    const  { id }   = await inquirer.prompt([
      { type: "input", name: "id", message: "Enter student ID:" },
    ]);
  
    const student = students.find((s) => s.id === id);
    if (student) {
      console.log(`Your Current Balance is ${student.balance}`)
           } else {
      console.log("Student not found!");
    }
    await mainMenu();
  }

async function mainMenu(): Promise<void> {
  const { action } = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "Choose an action:",
      choices: ["Add Student", "View Status","Make Payment","View Balance", "Exit"],
    },
  ]);

  switch (action) {
    case "Add Student":
      await addStudent();
      break;
    case "View Status":
      await viewStatus();
      break;
    case "Make Payment":
      await makePayment();
      break;  
    case "View Balance":
      await viewBalance();
      break;  
    case "Exit":
      console.log("Thanks for using Student Management System");
      process.exit(0);
  }
}

async function main(): Promise<void> {
  console.log("Welcome to Student Management System");
  await mainMenu();
}

main();
