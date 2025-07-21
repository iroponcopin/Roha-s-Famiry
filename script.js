document.querySelectorAll('.link-item').forEach(item => {
  item.querySelector('.link-header').addEventListener('click', () => {
    item.classList.toggle('active');
  });
});
