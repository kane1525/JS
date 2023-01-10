'use strict';

//////////// Задача 1 ////////////

// Задача - создать класс Student который принимает аргументом в конструкторе
// объект enrollee (абитурент). У экземпляра класса Student должны быть поля:

// id - уникальный идентификатор студента (генерируется при создании экземпляра
// и начинается с 1);
// name - имя студента (передаем в объекте enrollee);
// surname - фамилия студента (передаем в объекте enrollee);

// ratingPoint - рейтинг студента по результатам вступительных экзаменов
// (передаем в объекте enrollee);

// schoolPoint - рейтинг студента по результатам ЗНО (передаем в объекте
// enrollee);

// isSelfPayment - если true, то студент на контракте, если false - на бюджете
// (генерируется по логике указанной ниже).

// Id генерируется автоматически при создании экземпляра Student. isSelfPayment
// определяется по параметру "ratingPoint". Если ratingPoint больше или равен
// 800, то студент может быть на бюджет, но бюджет он может получить только если
// его "ratingPoint" не меньше чем у других студентов в массиве. Студентов
// которые на бюджете не должно быть больше чем 5 в массиве. То есть если
// "ratingPoint" больше чем хоть у одного из 5 бюджетников то мы присваиваем
// isSelfPayment = false. И в этот момент студент из массива который имел
// isSelfPayment = false, но его ratingPoint меньше чем у остальных 5
// бюджетников, с нашим включительно, то ему делаем isSelfPayment = true, то
// есть переводим этого неудачника на контракт. Что делать если у 6-рых
// студентов баллы 1000? Ну имеется ввиду, если 2 человека с одинаковыми баллами
// ratingPoint борются за 5 бюджетное место? В таком случае смотрим на
// schoolRating, у кого он больше тот и на бюджете.

//  При каждом новом вызове конструктора, все логика должна отрабатывать таким
//  образом, что пересчет будет изменяться с новым студентом включительно

//////////// Решение ////////////

const studentArr = [
  {
    name: 'Сергей',
    surname: 'Войлов',
    raitingPoint: 1000,
    schoolPoint: 1000,
    course: 2,
  },
  {
    name: 'Татьяна',
    surname: 'Коваленко',
    raitingPoint: 880,
    schoolPoint: 700,
    course: 1,
  },
  {
    name: 'Анна',
    surname: 'Кугир',
    raitingPoint: 1430,
    schoolPoint: 1200,
    course: 3,
  },
  {
    name: 'Станислав',
    surname: 'Щелоков',
    raitingPoint: 1130,
    schoolPoint: 1060,
    course: 2,
  },
  {
    name: 'Денис',
    surname: 'Хрущ',
    raitingPoint: 1000,
    schoolPoint: 990,
    course: 4,
  },
  {
    name: 'Татьяна',
    surname: 'Капустник',
    raitingPoint: 650,
    schoolPoint: 500,
    course: 3,
  },
  {
    name: 'Максим',
    surname: 'Меженский',
    raitingPoint: 990,
    schoolPoint: 1100,
    course: 1,
  },
  {
    name: 'Денис',
    surname: 'Марченко',
    raitingPoint: 570,
    schoolPoint: 1300,
    course: 4,
  },
  {
    name: 'Антон',
    surname: 'Завадский',
    raitingPoint: 1090,
    schoolPoint: 1010,
    course: 3,
  },
  {
    name: 'Игорь',
    surname: 'Куштым',
    raitingPoint: 870,
    schoolPoint: 790,
    course: 1,
  },
  {
    name: 'Инна',
    surname: 'Скакунова',
    raitingPoint: 1560,
    schoolPoint: 200,
    course: 2,
  },
];

function sortByRaiting(a, b) {
  const { raitingPoint: raitingPointA, schoolPoint: schoolPointA } = a;
  const { raitingPoint: raitingPointB, schoolPoint: schoolPointB } = b;
  if (raitingPointA < raitingPointB) {
    return 1;
  }
  if (raitingPointA > raitingPointB) {
    return -1;
  }
  if (raitingPointA === raitingPointB) {
    return schoolPointA < schoolPointB ? 1 : -1;
  }
}

class Student {
  _isSelfPayment;
  constructor({ name, surname, raitingPoint, schoolPoint }) {
    this.id = Student.amount++ + 1; // что бы айдишники начинались с 1,
    //  но общее кол-во студентов тоже было правильное (Student.amount)
    this.name = name;
    this.surname = surname;
    this.raitingPoint = raitingPoint;
    this.schoolPoint = schoolPoint;
    this.isSelfPayment = { raitingPoint, schoolPoint };

    Student.allStudents.push(this);
  }

  static amount = 0;

  static allStudents = [];

  static budgetStudents = [];

  get isSelfPayment() {
    return this._isSelfPayment;
  }

  set isSelfPayment({ raitingPoint, schoolPoint }) {
    Student.budgetStudents.sort(sortByRaiting);
    if (raitingPoint > 800) {
      if (Student.budgetStudents.length < 5) {
        this._isSelfPayment = false;
        Student.budgetStudents.push(this);
        console.log(Student.budgetStudents);

        return;
      }
      if (raitingPoint > Student.budgetStudents[4].raitingPoint) {
        Student.budgetStudents[4]._isSelfPayment = true;
        this._isSelfPayment = false;
        Student.budgetStudents[4] = this;
        console.log(Student.budgetStudents);

        return;
      }
      if (
        raitingPoint === Student.budgetStudents[4].raitingPoint &&
        schoolPoint > Student.budgetStudents[4].schoolPoint
      ) {
        Student.budgetStudents[4]._isSelfPayment = true;
        this._isSelfPayment = false;
        Student.budgetStudents[4] = this;
        console.log(Student.budgetStudents);

        return;
      }
    }
    this._isSelfPayment = true;
    console.log(Student.budgetStudents);
  }
}

for (let student of studentArr) {
  new Student(student);
}

console.log(Student.budgetStudents);
console.dir(Student);

// Массив для проверки сортировки

// const arr = [
//   {
//     raitingPoint: 100,
//     schoolPoint: 300,
//   },
//   {
//     raitingPoint: 93,
//     schoolPoint: 300,
//   },
//   {
//     raitingPoint: 90,
//     schoolPoint: 300,
//   },
//   {
//     raitingPoint: 4,
//     schoolPoint: 300,
//   },
//   {
//     raitingPoint: 6,
//     schoolPoint: 300,
//   },
//   {
//     raitingPoint: 6,
//     schoolPoint: 299,
//   },
//   {
//     raitingPoint: 6,
//     schoolPoint: 298,
//   },
//   {
//     raitingPoint: 6,
//     schoolPoint: 5,
//   },
// ];

// arr.sort(sortByRaiting);
// console.log(arr);

//////////// Задача 2 ////////////

// Реализуйте класс CustomString, который будет иметь следующие методы: метод
// reverse(), который параметром принимает строку, а возвращает ее в
// перевернутом виде, метод ucFirst(), который параметром принимает строку, а
// возвращает эту же строку, сделав ее первую букву заглавной и метод ucWords,
// который принимает строку и делает заглавной первую букву каждого слова этой
// строки.

//////////// Решение ////////////

class CustomString {
  reverse(string) {
    let res = '';
    for (let i = 0; i < string.length; i++) {
      res = string[i] + res;
    }
    return res;
  }

  ucFirst(string) {
    let res = '';
    for (let i = 0; i < string.length; i++) {
      if (i === 0) {
        res += string[i].toUpperCase();
      } else {
        res += string[i];
      }
    }
    return res;
  }

  ucWords(string) {
    let res = '';
    let upperCase = true;
    for (let i = 0; i < string.length; i++) {
      const next = string[i + 1];
      const curr = string[i];

      res += upperCase ? curr.toUpperCase() : curr;
      upperCase = curr === ' ' && next !== ' ' ? true : false;
    }
    return res;
  }
}

const myString = new CustomString();
console.log(myString.reverse('qwerty')); //выведет 'ytrewq')
console.log(myString.ucFirst('qwerty')); //выведет 'Qwerty'
console.log(myString.ucWords('qwerty qwerty qwerty')); //выведет 'Qwerty Qwerty Qwerty);

//////////// Задача 3 ////////////

// Реализуйте класс Validator, который будет проверять строки. К примеру, у него
// будет метод checkIsEmail() параметром принимает строку и проверяет, является
// ли она емейлом или нет. Если является - возвращает true, если не является -
// то false. Кроме того, класс будет иметь следующие методы: метод checkIsDomain
// для проверки домена, метод checkIsDate для проверки даты и метод checkIsPhone
// для проверки телефона:

//////////// Решение ////////////

class Validator {
  // не знаю как правильно разбивать рег експ на строки, что б не вылазило за 80
  // символов в 1 строке
  checkIsEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
  }

  checkIsDomain(str) {
    var pattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
      'i'
    ); // fragment locator
    return !!pattern.test(str);
  }

  checkIsDate(date) {
    return new Date(date) !== 'Invalid Date' && !isNaN(new Date(date));
  }

  checkIsPhone(phone) {
    const re =
      /[+38 ][(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{2}[-\s\.]?[0-9]{2}$/im;
    return re.test(phone);
  }
}
var validator = new Validator();

console.log(validator.checkIsEmail('vasya.pupkin@gmail.com')); // true)
console.log(validator.checkIsDomain('google.com')); // true)
console.log(validator.checkIsDate('01/01.2011')); // true
// checkIsDate работает только с такими шаблонами, из которых получится созадть
// новую дату с помощью new Date(шаблон) для нормальной валидации дат есть
// библиотеки, поэтому не захотел тратить время на изобюретение велосипеда, и
// так много чего еще учить нужно))
console.log(validator.checkIsPhone('+38(066)937-99-92'));
// если код страны Украинский, то возвращаем true иначе false
