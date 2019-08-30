'use strict';

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var cardStorage = window.localStorage;
var cardList = [];

var html = document.getElementsByTagName('html')[0];
var create = document.getElementById('create-btn');
var modal = document.getElementById('card-modal');
var modalCloses = document.querySelectorAll('.modal-background, .modal-card-head > .delete, .modal-card-foot > .cancel');
var form = document.getElementById('modal-form');
var injectfield = document.getElementById('first-field');
var doctorselect = document.getElementById('doctor-select');
var save = document.getElementById('save');
var dashboard = document.getElementById('dashboard');

var removeFields = function removeFields() {
  var fields = Array.from(document.getElementsByClassName('field generated'));
  if (fields.length !== 0) {
    fields.forEach(function (el) {
      return el.remove();
    });
  }
};

var closeModal = function closeModal() {
  modal.classList.remove('is-active');
  html.classList.remove('is-clipped');
  Array.from(form.elements).forEach(function (el) {
    return el.classList.remove('is-danger');
  });
  form.reset();
  removeFields();
};

create.addEventListener('click', function () {
  modal.classList.add('is-active');
  html.classList.add('is-clipped');
});

modalCloses.forEach(function (el) {
  return el.addEventListener('click', closeModal);
});

doctorselect.addEventListener('change', function (e) {
  var doctor = e.target.value;


  var doctorFields = Visit.dropdownFields().find(function (el) {
    return doctor === el.name;
  }).fields;
  removeFields();

  doctorFields.forEach(function (el) {
    var field = document.createElement('div');
    field.classList.add('field', 'generated');

    if (el.type === 'field') {
      field.innerHTML = '<label class="label">' + el.title + '</label>\n                        <div class="control">\n                          <input class="input" name="' + el.id + '" type="text" placeholder="' + el.placeholder + '" required>\n                        </div>';

      injectfield.after(field);
    } else if (el.type === 'date') {
      field.innerHTML = '<label class="label">' + el.title + '</label>\n                          <div class="control">\n                            <input class="input" name="' + el.id + '" type="date" required>\n                          </div>';
      injectfield.after(field);
    }
  });
});

var newCard = function newCard(fd) {
  var fromUser = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  var card = void 0;
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
};

save.addEventListener('click', function () {
  Array.from(form.elements).forEach(function (el) {
    return el.addEventListener('invalid', function (e) {
      return e.target.classList.add('is-danger');
    });
  });

  if (form.reportValidity()) {
    var formIter = new FormData(form);
    var formData = {};
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = formIter.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _step$value = _slicedToArray(_step.value, 2),
            key = _step$value[0],
            val = _step$value[1];

        formData[key] = val;
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    newCard(formData);
    closeModal();
  }
});

var Visit = function () {
  function Visit(visitname, date, fullname, purpose, commentary) {
    _classCallCheck(this, Visit);

    this.visitname = visitname;
    this.date = date;
    this.fullname = fullname;
    this.purpose = purpose;
    this.commentary = commentary;

    this.element = document.createElement('div');
    this.element.classList.add('card', 'card-size');
    this.element.innerHTML = '\n    <header class="card-header">\n      <p class="card-header-title">' + this.purpose + '</p>\n      <span class="card-header-icon">\n        <button class="delete" aria-label="close"></button>\n      </span>\n    </header>\n    <div class="card-content">\n      <div class="content">\n        <span class="pacient-name">' + this.fullname + '</span>\n        <span class="doctor-visitname">' + this.visitname + '</span>\n        <a href="#" class="card-header-icon show-more-link" aria-label="more options">\n          Show more...</a>\n      </div>';
    this.element.onclick = this.onClick.bind(this);
    this.element.style.cursor = 'pointer';
  }

  Visit.dropdownFields = function dropdownFields() {
    return [{ 'name': 'Cardiologist',
      'fields': [{ 'id': 'heartpressure',
        'title': 'Heart Pressure',
        'placeholder': '120/80',
        'type': 'field' }, { 'id': 'bmiindex',
        'placeholder': '1.28',
        'title': 'Your BMI Index',
        'type': 'field' }, { 'id': 'heartdiseases',
        'placeholder': 'Names of diseases',
        'title': 'Heart Diseases',
        'type': 'field' }, { 'id': 'age',
        'placeholder': '18',
        'title': 'Age',
        'type': 'field' }] }, { 'name': 'Dentist',
      'fields': [{ 'id': 'lastvisit',
        'title': 'Date of Last Visit',
        'type': 'date' }] }, { 'name': 'Therapist',
      'fields': [{ 'id': 'age',
        'placeholder': '18',
        'title': 'Age',
        'type': 'field' }] }];
  };

  Visit.prototype.onClick = function onClick(e) {
    if (e.target.classList.contains('delete')) {
      var idx = Array.from(dashboard.children).indexOf(this.element);
      cardList.splice(idx, 1);
      cardStorage.setItem("cards", JSON.stringify(cardList));
      this.element.remove();
    } else if (e.target.classList.contains('show-more-link')) {
      e.preventDefault();
      e.target.innerText === 'Show more...' ? e.target.innerText = 'Show less...' : e.target.innerText = 'Show more...';
      e.target.previousSibling.classList.toggle('is-hidden');
    }
  };

  Visit.prototype.draw = function draw() {
    dashboard.appendChild(this.element);
  };

  return Visit;
}();

var CardioVisit = function (_Visit) {
  _inherits(CardioVisit, _Visit);

  function CardioVisit(visitname, date, fullname, purpose, commentary, pressure, bmiindex, heartdiseases, age) {
    _classCallCheck(this, CardioVisit);

    var _this = _possibleConstructorReturn(this, _Visit.call(this, visitname, date, fullname, purpose, commentary));

    _this.visitname = 'Cardiologist';
    _this.pressure = pressure;
    _this.bmiindex = bmiindex;
    _this.heartdiseases = heartdiseases;
    _this.age = age;
    return _this;
  }

  CardioVisit.prototype.addCardioFields = function addCardioFields() {
    var fieldContainer = document.createElement('div');
    fieldContainer.classList.add('additional-fields', 'is-hidden');
    fieldContainer.innerHTML = '\n              <span class="doctor-field"><strong>Heart Pressure:</strong>' + this.pressure + '</span>\n              <span class="doctor-field"><strong>BMI Index:</strong> ' + this.bmiindex + '</span>\n              <span class="doctor-field"><strong>Heart Diseases:</strong> ' + this.heartdiseases + '</span>\n              <span class="doctor-field"><strong>Age:</strong> ' + this.age + '</span>\n              <span class="doctor-field"><strong>Date of Visit:</strong> ' + this.date + '</span>\n              <span class="doctor-field">Comment: ' + this.commentary + '</span>\n  ';
    var basicCard = this.element;
    var showMore = basicCard.querySelector('.card-content > .content > .show-more-link');
    showMore.before(fieldContainer);
  };

  return CardioVisit;
}(Visit);

var DentistVisit = function (_Visit2) {
  _inherits(DentistVisit, _Visit2);

  function DentistVisit(visitname, date, fullname, purpose, commentary, lastvisit) {
    _classCallCheck(this, DentistVisit);

    var _this2 = _possibleConstructorReturn(this, _Visit2.call(this, visitname, date, fullname, purpose, commentary));

    _this2.visitname = 'Dentist';
    _this2.lastvisit = lastvisit;
    return _this2;
  }

  DentistVisit.prototype.addDentistFields = function addDentistFields() {
    var fieldContainer = document.createElement('div');
    fieldContainer.classList.add('additional-fields', 'is-hidden');
    fieldContainer.innerHTML = '\n                <span class="doctor-field"><strong>Last Visit Date:</strong> ' + this.lastvisit + '</span>\n                <span class="doctor-field"><strong>Date of Visit:</strong> ' + this.date + '</span>\n                <span class="doctor-field">Comment: ' + this.commentary + '</span>\n    ';
    var basicCard = this.element;
    var showMore = basicCard.querySelector('.card-content > .content > .show-more-link');
    showMore.before(fieldContainer);
  };

  return DentistVisit;
}(Visit);

var TherapistVisit = function (_Visit3) {
  _inherits(TherapistVisit, _Visit3);

  function TherapistVisit(visitname, date, fullname, purpose, commentary, age) {
    _classCallCheck(this, TherapistVisit);

    var _this3 = _possibleConstructorReturn(this, _Visit3.call(this, visitname, date, fullname, purpose, commentary));

    _this3.visitname = 'Therapist';
    _this3.age = age;
    return _this3;
  }

  TherapistVisit.prototype.addTherapistFields = function addTherapistFields() {
    var fieldContainer = document.createElement('div');
    fieldContainer.classList.add('additional-fields', 'is-hidden');
    fieldContainer.innerHTML = '\n                <span class="doctor-field"><strong>Age:</strong> ' + this.age + '</span>\n                <span class="doctor-field"><strong>Date of Visit:</strong> ' + this.date + '</span>\n                <span class="doctor-field"><strong>Comment:</strong> ' + this.commentary + '</span>\n    ';
    var basicCard = this.element;
    var showMore = basicCard.querySelector('.card-content > .content > .show-more-link');
    showMore.before(fieldContainer);
  };

  return TherapistVisit;
}(Visit);

//Load cards from local storage;

var loadCards = function () {
  var cards = cardStorage.getItem('cards');
  if (cards === null) {
    return;
  };
  cardList = JSON.parse(cards);
  cardList.forEach(function (card) {
    return newCard(card, false);
  });
}();
//# sourceMappingURL=main.js.map