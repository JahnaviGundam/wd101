
let validname = 0;
let validemail = 0;
let validPWD = 0;
let validDOB = 0;

const setErrorName = (element) => {
    element.setCustomValidity('This field is required');
    element.reportValidity();
}

const setErrorEmailRequired = (element) => {
    element.setCustomValidity('This field is required');
    element.reportValidity();
}

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const setErrorValidEmail = (element) => {
    element.setCustomValidity('Provide a valid email address');
    element.reportValidity();
}

const setErrorPassReq = (element) => {
    element.setCustomValidity('Password is required');
    element.reportValidity();
}

const setErrorValidDOB = (element, validDate) => {
    element.setCustomValidity(`Invalid date of birth. Please enter a valid date between ${validDate.min} and ${validDate.max}.`);
    element.reportValidity();
}

const setErrorAcceptTerms = (element) => {
    element.setCustomValidity('You must accept the terms and conditions.');
    element.reportValidity();
}

let userentries = [];

function validateInputs() {
    const username = document.getElementById('name');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const dateofbirth = document.getElementById('dob');
    const acceptTerms = document.getElementById('acceptTerms');

    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const dateofbirthValue = dateofbirth.value.trim();

    // Reset error messages
    username.setCustomValidity('');
    email.setCustomValidity('');
    password.setCustomValidity('');
    dateofbirth.setCustomValidity('');
    acceptTerms.setCustomValidity('');

    if (usernameValue === '') {
        setErrorName(username);
    } else {
        validname = 1;
    }

    if (emailValue === '') {
        setErrorEmailRequired(email);
    } else if (!isValidEmail(emailValue)) {
        setErrorValidEmail(email);
    } else {
        validemail = 1;
    }

    if (passwordValue === '') {
        setErrorPassReq(password);
    } else {
        validPWD = 1;
    }

    if (dateofbirthValue === '') {
        setErrorDOBReq(dateofbirth);
    } else {
        const today = new Date();
        const minDate = new Date(today.getFullYear() - 55, today.getMonth(), today.getDate());
        const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

        const inputDate = new Date(dateofbirthValue);

        if (inputDate < minDate || inputDate > maxDate) {
            setErrorValidDOB(dateofbirth, { min: formatDateString(minDate), max: formatDateString(maxDate) });
        } else {
            validDOB = 1;
        }
    }

    if (!acceptTerms.checked) {
        setErrorAcceptTerms(acceptTerms);
    }

    // Function to format a date string in "YYYY-MM-DD" format
    function formatDateString(date) {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    if (validname && validemail && validPWD && validDOB && acceptTerms.checked) {
        const formData = {
            name: usernameValue,
            email: emailValue,
            password: passwordValue,
            dob: dateofbirthValue,
            acceptTerms: acceptTerms.checked,
        };
        userentries.push(formData);

        // Store all form submissions in localStorage using the key 'allFormData'
        localStorage.setItem('allFormData', JSON.stringify(userentries));

        alert('Form submitted successfully!');

        document.getElementById('form').reset();

        // Call the function to display all stored form data
        displayFormData();
    }
}

function displayFormData() {
    const formDataTable = document.getElementById('formDataBody');
    formDataTable.innerHTML = '';

    const allStoredFormData = JSON.parse(localStorage.getItem('allFormData')) || [];

    allStoredFormData.forEach((formData) => {
        const row = formDataTable.insertRow();
        for (const key in formData) {
            if (Object.prototype.hasOwnProperty.call(formData, key)) {
                const cell = row.insertCell();
                cell.textContent = formData[key];
            }
        }
    });
}

window.onload = displayFormData;

function clearLocalStorage() {
    localStorage.removeItem('allFormData');
}

// Attach the clearLocalStorage function to the beforeunload event
window.addEventListener('beforeunload', clearLocalStorage);

// Function to clear error messages on input change
function clearError(element) {
    element.setCustomValidity('');
}
