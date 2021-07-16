abstract class Department {
  protected employees: string[];
  static fiscalYear: string;

  constructor(protected readonly id: string, public name: string) {
    this.employees = [];
    // console.log(Department.fiscalYear)
  }

  abstract describe(this: Department): void;

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  showEmployee() {
    console.log("Employees Count:", this.employees.length);
    console.log("Employees:", this.employees);
  }

  static createEmployee(name: string) {
    return { name };
  }
}

class ITDepartment extends Department {
  constructor(id: string, name: string) {
    super(id, name);
  }

  describe() {
    console.log(`${this.name} Department - ${this.id}`);
  }
}

class AccountingDepartment extends Department {
  private reports: string[];
  private lastReport: string;
  private static instance: AccountingDepartment;

  private constructor(id: string, name: string) {
    super(id, name);
    this.reports = [];
    this.lastReport = "";
  }

  static getInstance(id: string, name: string) {
    if (AccountingDepartment.instance) {
      return this.instance;
    } else {
      this.instance = new AccountingDepartment(id, name);
      return this.instance;
    }
  }

  addReports(report: string) {
    this.reports.push(report);
    this.lastReport = report;
  }

  showReports() {
    console.log("Reports:", this.reports);
  }

  addSpecialEmployee(employee: string) {
    return employee === "Muhazizal"
      ? console.log("Not Allowed to Add Employee:", employee)
      : this.employees.push(employee);
  }

  describe() {
    console.log(`${this.name} Department - ${this.id}`);
  }

  set LAST_REPORT(payload: string) {
    if (payload) {
      this.lastReport = payload;
    } else {
      throw new Error("Please pass a valid report!");
    }
  }

  get LAST_REPORT() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error("Sorry, we dont have any report yet.");
  }
}

const accounting = AccountingDepartment.getInstance("d1", "Accounting");
const it = new ITDepartment("d2", "IT");

it.describe();
it.addEmployee("Muhazizal");
it.addEmployee("Raihan");
it.showEmployee();

accounting.addReports("BBCA Dibawah 30K");
accounting.describe();
accounting.showReports();
accounting.addSpecialEmployee("Muhazizal");
accounting.LAST_REPORT = "Here is my last report";
console.log(accounting.LAST_REPORT);

const employeeX = Department.createEmployee("Tian");
console.log("Employee X:", employeeX);
