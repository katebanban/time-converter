//* ВЫПАДАЮЩИЙ СПИСОК

const selectorInput = document.querySelector('.selector__input');
const allSelectorBtns = document.querySelectorAll('.selector__btn');
const selectorList = document.querySelector('.selector__list');
const selector = document.querySelector('.selector');

allSelectorBtns[0].classList.add('active');

selectorInput.setAttribute('value', allSelectorBtns[0].innerHTML.trim()); // trim убирает все ненужные пробелы с innerHTML

selectorInput.addEventListener('click', () => {
	selector.classList.toggle('active');
	selectorList.classList.toggle('active');
})

for (let selectorBtn of allSelectorBtns) {
	selectorBtn.addEventListener('click', () => {
		for (let selectorBtn of allSelectorBtns) {
			selectorBtn.classList.remove('active');
		}
		selectorBtn.classList.add('active');

		selectorInput.setAttribute('value', selectorBtn.innerHTML.trim());
		selectorList.classList.remove('active');
		selector.classList.remove('active');
	})

	selectorList.addEventListener('mouseover', () => {
		selectorBtn.classList.remove('active');
	})
}

document.addEventListener('click', (e) => {
	const selectorWithItsChildren = e.composedPath().includes(selector); //! e.composedPath() ===> при событии (клике в любом месте документа) мы создаём массив с элементом, по которому произошёл клик, и всеми его родителями; .includes(selector) ===> происходит проверка, включает ли созданный массив элемент selector в себя (если да - то возвращает true, если нет - false)

	//! если клик произошёл НЕ ПО select и его детям, то выполняем условие (в д.сл. закрываем список)
	if (!selectorWithItsChildren) {
		selector.classList.remove('active');
		selectorList.classList.remove('active');
	}
})


//* МОДАЛЬНОЕ ОКНО (с результатом)

// ищем нашу коробку с модалкой и кнопку открытия модалки
const modalOpenBtn = document.querySelector('.first__btn');
const modalBox = document.querySelector('.modal-box');
const modal = document.querySelector('.modal');
const modalCloseBtn = document.querySelector('.modal__btn-close');
const body = document.querySelector('body');

// вешаем событие по нажатию на кнопку открытия модалки
modalOpenBtn.addEventListener('click', () => {
	modalBox.classList.add('active'); // делаем активной коробку с модалкой
	modal.classList.add('active'); // делаем активной модалку
	body.classList.add('no-scroll');

	// теперь закрываем коробку с модалкой и модалку при клике на кнопку закрытия модалки
	modalCloseBtn.addEventListener('click', () => {
		modalBox.classList.remove('active');
		modal.classList.remove('active');
		body.classList.remove('no-scroll');
	})

})

// закрываем коробку с модалкой и модалку при клике за пределами модалки
//! в д.сл. document не подходит -> с ним модалка даже не открывается
modalBox.addEventListener('click', (e) => {
	const modalWithItsChildren = e.composedPath().includes(modal);

	if (!modalWithItsChildren) {
		modalBox.classList.remove('active');
		modal.classList.remove('active');
		body.classList.remove('no-scroll');
	}
})


//* ВЫЧИСЛЕНИЯ

const modalResultSpan = document.querySelector('.modal__result span')

//! перевод в ДНИ
function convToDays(days = 0, hours = 0, minutes = 0, seconds = 0) {
	const hoursToDays = hours / 24;
	const minutesToDays = minutes / (60 * 24); // minutes / 1440
	const secondsToDays = seconds / (60 * 60 * 24); // seconds / 86400

	const resultInDays = days + hoursToDays + minutesToDays + secondsToDays;

	if (Number.isInteger(resultInDays) === true) {
		return resultInDays;
	} else {
		return resultInDays.toFixed(2);
	}
}

//! перевод в ЧАСЫ
function convToHours(days = 0, hours = 0, minutes = 0, seconds = 0) {
	const daysToHours = days * 24;
	const minutesToHours = minutes / 60;
	const secondsToHours = seconds / (60 * 60); // seconds / 3600

	const resultInHours = daysToHours + hours + minutesToHours + secondsToHours;

	if (Number.isInteger(resultInHours) === true) {
		return resultInHours;
	} else {
		return resultInHours.toFixed(2);
	}
}

//! перевод в МИНУТЫ
function convToMinutes(days = 0, hours = 0, minutes = 0, seconds = 0) {
	const daysToMinutes = days * 24 * 60; // daysInput * 1440
	const hoursToMinutes = hours * 60;
	const secondsToMinutes = seconds / 60;

	const resultInMinutes = daysToMinutes + hoursToMinutes + minutes + secondsToMinutes;

	if (Number.isInteger(resultInMinutes) === true) {
		return resultInMinutes;
	} else {
		return resultInMinutes.toFixed(2);
	}
}

//! перевод в СЕКУНДЫ
function convToSeconds(days = 0, hours = 0, minutes = 0, seconds = 0) {
	const daysToSeconds = days * 24 * 60 * 60; // days * 86400
	const hoursToSeconds = hours * 60 * 60; // hours * 3600
	const minutesToSeconds = minutes * 60;

	const resultInSeconds = daysToSeconds + hoursToSeconds + minutesToSeconds + seconds;

	if (Number.isInteger(resultInSeconds) === true) {
		return resultInSeconds;
	} else {
		return resultInSeconds.toFixed(2);
	}
}

modalOpenBtn.addEventListener('click', () => {
	const daysInput = parseFloat(document.querySelector('#input-days').value) || 0;
	const hoursInput = parseFloat(document.querySelector('#input-hours').value) || 0;
	const minutesInput = parseFloat(document.querySelector('#input-minutes').value) || 0;
	const secondsInput = parseFloat(document.querySelector('#input-seconds').value) || 0;

	if (selectorInput.value === 'Days') {
		modalResultSpan.innerHTML = convToDays(daysInput, hoursInput, minutesInput, secondsInput) + ' days';
	} else if (selectorInput.value === 'Hours') {
		modalResultSpan.innerHTML = convToHours(daysInput, hoursInput, minutesInput, secondsInput) + ' hours';
	} else if (selectorInput.value === 'Minutes') {
		modalResultSpan.innerHTML = convToMinutes(daysInput, hoursInput, minutesInput, secondsInput) + ' minutes';
	} else if (selectorInput.value === 'Seconds') {
		modalResultSpan.innerHTML = convToSeconds(daysInput, hoursInput, minutesInput, secondsInput) + ' seconds';
	}
})
