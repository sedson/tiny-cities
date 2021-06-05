let theme = localStorage.getItem('theme');

if (theme) {
  document.documentElement.setAttribute('data-theme', theme);
}

const toggleTheme = () => {
  let theme = document.documentElement.dataset.theme;
  theme = (theme && theme === 'dark') ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}
