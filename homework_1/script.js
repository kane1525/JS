'use strict';

/* пару слов про оформление

некоторые задачи я захотел решить несколькими способами, и в задачах не указано, что нужно создавать ф-цию
нужно было придумывать разные имена переменным, или доставлять циферки, это не красиво
поэтому я решил каждое решение вынести в функцию
в тех моментах, где в задании не указано, что нужно создавать ф-цию, я решил не заморачиваться над их именами
там где конкретно сказано, что нужно создать ф-цию, (тут только в 4 задании), я обязательно придумываю нормальное название
вот логика названий ф-ций, например ф-ция T1W2()
T - task
1 - номер таски
W - way (типо способ или вариант)
2 - номер варианта 

в тех задачах, где я решил одним вариантом, я так же вынес в ф-цию, что б стиль домашки был одинаковый */

//////////// Задача 1 ////////////

// Создать цикл на 10 итераций. На каждой итерации если i четное, то вывести в консоль слово Fiz,
// если i не четное, то вывести в консоль слово Buz, если i кротное цифре 3, то вывести FizBuz.

//////////// Решение ////////////

function T1W1() {
  for (let i = 1; i <= 10; i++) {
    if (i % 3 === 0) {
      console.log('FizBuz');
    } else if (i % 2 === 0) {
      console.log('Fiz');
    } else {
      console.log('Buz');
    }
  }
}

console.log('Задача 1 =>');
T1W1();

//////////// Задача 2 ////////////

// Написать логику нахождения факториала числа 10.

//////////// Решение ////////////

/* Я на уроке кричал, что нужно result 0 делать, теперь решил сделать с нулем))
Но я понимаю, что вариант как на уроке с result = 1 намного проще и красивее,
просто решил попробовать сделать с нулем) */

function T2W1(fact) {
  let res = 0;

  for (let i = fact; i > 1; i--) {
    if (res === 0) {
      res += i * (i - 1);
    } else {
      res *= i - 1;
    }
  }

  console.log(res);
}

console.log('Задача 2, первый вариант =>');
T2W1(10);

// 2 Вариант, как на уроке

function T2W2(fact) {
  let res = 1;

  for (let i = fact; i > 0; i--) {
    res *= i;
  }

  console.log(res);
}

console.log('Задача 2, второй вариант =>');
T2W2(10);

//////////// Задача 3 ////////////

// В пачке бумаги 500 листов. За неделю в офисе расходуется 1200 листов.
//  Какое наименьшее количество пачек бумаги нужно купить в офис на 8 недель?

//////////// Решение ////////////

// Делаем свое округление, эта ф-ция используется так же в 4 задании
// хочу объяснить название ф-ции
// например у нас есть выражение 6 / 3 = 2
// на английском 6 - divident, 3 - divisor, 2 - quotient
// ceil - потолок, как ф-ция math ceil
// получилось getCeilQuotient

function getCeilQuotient(divident, divisor) {
  const rest = divident % divisor;
  if (rest === 0) {
    return divident / divisor;
  } else {
    return (divident - rest) / divisor + 1;
  }
}

function T3W1() {
  const sheetsInReamPaper = 500;
  const consumptionPerWeek = 1200;
  const weeksAmount = 8;
  const res = getCeilQuotient(consumptionPerWeek * weeksAmount, sheetsInReamPaper);

  console.log(res);
}

console.log('Задача 3 =>');
T3W1();

//////////// Задача 4 ////////////

// Создать функцию, которая выведет в консоль номер этажа и номер подъезда по номеру квартиры.
// Этажей у нас 9, квартир на этаже по 3
// Запрещавется использовать какое-либо округление (Math.ceil, Math.floor, ~~, parseInt).

//////////// Решение ////////////

function getRoomInfo(roomNumber, roomsOnFloor = 3, floors = 9) {
  if (
    typeof roomNumber === 'number' ||
    (!isNaN(Number(roomNumber)) && roomNumber > 0)
  ) {
    const totalFloors = getCeilQuotient(+roomNumber, roomsOnFloor);
    const currentEntrance = getCeilQuotient(totalFloors, floors);
    // const currentFloor = totalFloors % floors !== 0 ? totalFloors % floors : floors;
    const currentFloor = totalFloors - (currentEntrance - 1) * floors;
    /* тут хорошо работает и этот вариант, и закоментированный(можно менять 102 и 101 строку),
    а вот какой лучше использовать, для этого нужно знать как работает js внутри, я не знаю этого)
    но чисто по красоте мне на 101 строке больше нравится, он сложней выглядит) */

    console.log(
      `Эта комната в ${currentEntrance} подъезде на ${currentFloor} этаже.`
    );
  } else {
    console.log('Введите корректный номер комнаты');
  }
}

console.log('Задача 4 =>');
getRoomInfo('301');

//////////// Задача 5 ////////////

// Вывести в консоль пирамиду. Переменная указывает количество строк из которых построится пирамида.
// Пирамида должна строится в одинаковом визуально виде между собой, но строго учитывая кол-во строк

//////////// Решение ////////////

// через цикл в цикле

function buildPyramid1(mediaNumber) {
  const iterations = mediaNumber * 2 - 1;
  for (let i = 0; i < mediaNumber; i++) {
    let str = '';
    for (let j = 0; j < iterations; j++) {
      if (j >= iterations - mediaNumber - i && j <= iterations - mediaNumber + i) {
        str += '#';
      } else {
        str += '-';
      }
    }
    console.log(str);
  }
}

console.log('Задача 5, 1 вариант =>');
buildPyramid1(6);

// через рекурсию

function buildPyramid2(mediaNumber) {
  const iterations = mediaNumber * 2 - 1;
  let counter = 0;
  function generateString(counter) {
    let str = '';
    for (let i = 1; i <= iterations; i++) {
      if (i < mediaNumber - counter || i > mediaNumber + counter) {
        str += '-';
      } else {
        str += '#';
      }
    }
    console.log(str);
    counter++;
    if (counter < mediaNumber) {
      generateString(counter);
    }
  }
  generateString(counter);
}

console.log('Задача 5, 2 вариант =>');
buildPyramid2(5);

// так же думал еще один вариант можно
// 2 цикла в цикле и конкатинация строк
// первый дочерний цикл генерирует нужное кол-во решеток
// второй дочерний цикл генерирует нужное кол-во тире (только половину)
// родительский цикл складывает результаты дочерних в строку типо так:
// тире + решетки + тире
// и выводит результат в консоль
