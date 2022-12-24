'use strict';

const emplyeeArr = [
  {
    id: 1,
    name: 'Денис',
    surname: 'Хрущ',
    salary: 1010,
    workExperience: 10, /// стаж работы (1 = один месяц)
    isPrivileges: false, /// льготы
    gender: 'male',
  },
  {
    id: 2,
    name: 'Сергей',
    surname: 'Войлов',
    salary: 1200,
    workExperience: 12, /// стаж работы (1 = один месяц)
    isPrivileges: false, /// льготы
    gender: 'male',
  },
  {
    id: 3,
    name: 'Татьяна',
    surname: 'Коваленко',
    salary: 480,
    workExperience: 3, /// стаж работы (1 = один месяц)
    isPrivileges: true, /// льготы
    gender: 'female',
  },
  {
    id: 4,
    name: 'Анна',
    surname: 'Кугир',
    salary: 2430,
    workExperience: 20, /// стаж работы (1 = один месяц)
    isPrivileges: false, /// льготы
    gender: 'female',
  },
  {
    id: 5,
    name: 'Татьяна',
    surname: 'Капустник',
    salary: 3150,
    workExperience: 30, /// стаж работы (1 = один месяц)
    isPrivileges: true, /// льготы
    gender: 'female',
  },
  {
    id: 6,
    name: 'Станислав',
    surname: 'Щелоков',
    salary: 1730,
    workExperience: 15, /// стаж работы (1 = один месяц)
    isPrivileges: false, /// льготы
    gender: 'male',
  },
  {
    id: 7,
    name: 'Денис',
    surname: 'Марченко',
    salary: 5730,
    workExperience: 45, /// стаж работы (1 = один месяц)
    isPrivileges: true, /// льготы
    gender: 'male',
  },
  {
    id: 8,
    name: 'Максим',
    surname: 'Меженский',
    salary: 4190,
    workExperience: 39, /// стаж работы (1 = один месяц)
    isPrivileges: false, /// льготы
    gender: 'male',
  },
  {
    id: 9,
    name: 'Антон',
    surname: 'Завадский',
    salary: 790,
    workExperience: 7, /// стаж работы (1 = один месяц)
    isPrivileges: false, /// льготы
    gender: 'male',
  },
  {
    id: 10,
    name: 'Инна',
    surname: 'Скакунова',
    salary: 5260,
    workExperience: 49, /// стаж работы (1 = один месяц)
    isPrivileges: true, /// льготы
    gender: 'female',
  },
  {
    id: 11,
    name: 'Игорь',
    surname: 'Куштым',
    salary: 300,
    workExperience: 1, /// стаж работы (1 = один месяц)
    isPrivileges: false, /// льготы
    gender: 'male',
  },
];

const Emploee = function (employee) {
  //////////// Задача 1 ////////////

  // Создать функцию - конструктор, которая будет иметь внутри все
  // свойства обьекта emplyee из массива emplyeeArr;

  //////////// Решение ////////////

  for (const key in employee) {
    this[key] = employee[key];
  }

  //////////// Задача 2 ////////////

  // Добавить функции - конструктору метод (помним про prototype):
  // getFullName который вернет полное имя начиная с фамилии в виде строки

  //////////// Решение ////////////

  this.getFullName = function () {
    return this.surname + ' ' + this.name;
  };

  //////////// Задача 7 ////////////

  // Создать дескриптор со свойством fullInfo который будет записывать
  // все свойства переданные ему в экземпляр от которого он вызывается. И
  // выдавать все свойства, если к нему обратиться, в виде строки <Название
  // свойства> - <значение> через запятую.

  //////////// Решение ////////////

  Object.defineProperty(this, 'fullInfo', {
    get() {
      let arr = [];
      for (const key in this) {
        typeof this[key] !== 'function' && arr.push(`${key} - ${this[key]}`);
      }
      return arr.join(', ');
    },

    set(properties) {
      for (const property in properties) {
        if (this.hasOwnProperty(property)) {
          this[property] = properties[property];
        }
      }
    },
  });
};

const employeeObj = new Emploee(emplyeeArr[0]);
console.log('Task 1 =>');
console.log(employeeObj);
console.log('Task 2 =>');
console.log(employeeObj.getFullName());

//////////// Задача 3 ////////////

// Создать новый массив на основе emplyeeArr в котором будут содержаться
// те же обьекты, но созданные функцией - конструктором Emploee. Новый массив
// должен содержать имя emplyeeConstructArr.

//////////// Решение ////////////

let createEmployesFromArr = (arr) => {
  const emplyeeConstructArr = [];
  for (const employee of arr) {
    const newEmployee = new Emploee(employee);
    emplyeeConstructArr.push(newEmployee);
  }
  return emplyeeConstructArr;
};
const emplyeeConstructArr = createEmployesFromArr(emplyeeArr); ///
console.log('Task 3 =>');
console.log(emplyeeConstructArr);

//////////// Задача 4 ////////////

// Создать функцию которая вернет массив со всеми полными именами каждого
// employee, содержащегося в emplyeeConstructArr;

//////////// Решение ////////////

const getFullNamesFromArr = (arr) => {
  const fullNames = [];
  for (const employee of arr) {
    fullNames.push(employee.getFullName());
  }
  return fullNames;
};
console.log('Task 4 =>');
console.log(getFullNamesFromArr(emplyeeConstructArr));

//////////// Задача 5 ////////////

// Создать функцию которая вернет среднее значение зарплаты всех employee

//////////// Решение ////////////

const getMiddleSalary = (arr) => {
  let sumSalary = 0;
  for (const employee of arr) {
    sumSalary += employee.salary;
  }
  return Math.round(sumSalary / arr.length);
};

console.log('Task 5 =>');
console.log(getMiddleSalary(emplyeeConstructArr));

//////////// Задача 6 ////////////

// Создать функцию которая выберет наугад работника из массива
// emplyeeConstructArr. Вы должны учитывать в функции длинну массива, так как
// если работников 7, а рандомное число будет равно больше 7, то результат будет
// undefined. Вы можете использовать обьявленную функцию в сомой же себе.
// Подсказка Math.random

//////////// Решение ////////////

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

const getRandomEmployee = (arr) => {
  return arr[getRandomInt(0, arr.length)];
};
console.log('Task 6 =>');
console.log(getRandomEmployee(emplyeeConstructArr));

console.log('Task 7 =>');
console.log('Создаем новый инстанс и выводим его =>');
const testObj = new Emploee(emplyeeArr[0]);
console.log(testObj);
console.log('Тестируем геттер');
console.log(testObj.fullInfo);
testObj.fullInfo = { name: 'Вася', salary: 9000 };
console.log('Меняем его данные и выводим заново');
console.log(testObj);
console.log('Еще раз тестируем геттер');
console.log(testObj.fullInfo);
