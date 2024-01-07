const submitBtn = document.getElementById('submit-btn');
dayInput = document.getElementById('input-day');
monthInput = document.getElementById('input-month');
yearInput = document.getElementById('input-year');
dayResult = document.getElementById('result-day');
monthResult = document.getElementById('result-month');
yearResult = document.getElementById('result-year');
yearValidation = document.getElementById('validating-year');
monthValidation = document.getElementById('validating-month');
dayValidation = document.getElementById('validating-day');


submitBtn.addEventListener('click', function (e) {
    calculateAge();

});

function validateFormInputs(inputEl, validationEl, validationFunc) {
    if (inputEl.value === '') {
        inputEl.parentNode.classList.add('error');
        validationEl.textContent = 'This field is required'
    } else if(!validationFunc(inputEl.value)) {
        inputEl.parentNode.classList.add('error');
        validationEl.textContent = 'Invalid input'
    } else {
        inputEl.parentNode.classList.remove('error');

    }
}

function displayResult(el, difference) {
    let i = 0;
    let intervalId = setInterval(() => {
        el.textContent = i;
        i++;
        if (i > difference) {
            clearInterval(intervalId);
        }
    }, 500 / difference);
}

function calculateAge() {
    let today = new Date();

    let currentYear = today.getFullYear();
    let currentMonth = today.getMonth();
    let currentDay = today.getDate() + 1;

    validateFormInputs(yearInput, yearValidation, (value) =>  currentYear && value > 0);
    validateFormInputs(monthInput, monthValidation, (value) =>  value <= 12 && value > 0);
    validateFormInputs(dayInput, dayValidation, (value) =>  value <= 31 && value > 0);

    let birth = new Date(yearInput.value, monthInput.value - 1, dayInput.value);

    let yearsDifference = currentYear - birth.getFullYear();
    let monthsDifference = currentMonth - birth.getMonth();
    let daysDifference = currentDay - birth.getDate();

    if(monthsDifference < 0) {
        yearsDifference--;
        monthsDifference += 12;
    }

    if(daysDifference < 0) {
        monthsDifference--;
        const daysInPreviousMonth = new Date(currentYear, currentMonth, 0).getDate();
        daysDifference += daysInPreviousMonth;
    }

    let inputDivs = document.querySelectorAll('.calc-age-form > div');
    let isInvalid = false;
    inputDivs.forEach((div) => {
        if(div.classList.contains('error')) {
            isInvalid = true;
            return;
        }
    });
    if(!isInvalid) {
        displayResult(yearResult, yearsDifference);
        displayResult(monthResult, monthsDifference);
        displayResult(dayResult, daysDifference);
    }

}
