import './styles/index.scss';
import './styles/modalWindow.scss';
import Inputmask from 'inputmask';
import './modalWindow';
import { validateForm } from './formValidation';
import { sendForm } from './sendByAjax';
import  './objValidationServer';

const formToSend = document.getElementById('form');

document.addEventListener('DOMContentLoaded', function () {
    Inputmask({ mask: '+375 (99) 999-99-99' }).mask('#phone');
});

const saveFormData = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const readyToSend = Object.fromEntries(formData);
    validateForm();
    console.log(readyToSend);
    sendForm(readyToSend);
};


formToSend.addEventListener('submit', saveFormData);