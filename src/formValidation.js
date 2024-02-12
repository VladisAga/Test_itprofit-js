function validateForm() {
    const form = document.getElementById('form');
    const nameInput = form.querySelector('#name');
    const emailInput = form.querySelector('#email');
    const phoneInput = form.querySelector('#phone');
    const textArea = form.querySelector('#comment');

    const showError = (element, message) => {
        element.style.backgroundColor = 'rgba(255, 0, 0, 0.3)';
        const time = setTimeout(() => {
            element.style.backgroundColor = 'white';
        }, 2000);
        const errorMessage = document.createElement('span');
        const nextElement = element.nextElementSibling;
        errorMessage.textContent = message;
        errorMessage.classList.add('errorMessage');
        if (nextElement && element.nextElementSibling.tagName !== 'SPAN') {
            element.after(errorMessage);
        }
        return () => clearTimeout(time);
    }



    const removeError = (element) => {
        const nextElement = element.nextElementSibling;
        if (nextElement && element.nextElementSibling.tagName === 'SPAN') {
            const sibling = element.nextElementSibling;
            sibling.remove();
        }
    }

    const validateTextArea = (element, errorMessage) => {
        if (element.value.trim() === '') {
            return showError(element, errorMessage);
        } else {
            removeError(element);
            return () => { };
        }
    }
    const validateInput = (element, errorMessage) => {
        if (element.value.trim() === '' || element.value.match(/[1-9]/)) {
            return showError(element, errorMessage);
        } else {
            removeError(element);
            return () => { };
        }
    }

    const validatePhoneInput = (element, errorMessage) => {
        if (element.value.includes('_') || element.value.trim() === '') {
            return showError(element, errorMessage);
        } else {
            removeError(element);
            return () => { };
        }
    }

    const validateEmailInput = (element, errorMessage) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(element.value)) {
            return showError(element, errorMessage);
        } else {
            removeError(element);
            return () => { };
        }
    }

    validateInput(nameInput, '*Данные только в буквенном формате');
    validateTextArea(textArea, '*Данные отсутствуют');
    validatePhoneInput(phoneInput, '*Данные введены некорректно или отсутствуют');
    validateEmailInput(emailInput, '*Неправильный формат email адреса');
}

export { validateForm };
