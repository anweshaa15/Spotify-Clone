<script>
  // Select all filter buttons
  const filterButtons = document.querySelectorAll('.filters button');
  const playlistItems = document.querySelectorAll('.playlist-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove 'active' class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add 'active' class to the clicked button
      button.classList.add('active');

      // Filter logic
      const filter = button.textContent;
      playlistItems.forEach(item => {
        if (filter === 'All') {
          item.style.display = '';
        } else if (filter === 'Music') {
          item.style.display = item.classList.contains('music') ? '' : 'none';
        } else if (filter === 'Podcasts') {
          item.style.display = item.classList.contains('podcast') ? '' : 'none';
        }
      });
    });
  });
</script>