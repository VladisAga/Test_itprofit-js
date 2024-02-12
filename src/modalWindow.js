const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const modalOverlay = document.getElementById('modalOverlay');

openModalBtn.addEventListener('click', () => {
    modalOverlay.style.display = 'block';
    document.body.classList.add('modal-open');
    modalOverlay.classList.add('active');
});

closeModalBtn.addEventListener('click', () => {
    modalOverlay.style.display = 'none';
    document.body.classList.remove('modal-open');
    modalOverlay.classList.remove('active');
});