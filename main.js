'use strict';

document.addEventListener('DOMContentLoaded', function () {
  console.log('Hello Bulma!');
});

var create = document.getElementById('create-btn');

create.addEventListener('click', function (e) {
  e.preventDefault();
  var modal = document.getElementById('card-modal');
  modal.classList.toggle('is-active');
});

//close modal and refresh forms