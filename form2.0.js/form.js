// Tworzenie i dodawanie sekcji i ich zawartości zgodnie z backend//
const form = document.querySelector('.form');
const task = [];
let subPeriod; // skrócona nazwa okresu

// Sprawdzenie liczby sekcji dostarczonych z backend//
const creationStep = () => {
  available.forEach((step, idx) => {
    addSection(step, idx);
  });
};

// Stworzenie Sekcji wraz z jej opisem//
const addSection = (step) => {
  const section = document.createElement('section');
  const div = document.createElement('div');
  section.className = `form__step`;
  div.className = `form__task`;
  section.innerHTML = `<h2 class="form__title">${step.titleStep}</h2><p class="form__info"> ${step.description}`;
  section.appendChild(div);
  task.push(div);
  form.appendChild(section);
  //Sprawdza czy w tablicy danego elementu jest własciwość input//
  if (step.id == 1 && state.userInfo.name == '') {
    addTask(step.input);
  }
  //sprawdza ID
  if (step.id == 2) {
    task[1].classList.add(`form__task--plans`);
    addPlan(step.plan);
  }
};

// Tworzenie i dodawanie zawartości sekcji dostarczonej z backend//
const addTask = (input) => {
  task[0].textContent = '';
  input.forEach((singleInput) => {
    // POBIERANIE DANYCH Z OBIEKTU - inny sposob
    const { typInput: type, name, placeholder, required, id } = singleInput; // Każdy element w {} przypisane ma (np: id = singleInput.id)

    const div = document.createElement('div');
    div.className = 'info';
    div.innerHTML = `<p class="info__requier"></p>
                    <label class="infoName">${name}</label>
                    <input id="${id}" type="${type}" name="${name}" placeholder=" ${placeholder}" required="${required}"></input>`;
    task[0].appendChild(div);
  });
};

function getShorcutForPeriod(selectedPlanVariant) {
  return selectedPlanVariant == 'monthly' ? 'mo' : 'yr';
}

const toggleDistinction = (toggle) => {
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

const addPlan = (plan) => {
  const task = document.querySelector('.form__task--plans');
  task.textContent = '';
  plan.forEach((plan) => {
    money = plan.price[state.selectedPlanVariant];
    description = plan.description[state.selectedPlanVariant];
    subPeriod = getShorcutForPeriod(state.selectedPlanVariant);

    const title = plan.title;
    const button = document.createElement('button');
    button.className = 'form__element';
    button.innerHTML = `<img src="images/${plan.icon}" alt="planBasic" />
    <div class="form__descriotion">
                  <h3 class="form__title">${title}</h3>
                  <p class="form__money">
                    $${money}/${subPeriod}
                  </p>
                  <p class="plan__descriotion">
                  ${description}
                  </p>
                </div>`;

    if (state.selectedPlanId.includes(plan.id)) {
      button.style.backgroundColor = 'hsl(217, 100%, 97%)';
      button.style.borderColor = '#022a61';
    }
    task.appendChild(button);

    button.addEventListener('click', () => {
      state.selectedPlanId = String(plan.id);
      button.style.backgroundColor = '';
      button.style.borderColor = '';
      additionse();
      creationStep();
    });
  });
  const div = document.createElement('div');
  div.className = 'toggle';
  div.innerHTML = `  <p class="">Monthly</p>
  <span class="switch"><span class="switch__add"></span></span>
  <p class="">Yeart</p>`;
  task.appendChild(div);

  // const toggle = document.querySelector('.toggle');
  div.addEventListener('click', () => {
    const period = state.selectedPlanVariant.toLowerCase();

    if (period == 'monthly') {
      state.selectedPlanVariant = 'yearly';
    } else if (period == 'yearly') {
      state.selectedPlanVariant = 'monthly';
    }
    // console.log(div.children[2]);
    creationStep();
    toggleDistinction(div);
  });
  toggleDistinction(div);
};
creationStep();

const additionse = () => {
  const addOns = available[2].addOns;
  task[2].textContent = '';
  addOns.forEach((addOns) => {
    const title = addOns.title;
    const description = addOns.description;
    const money = addOns.price[state.selectedPlanVariant];

    const button = document.createElement('button');
    button.className = 'form__element form__element--addOns';

    const div = document.createElement('div');
    div.className = 'addOns__check';

    if (state.addOns.includes(addOns.id)) {
      button.style.backgroundColor = 'hsl(217, 100%, 97%)';
      div.style.backgroundColor = '#022a61';
      div.innerHTML = `<img src="images/icon-checkmark.svg" alt="icon check" />`;
    }
    button.innerHTML = `${div.outerHTML}
    <div class="form__descriotion form__descriotion--addOns">
    <h3 class="form__title">${title}</h3>
    <p class="addOns__descriotion">${description}</p>
    </div><p class="form__money">$${money}/${subPeriod}</p>`;
    task[2].appendChild(button);
    // Po kliknięciu sprawdza czy jest w tablicy i dodaje lub usuwa
    button.addEventListener('click', () => {
      if (state.addOns.includes(addOns.id)) {
        const id = addOns.id;
        state.addOns = state.addOns.filter((addOns) => addOns != id);
      } else {
        state.addOns.push(addOns.id);
      }
      additionse();
    });
  });
};
additionse();

const summary = () => {
  task[3].textContent = '';
  const planId = state.selectedPlanId;
  const variant = state.selectedPlanVariant;
  let statePlan;
  console.log();
  available[1].plan.forEach((plan) => {
    if (plan.id == planId) {
      statePlan = plan;
    }
  });

  const stateVariant = statePlan.price[variant];

  const plan = document.createElement('div');
  plan.className = 'form__element--SumPlan';
  plan.innerHTML = `<div><h3 class="form__title">${statePlan.title}(${variant})</h3> <p class="change">Change</p></div> <p class="sum__text sum__totalPlan">$${stateVariant}/${subPeriod}</p>`;
  const addOns = document.createElement('div');
  addOns.className = 'form__element--SumAddOns';
  const total = document.createElement('div');
  total.className = 'form__element--SumTotal';
  let totalSum = stateVariant;

  available[2].addOns.forEach((elementAddOns) => {
    const id = elementAddOns.id;
    if (state.addOns.includes(id)) {
      const div = document.createElement('div');
      div.innerHTML = ` <p class="sum__text">${elementAddOns.title}</p> <p class="sum__text">+$${elementAddOns.price[variant]}/${subPeriod}</p>`;
      addOns.appendChild(div);
      totalSum = totalSum + elementAddOns.price[variant];
    }
  });

  total.innerHTML = `<p class='sum__text'>Total(per ${variant})</p> <p class="sum__text sum__totalMoney">$${totalSum}/${subPeriod}</p>`;

  task[3].appendChild(plan);
  task[3].appendChild(addOns);
  task[3].appendChild(total);
};
summary();

//Podziękowanie//
const thank = () => {
  document.querySelectorAll('.window__btn').forEach((btn) => {
    btn.style.display = 'none';
  });

  const form = document.querySelector('.form');
  form.innerHTML = `<div class='thankYou'><img src="images/icon-thank-you.svg" alt="planBasic"/>
               <h3 class="form__title">Thank you!</h3>
               <p class="form__money">
                Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com.
                 </p></div>`;
};

const section = document.querySelectorAll('.form__step');
const navigationNumber = document.querySelectorAll('.navigation__number');
let indeks = 0;
const nav = () => {
  summary();
  section.forEach((elementStep) => (elementStep.style.display = 'none'));
  navigationNumber.forEach((elementNav) =>
    elementNav.classList.remove('navigation__number--active')
  );
  if (indeks == available.length) {
    thank();
    return;
  } else {
    section[indeks].style.display = 'block';
    navigationNumber[indeks].classList.add('navigation__number--active');
  }
  //aktywacja przycisku Go Back//
  {
    const back = document.querySelector('.window__btn--back');
    back.style.display = 'block';
    if (indeks == 0) {
      back.style.display = 'none';
    }
  }

  //Zmiana content w btn ostatnim step//
  {
    const next = document.querySelector('.window__btn--next');
    next.innerHTML = `Next Step`;
    next.style.backgroundColor = 'hsl(213, 96%, 18%)';

    if (indeks == available.length - 1) {
      next.innerHTML = `Confirm`;
      next.style.backgroundColor = 'hsl(228, 100%, 84%)';
      next.style.backgroundColor = 'rgb(146 140 254)';
    }
  }
};
nav();
document.querySelector('.window__btn--next').addEventListener('click', () => {
  state.userInfo.name = document.getElementById(1).value;
  state.userInfo.email = document.getElementById(2).value;
  state.userInfo.phoneNumber = document.getElementById(3).value;

  {
    const testReg = [];
    const regName = /^[a-zA-Z]+(\s*[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]*)*$/;
    const regEmail =
      /^[a-z\d]+[\w\d.-]*@(?:[a-z\d]+[a-z\d-]+\.){1,5}[a-z]{2,6}$/i;
    const regNr = /^([+]\d{2})?[- ]?(\d{3})[- ]?(\d{3})[- ]?(\d{3})$/;

    testReg.push(regName.test(state.userInfo.name.trim()));
    testReg.push(regEmail.test(state.userInfo.email.trim()));
    testReg.push(regNr.test(state.userInfo.phoneNumber.trim()));

    const personInfo = testReg.every((e) => e === true); // sprawca czy wsztstkie testy ta prawdziwe
    // console.log(personInfo);
    const dataUser = document.querySelectorAll('.info');
    dataUser.forEach((ooo) => {
      ooo.childNodes[4].style.borderColor = '#777';
      ooo.childNodes[0].textContent = '';
    });
    if (!personInfo) {
      testReg.forEach((test, kay) => {
        const text = dataUser[kay].childNodes;
        if (test === false) {
          text[0].textContent = `Requires ${text[4].name}`;
          text[4].style.borderColor = 'red';
        }
      });
      return;
    }
  }
  if (indeks < available.length) {
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
