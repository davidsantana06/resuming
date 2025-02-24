const toggleTheme = () => {
  const currentTheme = document.documentElement.dataset.theme;
  const contrastTheme = currentTheme === 'dark' ? 'light' : 'dark';

  document.documentElement.dataset.theme = contrastTheme;

  localStorage.setItem('theme', contrastTheme);
};

document.addEventListener('DOMContentLoaded', () => {
  const theme = localStorage.getItem('theme');
  if (theme) document.documentElement.dataset.theme = theme;
});
