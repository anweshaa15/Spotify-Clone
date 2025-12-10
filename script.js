/ Select all filter buttons
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

// Add playback functionality
// Single shared Audio object to avoid multiple tracks playing together
const audio = new Audio();
let currentItem = null;

// Helper to get audio src for an item:
// - first checks data-audio attribute
// - then looks for an <audio> inside the item
function getAudioSrc(item) {
  if (!item) return null;
  if (item.dataset && item.dataset.audio) return item.dataset.audio;
  const innerAudio = item.querySelector && item.querySelector('audio');
  return innerAudio ? innerAudio.src : null;
}

// Toggle play/pause on click of a playlist item
playlistItems.forEach(item => {
  item.style.cursor = 'pointer';
  item.addEventListener('click', () => {
    const src = getAudioSrc(item);
    if (!src) return; // nothing to play

    // If clicking the currently playing item -> toggle pause/play
    if (currentItem === item) {
      if (audio.paused) {
        audio.play();
        item.classList.add('playing');
      } else {
        audio.pause();
        item.classList.remove('playing');
      }
      return;
    }

    // Otherwise switch to the new track
    if (currentItem) {
      currentItem.classList.remove('playing');
    }
    currentItem = item;
    audio.src = src;
    audio.play().then(() => {
      item.classList.add('playing');
    }).catch(() => {
      // play failure (e.g., autoplay policy) — ensure UI updated accordingly
      item.classList.remove('playing');
    });
  });
});

// When track ends, remove playing state
audio.addEventListener('ended', () => {
  if (currentItem) currentItem.classList.remove('playing');
  currentItem = null;
});

// Optional: pause audio if user navigates away or page hidden
document.addEventListener('visibilitychange', () => {
  if (document.hidden && !audio.paused) audio.pause();
});

