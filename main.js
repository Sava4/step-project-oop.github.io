'use strict';

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

document.addEventListener('DOMContentLoaded', function () {
  console.log('Hello Bulma!');
});

var create = document.getElementById('create-btn');
var modal = document.getElementById('card-modal');
var modalCloses = document.querySelectorAll('.modal-background, .modal-card-head > .delete, .modal-card-foot > .button');

create.addEventListener('click', function () {
  modal.classList.add('is-active');
});

modalCloses.forEach(function (el) {
  return el.addEventListener('click', function () {
    modal.classList.remove('is-active');
  });
});

var Visit = function Visit(visitname, date, fullname, commentary) {
  _classCallCheck(this, Visit);

  this.visitname = visitname;
  this.date = date;
  this.fullname = fullname;
  this.commentary = commentary;
};

var CardioVisit = function (_Visit) {
  _inherits(CardioVisit, _Visit);

  function CardioVisit(visitname, date, fullname, commentary, purpose, pressure, bmiindex, heartdiseases, age) {
    _classCallCheck(this, CardioVisit);

    var _this = _possibleConstructorReturn(this, _Visit.call(this, visitname, date, fullname, commentary));

    _this.visitname = 'Cardiologist';
    _this.purpose = purpose;
    _this.pressure = pressure;
    _this.bmiindex = bmiindex;
    _this.heartdiseases = heartdiseases;
    _this.age = age;
    return _this;
  }

  return CardioVisit;
}(Visit);

var cd = new CardioVisit('visitname', 'date', 'fullname', '400wordessay', 'purpose', 'pressure', 'bmiindex', 'heartdiseases', 'age');
console.dir(cd);

var DentistVisit = function (_Visit2) {
  _inherits(DentistVisit, _Visit2);

  function DentistVisit(visitname, date, fullname, purpose, lastvisit, commentary) {
    _classCallCheck(this, DentistVisit);

    var _this2 = _possibleConstructorReturn(this, _Visit2.call(this, visitname, date, fullname, commentary));

    _this2.visitname = 'Dentist';
    _this2.purpose = purpose;
    _this2.lastvisit = lastvisit;
    return _this2;
  }

  return DentistVisit;
}(Visit);

var TherapistVisit = function (_Visit3) {
  _inherits(TherapistVisit, _Visit3);

  function TherapistVisit(visitname, date, fullname, purpose, age, commentary) {
    _classCallCheck(this, TherapistVisit);

    var _this3 = _possibleConstructorReturn(this, _Visit3.call(this, visitname, date, fullname, commentary));

    _this3.visitname = 'Therapist';
    _this3.purpose = purpose;
    _this3.age = age;
    return _this3;
  }

  return TherapistVisit;
}(Visit);
//# sourceMappingURL=main.js.map