const sendForm = (formData) => {
    const xhr = new XMLHttpRequest();

    xhr.open('POST', 'http://localhost:9090/submitForm', true);

    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {

        if (xhr.status >= 200 && xhr.status < 300) {
            const response = JSON.parse(xhr.responseText);
            if (response.status === 'success') document.getElementById('form').reset();
            console.log(response);
            const openModalBtn = document.getElementById('openModalBtn');
            const modalTitle = document.getElementById('status');
            modalTitle.textContent = response.status.toUpperCase();
            response.status === 'error' ? modalTitle.style.color = 'red' : modalTitle.style.color = 'green';
            const modalContent = document.getElementById('modalContent');

            if (response.status === 'error') {
                setTimeout(() => {
                    openModalBtn.style.backgroundColor = 'rgb(241, 49, 49)';
                }, 500);
                modalContent.innerHTML = '';
                for (const key in response.fields) {
                    if (response.fields.hasOwnProperty(key)) {
                        const span = document.createElement('span');
                        span.textContent = `${key}: ${JSON.stringify(response.fields[key])}`;
                        modalContent.append(span);
                    }
                }
            } else {
                setTimeout(() => {
                    openModalBtn.style.backgroundColor = 'rgb(98, 163, 88)';
                }, 500);
                modalContent.textContent = JSON.stringify(response.msg);
            }
           

        } else {
            console.error('Request failed with status:', xhr.status);
        }
    };

    xhr.onerror = function () {
        console.error('Request failed');
    };

    xhr.send(JSON.stringify(formData));


};

export { sendForm };