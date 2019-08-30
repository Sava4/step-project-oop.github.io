const cardStorage = window.localStorage;
let cardList = [];

const html = document.getElementsByTagName('html')[0];
const create = document.getElementById('create-btn');
const modal = document.getElementById('card-modal');
const modalCloses = document.querySelectorAll('.modal-background, .modal-card-head > .delete, .modal-card-foot > .cancel');
const form = document.getElementById('modal-form');
const injectfield = document.getElementById('first-field');
const doctorselect = document.getElementById('doctor-select');
const save = document.getElementById('save');
const dashboard = document.getElementById('dashboard')

const removeFields = () => {
  let fields = Array.from(document.getElementsByClassName('field generated'));
if (fields.length !== 0) {
  fields.forEach(el => el.remove());
  }
}

const closeModal = () => {
  modal.classList.remove('is-active');
  html.classList.remove('is-clipped');
  Array.from(form.elements).forEach(el => el.classList.remove('is-danger'));
  form.reset();
  removeFields();
}

create.addEventListener('click', () => {
  modal.classList.add('is-active');
  html.classList.add('is-clipped');
})

modalCloses.forEach(el => el.addEventListener('click', closeModal));

doctorselect.addEventListener('change', (e) => {
  let {target: {value: doctor}} = e;

  const doctorFields = Visit.dropdownFields().find(el => doctor === el.name).fields;
  removeFields(); 
  
  doctorFields.forEach(el => {
    let field = document.createElement('div');
    field.classList.add('field', 'generated');

    if (el.type === 'field') {
    field.innerHTML = `<label class="label">${el.title}</label>
                        <div class="control">
                          <input class="input" name="${el.id}" type="text" placeholder="${el.placeholder}" required>
                        </div>`

      injectfield.after(field);
    } else if (el.type === 'date') {
      field.innerHTML = `<label class="label">${el.title}</label>
                          <div class="control">
                            <input class="input" name="${el.id}" type="date" required>
                          </div>`
      injectfield.after(field);
    }
  })

});

const newCard = (fd, fromUser = true) => {
  let card;
  if (fd.visitname === 'Cardiologist') {
    card = new CardioVisit(fd.visitname, fd.date, fd.fullname, fd.purpose, fd.commentary, fd.pressure, fd.bmiindex, fd.heartdiseases, fd.age);
    card.addCardioFields();
  } else if (fd.visitname === 'Dentist') {
    card = new DentistVisit(fd.visitname, fd.date, fd.fullname, fd.purpose, fd.commentary, fd.lastvisit);
    card.addDentistFields();
  } else if (fd.visitname === 'Therapist') {
    card = new TherapistVisit(fd.visitname, fd.date, fd.fullname, fd.purpose, fd.commentary, fd.age);
    card.addTherapistFields();
  }
  if (fromUser) {
    cardList.push(fd);
    cardStorage.setItem("cards", JSON.stringify(cardList));
  }
  card.draw();
}

save.addEventListener('click', () => {
  Array.from(form.elements).forEach (el => el.addEventListener('invalid', (e) => e.target.classList.add('is-danger')));

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
        <a href="#" class="card-header-icon show-more-link" aria-label="more options">
          Show more...</a>
      </div>`
      this.element.onclick = this.onClick.bind(this);
      this.element.style.cursor = 'pointer';
  }

  static dropdownFields() {
    return [{'name': 'Cardiologist',
            'fields': [{'id': 'heartpressure',
                        'title': 'Heart Pressure',
                        'placeholder': '120/80',
                        'type': 'field'},
                        {'id': 'bmiindex',
                        'placeholder': '1.28',
                        'title': 'Your BMI Index',
                        'type': 'field'},
                        {'id': 'heartdiseases',
                        'placeholder': 'Names of diseases',
                        'title': 'Heart Diseases',
                        'type': 'field'},
                        {'id': 'age',
                        'placeholder': '18',
                        'title': 'Age',
                        'type': 'field'}
                      ]},
            {'name':'Dentist',
            'fields': [{'id': 'lastvisit',
                        'title': 'Date of Last Visit',
                        'type': 'date'}]},
            {'name': 'Therapist',
            'fields': [{'id': 'age',
                        'placeholder': '18',
                        'title': 'Age',
                        'type': 'field'}]}
            ]
  }

  onClick(e) {
    if (e.target.classList.contains('delete')) {
      let idx = Array.from(e.target.parentNode.children).indexOf(e.target);
      cardList.splice(idx, 1);
      cardStorage.setItem("cards", JSON.stringify(cardList));
      this.element.remove();
      } else if (e.target.classList.contains('show-more-link')) {
        e.preventDefault();
        e.target.innerText === 'Show more...' ? e.target.innerText = 'Show less...' : e.target.innerText = 'Show more...'
        e.target.previousSibling.classList.toggle('is-hidden');
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

  addCardioFields() {
    const fieldContainer = document.createElement('div');
    fieldContainer.classList.add('additional-fields', 'is-hidden');
    fieldContainer.innerHTML = `
              <span class="doctor-field"><strong>Heart Pressure:</strong>${this.pressure}</span>
              <span class="doctor-field"><strong>BMI Index:</strong> ${this.bmiindex}</span>
              <span class="doctor-field"><strong>Heart Diseases:</strong> ${this.heartdiseases}</span>
              <span class="doctor-field"><strong>Age:</strong> ${this.age}</span>
              <span class="doctor-field"><strong>Date of Visit:</strong> ${this.date}</span>
              <span class="doctor-field">Comment: ${this.commentary}</span>
  `
    const basicCard = this.element;
    const showMore = basicCard.querySelector('.card-content > .content > .show-more-link');
    showMore.before(fieldContainer);
  }
}

class DentistVisit extends Visit {
  constructor(visitname, date, fullname, purpose, commentary, lastvisit) {
    super(visitname, date, fullname, purpose, commentary);
    this.visitname = 'Dentist'
    this.lastvisit = lastvisit;
  }

  addDentistFields() {
    const fieldContainer = document.createElement('div');
    fieldContainer.classList.add('additional-fields', 'is-hidden');
    fieldContainer.innerHTML = `
                <span class="doctor-field"><strong>Last Visit Date:</strong> ${this.lastvisit}</span>
                <span class="doctor-field"><strong>Date of Visit:</strong> ${this.date}</span>
                <span class="doctor-field">Comment: ${this.commentary}</span>
    `
    const basicCard = this.element;
    const showMore = basicCard.querySelector('.card-content > .content > .show-more-link');
    showMore.before(fieldContainer);
  }
}

class TherapistVisit extends Visit {
  constructor(visitname, date, fullname, purpose, commentary, age) {
    super(visitname, date, fullname, purpose, commentary);
    this.visitname = 'Therapist'
    this.age = age;
  }

  addTherapistFields() {
    const fieldContainer = document.createElement('div');
    fieldContainer.classList.add('additional-fields', 'is-hidden');
    fieldContainer.innerHTML = `
                <span class="doctor-field"><strong>Age:</strong> ${this.age}</span>
                <span class="doctor-field"><strong>Date of Visit:</strong> ${this.date}</span>
                <span class="doctor-field"><strong>Comment:</strong> ${this.commentary}</span>
    `
    const basicCard = this.element;
    const showMore = basicCard.querySelector('.card-content > .content > .show-more-link');
    showMore.before(fieldContainer);
  }
}

//Load cards from local storage;

const loadCards = (() => {
  let cards = cardStorage.getItem('cards');
  cardList = JSON.parse(cards)
  cardList.forEach(card => newCard(card, false));
}
)();