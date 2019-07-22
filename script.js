'use strict';

//СТВОРЕННЯ ПЛОЩІ ДЛЯ ГРИ
let counter = document.querySelector('.counterText');

const gamePlace = document.createElement('div');
document.body.appendChild(gamePlace);
gamePlace.classList.add('gamePlace');

// заповнюю площу для гри 100 квадратами
for (let i = 1; i < 101; i += 1) {
  //створюю
  const excel = document.createElement('div');
  //додаю в площу
  gamePlace.appendChild(excel);
  //додаю клас
  excel.classList.add('excel');
}

//КООРДИНАТИ НА КОЖНИЙ КВАДРАТ ЗГІДНО ОСІ (Х,У)

//дістаємо всі квадрати з площі
const excel = document.getElementsByClassName('excel');
//базові координати
let x = 1,
  y = 10;
//цикл для додавання координат
for (let i = 0; i < excel.length; i += 1) {
  if (x > 10) {
    x = 1;
    y--;
  }
  // setAtribute(name,value) - додаємо координати
  excel[i].setAttribute('posX', x);
  excel[i].setAttribute('posY', y);
  x += 1;
}

// функція для отримання рандомних координатів
function generateSnake() {
  //рандом на осях (Х,У)
  let posX = Math.round(Math.random() * (10 - 3) + 3);
  let posY = Math.round(Math.random() * (10 - 1) + 1);
  //повертаэмо масив з 2 рандомними числами
  return [posX, posY];
}

let coordinates = generateSnake();

// визначення квадрати по отриманих рандомних координатах + визначаємо 2 сусідніх квадрати
let snakeBody = [
  document.querySelector('[posX = "' + coordinates[0] + '"][posY = "' + coordinates[1] + '"]'),
  document.querySelector(
    '[posX = "' + (coordinates[0] - 1) + '"][posY = "' + coordinates[1] + '"]',
  ),
  document.querySelector(
    '[posX = "' + (coordinates[0] - 2) + '"][posY = "' + coordinates[1] + '"]',
  ),
];

// додаємо клас з стилями для тіла змії
for (let i = 0; i < snakeBody.length; i++) {
  snakeBody[i].classList.add('snakeBody');
}

// клас з стилями для голови змії
snakeBody[0].classList.add('head');

// console.log(snakeBody);
// console.log(coordinates);
// console.log(coordinates[0]);
// console.log(coordinates[1]);

let mouse;
let bomb;

// СТВОРЕННЯ МИШИ

//функція для створення миши
function createMouse() {
  function generateMouse() {
    //рандом на осях (Х,У)
    let posX = Math.round(Math.random() * (10 - 3) + 3);
    let posY = Math.round(Math.random() * (10 - 1) + 1);
    //повертаэмо масив з 2 рандомними числами
    return [posX, posY];
  }
  //відобржаємо мишу
  let mouseCoordinates = generateMouse();
  // console.log(mouseCoordinates);
  mouse = document.querySelector(
    '[posX = "' + mouseCoordinates[0] + '"][posY = "' + mouseCoordinates[1] + '"]',
  );

  // для того щоб миша та змія не відображались на одних координатах використаємо постумову while
  // якщо миша рандомно попадає на координати на яких знаходиться змія то с метод contains('snakeBody') поверне true
  // contains - повертає true/false взалежності від наявності класу
  // і ми знову викликаємо функцію по створенню миші з новими координатами
  while (mouse.classList.contains('snkekBody')) {
    //запуск функції для отримання координатів
    let mouseCoordinates = generateMouse();

    //відображення на площі
    let mouse = document.querySelector(
      '[posX = "' + mouseCoordinates[0] + '"][posY = "' + mouseCoordinates[1] + '"]',
    );
  }

  //додаємо клас для стильового оформлення
  mouse.classList.add('mouse');

  //   console.log(mouseCoordinates);
}

createMouse();

//СТВОРЕННЯ БОМБИ

//функція для створення миши
function createBomb() {
  function generateBomb() {
    //рандом на осях (Х,У)
    let posX = Math.round(Math.random() * (10 - 3) + 3);
    let posY = Math.round(Math.random() * (10 - 1) + 1);
    //повертаэмо масив з 2 рандомними числами
    return [posX, posY];
  }
  //відобржаємо мишу
  let bombCoordinates = generateBomb();
  console.log(bombCoordinates);
  bomb = document.querySelector(
    '[posX = "' + bombCoordinates[0] + '"][posY = "' + bombCoordinates[1] + '"]',
  );

  // для того щоб миша та змія не відображались на одних координатах використаємо постумову while
  // якщо миша рандомно попадає на координати на яких знаходиться змія то с метод contains('snakeBody') поверне true
  // contains - повертає true/false взалежності від наявності класу
  // і ми знову викликаємо функцію по створенню миші з новими координатами
  while (bomb.classList.contains('snkekBody')) {
    //запуск функції для отримання координатів
    let bombCoordinates = generateBomb();

    //відображення на площі
    let bomb = document.querySelector(
      '[posX = "' + bombCoordinates[0] + '"][posY = "' + bombCoordinates[1] + '"]',
    );
  }

  //додаємо клас для стильового оформлення
  bomb.classList.add('bomb');

  //   console.log(mouseCoordinates);
}

createBomb();

// ПЕРЕСУВАННЯ

let direction = 'right';

function move() {
  // з допомогою методу getAttribute отримаємо масив координатів на яких знаходиться змія
  let snakeCoordinates = [snakeBody[0].getAttribute('posX'), snakeBody[0].getAttribute('posY')];
  //видаляємо клас в голови змії
  snakeBody[0].classList.remove('head');
  //видаляємо клас в останнього елемента змії
  snakeBody[snakeBody.length - 1].classList.remove('snakeBody');

  //тимчасово видаляємо останній елемент
  //pop()- видаляє останній елемент масиву
  snakeBody.pop();

  if (direction === 'right') {
    //якщо координати по осі Х менше 10 робимо рух в право
    if (snakeCoordinates[0] < 10) {
      // отримаємо координати голови
      snakeBody.unshift(
        document.querySelector(
          '[posX = "' + (+snakeCoordinates[0] + 1) + '"][posY = "' + snakeCoordinates[1] + '"]',
        ),
      );
      // якщо рівно 10 відсуваємо змію на позицію 1 по осі Х
    } else {
      snakeBody.unshift(
        document.querySelector('[posX = "1"][posY = "' + snakeCoordinates[1] + '"]'),
      );
    }
  } else if (direction === 'left') {
    //якщо координати по осі  більше 1 робимо рух в ліво
    if (snakeCoordinates[0] > 1) {
      // отримаємо координати голови
      snakeBody.unshift(
        document.querySelector(
          '[posX = "' + (+snakeCoordinates[0] - 1) + '"][posY = "' + snakeCoordinates[1] + '"]',
        ),
      );
      // якщо рівно 1 відсуваємо змію на позицію 10 по осі Х
    } else {
      snakeBody.unshift(
        document.querySelector('[posX = "10"][posY = "' + snakeCoordinates[1] + '"]'),
      );
    }
  } else if (direction === 'up') {
    //якщо координати по осі Х менше 10 робимо рух в право
    if (snakeCoordinates[1] < 10) {
      // отримаємо координати голови
      snakeBody.unshift(
        document.querySelector(
          '[posX = "' + snakeCoordinates[0] + '"][posY = "' + (+snakeCoordinates[1] + 1) + '"]',
        ),
      );
      // якщо рівно 10 відсуваємо змію на позицію 1 по осі Х
    } else {
      snakeBody.unshift(
        document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "1"]'),
      );
    }
  } else if (direction === 'down') {
    //якщо координати по осі Х менше 10 робимо рух в право
    if (snakeCoordinates[1] > 1) {
      // отримаємо координати голови
      snakeBody.unshift(
        document.querySelector(
          '[posX = "' + snakeCoordinates[0] + '"][posY = "' + (+snakeCoordinates[1] - 1) + '"]',
        ),
      );
      // якщо рівно 10 відсуваємо змію на позицію 1 по осі Х
    } else {
      snakeBody.unshift(
        document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "10"]'),
      );
    }
  }

  // console.log(snakeBody[0].getAttribute('posX'));
  // console.log(snakeBody[0].getAttribute('posY'));

  // console.log(mouse.getAttribute('posX'));

  //ЇМО МИШЕЙ
  // якщо змія потрапить на координати на яких знаходиться миша

  //BOMB

  if (
    snakeBody[0].getAttribute('posX') == bomb.getAttribute('posX') &&
    snakeBody[0].getAttribute('posY') == bomb.getAttribute('posY')
  ) {
    // знімаємо клас з миші
    bomb.classList.remove('bomb');
    // createBomb();
    alert('END');
    createBomb();

    // alert('THE END');
  }

  if (
    snakeBody[0].getAttribute('posX') == mouse.getAttribute('posX') &&
    snakeBody[0].getAttribute('posY') == mouse.getAttribute('posY')
  ) {
    // знімаємо клас з миші

    counter.textContent++;
    mouse.classList.remove('mouse');

    // count += 1;
    //запускаємо функцію по створення нової миші з новими координатами
    createMouse();
    // коли зїдаємо мишу , додаємо +1 до тіла
    let a = snakeBody[snakeBody.length - 1].getAttribute('posX');
    let b = snakeBody[snakeBody.length - 1].getAttribute('posY');
    snakeBody.push(document.querySelector('[posX = "' + a + '"][posY = "' + b + '"]'));

    //КОЛИ НАБЕРЕМО ПЕВНУ КІЛЬКІСТЬ МИ ВИГРАЄМО
    if (+counter.textContent === 15) {
      alert('WIN');
    }
  }
  // // добавляємо клас для відображення голови на визначені координати
  snakeBody[0].classList.add('head');

  //якщо потрапимо на себе то зупиняємо гру
  if (snakeBody[0].classList.contains('snakeBody')) {
    // snakeBody[0].style.backgroundColor = 'green';

    alert('END');

    // snakeBody.classList.toggle('gameOwer');
    clearInterval(interval);
  }

  // console.log(snakeBody[0]);
  // додаємо клас з стилями для тілі змії на нових координатах
  for (let i = 0; i < snakeBody.length; i++) {
    snakeBody[i].classList.add('snakeBody');
  }
}
// запускаємо функцію з інтервалом для зміни положення змії
let interval = setInterval(move, 100);
// ВИЗНАЧАЄМО РУХ ЗМІЇ ПО НАТИСКУ КНОПКИ
document.addEventListener('keydown', function(e) {
  //KEYCODE - на кожній кнопкі висить свій код
  if (e.keyCode === 37 && direction !== 'right') {
    // console.log('left');
    direction = 'left';
  } else if (e.keyCode === 38 && direction !== 'down') {
    // console.log('up');
    direction = 'up';
  } else if (e.keyCode === 39 && direction !== 'left') {
    // console.log('right');
    direction = 'right';
  } else if (e.keyCode === 40 && direction !== 'up') {
    // console.log('down');
    direction = 'down';
  }
});
