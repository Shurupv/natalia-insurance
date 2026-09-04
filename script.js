const menuButton = document.querySelector('.menu-button');
const mainNav = document.querySelector('.main-nav');

menuButton?.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

mainNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

const form = document.querySelector('.request-form');
form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const name = data.get('name');
  const phone = data.get('phone');
  const service = data.get('service');
  const channel = data.get('channel');
  const message = `Здравствуйте, Наталья! Меня зовут ${name}. Интересует: ${service}. Мой телефон: ${phone}.`;
  const encodedMessage = encodeURIComponent(message);
  const success = form.querySelector('.form-success');
  success.textContent = `Открываю ${channel === 'email' ? 'почту' : channel === 'telegram' ? 'Telegram' : 'WhatsApp'} с готовой заявкой…`;
  success.hidden = false;

  const destinations = {
    whatsapp: `https://wa.me/79112807485?text=${encodedMessage}`,
    telegram: `https://t.me/insurance_Natalia?text=${encodedMessage}`,
    email: `mailto:sharipovanatalyav@mail.ru?subject=${encodeURIComponent('Заявка на страхование')}&body=${encodedMessage}`,
  };

  window.location.href = destinations[channel];
});

document.querySelector('#year').textContent = new Date().getFullYear();
