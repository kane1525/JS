'use strict';

//////////// Задача 1 ////////////

// Напиши функцию, которая принимает 1 параметр. При первом вызове, она его
// запоминает, при втором - суммирует переданый параметр с тем, что передали
// первый раз и тд. Запрещается использовать глобальные переменные как хранилище
// результатов счетчика.

//////////// Решение ////////////

function func() {
  let res = 0;
  return function (a) {
    res += a;
    return res;
  };
}

const counter = func();

console.log(counter(3)); // 3
console.log(counter(5)); // 8
console.log(counter(228)); // 236

//////////// Задача 2 ////////////

// Создать функцию которая будет возвращать массив в котором будут лежать все
// значения - аргументы переданные в данную функцию. Но если мы ничего не
// передадим в параметрах, то массив очистится. Запрещается использовать
// глобальные переменные как хранилище значений.

//////////// Решение ////////////

function func2() {
  let res = [];
  return function () {
    if (arguments.length > 0) {
      res.push(...arguments);
      return res;
    }
    res = [];
    return res;
  };
}

const getUpdatedArr = func2();

console.log(getUpdatedArr(3)); // [3]
console.log(getUpdatedArr(5)); // [3, 5]
console.log(getUpdatedArr({ name: 'Vasya' })); // [3, 5, {name: 'Vasya'}]
console.log(getUpdatedArr()); // []
console.log(getUpdatedArr(4)); // [4]

//////////// Задача 3 ////////////

// Содать функцию , которая при каждом вызове будет показывать разницу в
// секундах между временем когда ее вызывали последний раз и теперешним.
// Вызываем первый раз, то ретерним строку 'Enabled'. Запрещается использовать
// глобальные переменные как хранилище значений.

//////////// Решение ////////////

function func3() {
  let last = null;

  return function () {
    if (!last) {
      last = Date.now();
      return 'enabled';
    }
    const now = Date.now();
    const timeDifference = Math.round((now - last) / 1000);
    last = now;
    return timeDifference;
  };
}

const getTime = func3();

// Запускаем первый раз
console.log(getTime());
setTimeout(() => {
  console.log(getTime());
}, 2000);
setTimeout(() => {
  console.log(getTime());
}, 5000);
setTimeout(() => {
  console.log(getTime());
}, 12000);

// 'Enabled'
// 2
// 3
// 7

//////////// Задача 4 ////////////

// Создать таймер обратного отсчета, который будет в console выодить время в
// формате MM:SS. Где MM - количество минут, SS - количество секунд. При этом
// когда закончится время, нужно вывести в console строку "Timer End".

//////////// Решение ////////////

function convertNumber(number) {
  const minutes = Math.trunc(number / 60).toString();
  const seconds = (number - minutes * 60).toString();
  const minutesString = minutes.length > 1 ? minutes : '0' + minutes;
  const secondsString = seconds.length > 1 ? seconds : '0' + seconds;
  return `${minutesString}:${secondsString}`;
}

const timer = (time) => {
  let currentTime = time;
  const interval = setInterval(() => {
    if (currentTime !== 0) {
      console.log(convertNumber(currentTime));
      currentTime--;
      if (currentTime === 0) {
        setTimeout(() => {
          console.log('Time End');
          clearInterval(interval);
        }, 1000);
      }
    }
  }, 1000);
};

timer(59);
