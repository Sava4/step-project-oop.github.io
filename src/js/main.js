// document.addEventListener('DOMContentLoaded', () => {
//   console.log('Hello Bulma!');
// });


const html = document.getElementsByTagName('html')[0];
const create = document.getElementById('create-btn');
const modal = document.getElementById('card-modal');
const modalCloses = document.querySelectorAll('.modal-background, .modal-card-head > .delete, .modal-card-foot > .cancel');
const form = document.getElementById('modal-form');
const injectfield = document.getElementById('first-field');
const doctorselect = document.getElementById('doctor-select');
const save = document.getElementById('save');
const dashboard = document.getElementById('dashboard')



const closeModal = () => {
  modal.classList.remove('is-active');
  html.classList.remove('is-clipped');
  form.reset();
}


create.addEventListener('click', () => {
  modal.classList.add('is-active');
  html.classList.add('is-clipped');
})

modalCloses.forEach(el => el.addEventListener('click', closeModal));

const dropdownFields = [{'name': 'Cardiologist',
                         'heartpressure': 'field',
                         'bmiindex': 'field',
                         'heartdiseases': 'field',
                         'age': 'field'}, 
                         {'name':'Dentist',
                          'lastvisit': 'date'},
                         {'name': 'Therapist',
                          'age': 'field'}]

doctorselect.addEventListener('change', (e) => {
  let {target: {value: doctor}} = e;

  const obj = dropdownFields.find(el => doctor === el.name);

  let removeFields = Array.from(document.getElementsByClassName('field generated'));
  if (removeFields.length !== 0) {
    removeFields.forEach(el => el.remove());
  }
  for (let prop in obj) {
    if (obj[prop] === 'field') {
      let field = document.createElement('div');
      field.classList.add('field', 'generated');
      field.innerHTML = `<label class="label">${prop}</label>
      <div class="control">
        <input class="input" name="${prop}" type="text" required>
      </div>`

      injectfield.after(field);

    } else if (obj[prop] === 'date') {
      let field = document.createElement('div');
      field.classList.add('field', 'generated');
      field.innerHTML = `<label class="label">${prop}</label>
      <div class="control">
        <input class="input" name="${prop}" type="date" required>
      </div>`
      injectfield.after(field);
    }
  }

});

const newCard = (fd) => {
  let card;
  if (fd.visitname === 'Cardiologist') {
    card = new CardioVisit(fd.visitname, fd.date, fd.fullname, fd.purpose, fd.commentary = "", fd.pressure, fd.bmiindex, fd.heartdiseases, fd.age);
  } else if (fd.visitname === 'Dentist') {
    card = new DentistVisit(fd.visitname, fd.date, fd.fullname, fd.purpose, fd.commentary = "", fd.lastvisit);
  } else if (fd.visitname === 'Therapist') {
    card = new TherapistVisit(fd.visitname, fd.date, fd.fullname, fd.purpose, fd.commentary = "", fd.age);
  }
  card.draw();
}


save.addEventListener('click', () => {
  if (form.reportValidity()) {
    let formIter = new FormData(form);
    let formData = {}
    for (let [key,val] of formIter.entries()) {
      formData[key] = val;
    }
    newCard(formData);
    closeModal();
  }
})

class Visit {
  constructor(visitname, date, fullname, purpose, commentary) {
    this.visitname = visitname;
    this.date = date;
    this.fullname = fullname;
    this.purpose = purpose;
    this.commentary = commentary;

    this.element = document.createElement('div');
    this.element.classList.add('card', 'card-size');
    this.element.innerHTML = `
    <header class="card-header">
      <p class="card-header-title">${this.purpose}</p>
      <span class="card-header-icon">
        <button class="delete" aria-label="close"></button>
      </span>
    </header>
    <div class="card-content">
      <div class="content">
        <span class="pacient-name">${this.fullname}</span>
        <span class="doctor-visitname">${this.visitname}</span>
        <a href="#" class="card-header-icon" aria-label="more options">
          Show more...</a>
      </div>`
    this.element.onclick = this.onClick.bind(this);
    this.element.style.cursor = 'pointer';
  }
  
  onClick(e) {
    if (e.target.classList.contains('delete')) {
      this.element.remove();
      }
    }

  draw() {
    dashboard.appendChild(this.element);
  }
}

class CardioVisit extends Visit {
  constructor(visitname, date, fullname, purpose, commentary, pressure, bmiindex, heartdiseases, age) {
    super(visitname, date, fullname, purpose, commentary);
    this.visitname = 'Cardiologist'
    this.pressure = pressure;
    this.bmiindex = bmiindex;
    this.heartdiseases = heartdiseases;
    this.age = age;
  }
}

class DentistVisit extends Visit {
  constructor(visitname, date, fullname, purpose, commentary, lastvisit) {
    super(visitname, date, fullname, purpose, commentary);
    this.visitname = 'Dentist'
    this.lastvisit = lastvisit;
  }
}

class TherapistVisit extends Visit {
  constructor(visitname, date, fullname, purpose, commentary, age) {
    super(visitname, date, fullname, purpose, commentary);
    this.visitname = 'Therapist'
    this.age = age;
  }
}

