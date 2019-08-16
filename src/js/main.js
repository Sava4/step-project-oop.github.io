document.addEventListener('DOMContentLoaded', () => {
  console.log('Hello Bulma!');
});

const create = document.getElementById('create-btn');
const modal = document.getElementById('card-modal');
const modalCloses = document.querySelectorAll('.modal-background, .modal-card-head > .delete, .modal-card-foot > .button');

create.addEventListener('click', () => {
  modal.classList.add('is-active');
})

modalCloses.forEach(el => el.addEventListener('click', () => {
  modal.classList.remove('is-active');
}));

class Visit {
  constructor(visitname, date, fullname, commentary) {
    this.visitname = visitname;
    this.date = date;
    this.fullname = fullname;
    this.commentary = commentary;
  }
}

class CardioVisit extends Visit {
  constructor(visitname, date, fullname, commentary, purpose, pressure, bmiindex, heartdiseases, age) {
    super(visitname, date, fullname, commentary);
    this.visitname = 'Cardiologist'
    this.purpose = purpose;
    this.pressure = pressure;
    this.bmiindex = bmiindex;
    this.heartdiseases = heartdiseases;
    this.age = age;
  }
}

let cd = new CardioVisit('visitname', 'date', 'fullname', '400wordessay', 'purpose', 'pressure', 'bmiindex', 'heartdiseases', 'age');
console.dir(cd);

class DentistVisit extends Visit {
  constructor(visitname, date, fullname, purpose, lastvisit, commentary) {
    super(visitname, date, fullname, commentary);
    this.visitname = 'Dentist'
    this.purpose = purpose;
    this.lastvisit = lastvisit;
  }
}

class TherapistVisit extends Visit {
  constructor(visitname, date, fullname, purpose, age, commentary) {
    super(visitname, date, fullname, commentary);
    this.visitname = 'Therapist'
    this.purpose = purpose;
    this.age = age;
  }
}