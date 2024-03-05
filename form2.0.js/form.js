// Tworzenie i dodawanie sekcji i ich zawartości zgodnie z backend//
const form = document.querySelector('.form');
const task = [];
let subPeriod; // skrócona nazwa okresu

// Sprawdzenie liczby sekcji dostarczonych z backend//
const creationStep = () => {
  for (i = 0; i < available.length; i++) {
    addSection(i);
  }
};

// Stworzenie Sekcji wraz z jej opisem//
const addSection = (indeks) => {
  const section = document.createElement('section');
  const div = document.createElement('div');
  section.className = `form__step`;
  div.className = `form__task`;
  section.innerHTML = `<h2 class="form__title">${available[indeks].titleStep}</h2><p class="form__info"> ${available[indeks].description}`;
  section.appendChild(div);
  task.push(div);
  form.appendChild(section);
  //Sprawdza czy w tablicy danego elementu jest własciwość input//
  if (checkInput(available[indeks])) {
    const input = available[indeks].input;
    addTask(input);
  }
  //sprawdza ID
  if (available[indeks].id == 2) {
    task[indeks].classList.add(`form__task--plans`);
    addPlan();
  }
};
// Sprawdza czy w tablicy jest element input i zwraca true/fals
function checkInput(array) {
  return typeof array.input !== 'undefined';
}
// Tworzenie i dodawanie zawartości sekcji dostarczonej z backend//
const addTask = (input) => {
  // task[i].className = `form__info`;
  for (a = 0; a < 3; a++) {
    const id = input[a].id;
    const type = input[a].typInput;
    const name = input[a].name;
    const placeholder = input[a].placeholder;
    const required = input[a].required;
    const div = document.createElement('div');
    div.className = 'info';
    div.innerHTML = `<p class="info__requier"></p>
                    <label class="infoName">${name}</label>
                    <input id="${id}" type="${type}" name="${name}" placeholder=" ${placeholder}" required="${required}"></input>`;
    task[i].appendChild(div);
  }
};
//Zmiana wyboru okresu użytkownika
const toggleChanges = () => {
  const period = state.selectedPlanVariant.toLowerCase();
  if (period == 'monthly') {
    state.selectedPlanVariant = 'yearly';
  } else if (period == 'yearly') {
    state.selectedPlanVariant = 'monthly';
  }
  addPlan();
  toggleDistinction();
};

const addPlan = () => {
  const task = document.querySelector('.form__task--plans');
  task.textContent = '';
  for (let a = 0; a < available[1].plan.length; a++) {
    let money;
    if (state.selectedPlanVariant.toLowerCase() == 'monthly') {
      money = available[1].plan[a].price.monthly;
      subPeriod = 'mo';
      description = available[1].plan[a].description.monthly;
    } else if (state.selectedPlanVariant.toLowerCase() == 'yearly') {
      money = available[1].plan[a].price.yearly;
      description = available[1].plan[a].description.yearly;
      subPeriod = 'yr';
    }

    const title = available[1].plan[a].title;
    const button = document.createElement('button');
    button.className = 'form__element';
    button.innerHTML = `<img src="images/${available[1].plan[a].icon}" alt="planBasic" />
    <div class="form__descriotion">
                  <h3 class="form__title">${title}</h3>
                  <p class="form__money">
                    $${money}/${subPeriod}
                  </p>
                  <p class="plan__descriotion">
                  ${description}
                  </p>
                </div>`;
    task.appendChild(button);
    if (state.selectedPlanId.includes(a)) {
      button.style.backgroundColor = 'hsl(217, 100%, 97%)';
      button.style.borderColor = '#022a61';
    }
    button.addEventListener('click', () => {
      state.selectedPlanId = String(a);
      button.style.backgroundColor = '';
      button.style.borderColor = '';
      addPlan();
      toggleDistinction();
    });
  }

  const div = document.createElement('div');
  div.className = 'toggle';
  div.innerHTML = `  <p class="">Monthly</p>
  <span class="switch"><span class="switch__add"></span></span>
  <p class="">Yeart</p>`;
  task.appendChild(div);
  const toggle = document.querySelector('.toggle');
  toggle.addEventListener('click', toggleChanges);
};
creationStep();

const addOns = () => {
  task[2].textContent = '';
  for (let add = 0; add < available[2].addOns.length; add++) {
    let money;
    if (state.selectedPlanVariant.toLowerCase() == 'monthly') {
      money = available[2].addOns[add].price.monthly;
    } else if (state.selectedPlanVariant.toLowerCase() == 'yearly') {
      money = available[2].addOns[add].price.yearly;
    }

    const title = available[2].addOns[add].title;
    const description = available[2].addOns[add].description;

    const button = document.createElement('button');
    button.className = 'form__element form__element--addOns';
    button.innerHTML = `<div class="addOns__check"><img src="/images/icon-checkmark.svg" alt="icon check" /></div>
    <div class="form__descriotion form__descriotion--addOns">
    <h3 class="form__title">${title}</h3>
    <p class="addOns__descriotion">${description}</p>
    </div><p class="form__money">$${money}/${subPeriod}</p>`;
    task[2].appendChild(button);
    //Zaznacza elementy wybrane przez User w state.//
    if (state.addOns.includes(add)) {
      button.style.backgroundColor = 'hsl(217, 100%, 97%)';
      const added = document.querySelectorAll('.addOns__check');
      added[add].style.backgroundColor = '#022a61';
      added[add].childNodes[0].style.display = 'block';
    }
    // Po kliknięciu sprawdza czy jest w tablicy i dodaje lub usuwa//
    button.addEventListener('click', () => {
      if (state.addOns.includes(add)) {
        state.addOns.splice(state.addOns.indexOf(add), 1);
      } else {
        state.addOns.push(add);
      }
      addOns();
    });
  }
};

const summary = () => {
  task[3].textContent = '';
  const planId = state.selectedPlanId;
  const variant = state.selectedPlanVariant;
  const statePlan = available[1].plan[planId];
  const stateVariant = available[1].plan[planId].price[variant];

  const plan = document.createElement('div');
  plan.className = 'form__element--SumPlan';
  plan.innerHTML = `<div><h3 class="form__title">${statePlan.title}(${variant})</h3> <p class="change">Change</p></div> <p class="sum__text sum__totalPlan">$${stateVariant}/${subPeriod}</p>`;
  const addOns = document.createElement('div');
  addOns.className = 'form__element--SumAddOns';
  const total = document.createElement('div');
  total.className = 'form__element--SumTotal';
  let totalSum = stateVariant;

  state.addOns.forEach((e) => {
    const stateAdd = available[2].addOns[e];
    const div = document.createElement('div');
    div.innerHTML = ` <p class="sum__text">${stateAdd.title}</p> <p class="sum__text">+$${stateAdd.price[variant]}/${subPeriod}</p>`;

    addOns.appendChild(div);

    totalSum = totalSum + stateAdd.price[variant];
  });

  total.innerHTML = `<p class='sum__text'>Total(per ${variant})</p> <p class="sum__text sum__totalMoney">$${totalSum}/${subPeriod}</p>`;

  task[3].appendChild(plan);
  task[3].appendChild(addOns);
  task[3].appendChild(total);
};
summary();

const toggleDistinction = () => {
  addOns();
  const toggle = document.querySelector('.toggle');
  const switch__add = document.querySelector('.switch__add');
  const period = state.selectedPlanVariant.toLowerCase();
  toggle.children[2].style.color = '';
  toggle.children[0].style.color = '';
  if (period === 'yearly') {
    switch__add.style.left = '22px';
    toggle.children[2].style.color = '#022a61';
  } else if (period === 'monthly') {
    switch__add.style.left = '3px';
    toggle.children[0].style.color = '#022a61';
  }
};
toggleDistinction();

const section = document.querySelectorAll('.form__step');
const navigationNumber = document.querySelectorAll('.navigation__number');
let indeks = 0;
const nav = () => {
  summary();
  section.forEach((e) => (e.style.display = 'none'));
  navigationNumber.forEach((e) =>
    e.classList.remove('navigation__number--active')
  );
  section[indeks].style.display = 'block';
  navigationNumber[indeks].classList.add('navigation__number--active');

  // console.log('ok');
};
nav();
document.querySelector('.window__btn--next').addEventListener('click', () => {
  if (indeks < available.length - 1) {
    indeks++;
    nav();
  }
});
document.querySelector('.window__btn--back').addEventListener('click', () => {
  if (indeks > 0) {
    indeks--;
    nav();
  }
});
