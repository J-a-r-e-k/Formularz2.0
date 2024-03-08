const navWrap = document.querySelector('.navigation__wrap');
const addStep = (i) => {
  const btn = document.createElement('li');
  btn.innerHTML = `<button class="navigation__step"><p class="navigation__number">${available[i].id}</p>
  <div>
  <p>STEP ${available[i].id}</p>
  <h2 class="navigation__subtitle">${available[i].subtitle}</h2>
  </div></button>`;
  navWrap.appendChild(btn);
};
for (let nr = 0; nr < available.length; nr++) {
  addStep(nr);
}

// INNY przyklad rozwiazania

// available.forEach((item) => {
//   addStep2(item)
// })

// const addStep2 = (step) => {
//   const btn = document.createElement('li');
//   btn.innerHTML = `<button class="navigation__step"><p class="navigation__number">${step.id}</p>
//   <div>
//   <p>STEP ${step.id}</p>
//   <h2 class="navigation__subtitle">${step.subtitle}</h2>
//   </div></button>`;
//   navWrap.appendChild(btn);
// };

// const aaa = () => {
//   const bbb = available[0].subtitle;
// };
// aaa();

// btn.innerHTML = `<p class="navigation__number">${available[0].id}</p>
// <div>
// <p>STEP ${available[0].id}</p>
// <h2 class="navigation__subtitle">${available[0].subtitle}</h2>
// </div>`;
