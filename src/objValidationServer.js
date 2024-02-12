function validateSentData(formData) {
    const errors = {};

    if (!formData.name || /\d/.test(formData.name)) {
        errors.name = 'Имя должно содержать только буквы и не быть пустым';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = 'Неправильный формат email адреса';
    }

    if (formData.phone.includes('_') || !formData.phone.trim()) {
        errors.phone = 'Неправильный формат номера телефона';
    }

    if (!formData.comment.trim()) {
        errors.comment = 'Комментарий не может быть пустым';
    }

    return Object.keys(errors).length > 0 ? { status: 'error', fields: errors } : { status: "success", msg: "Ваша заявка успешно отправлена" };
}

module.exports = { validateSentData };
