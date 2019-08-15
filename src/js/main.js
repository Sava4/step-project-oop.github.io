document.addEventListener('DOMContentLoaded', () => {
  console.log('Hello Bulma!');
});

const create = document.getElementById('create-btn');

create.addEventListener('click', (e) => {
  e.preventDefault();
  let modal = document.getElementById('card-modal');
  modal.classList.toggle('is-active');
})

//close modal and refresh forms