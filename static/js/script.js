const documentElement = document.documentElement;

const toggleTheme = () => {
  const currentTheme = documentElement.dataset.theme;
  const contrastTheme = currentTheme === 'dark' ? 'light' : 'dark';

  documentElement.dataset.theme = contrastTheme;

  localStorage.setItem('theme', contrastTheme);
};

document.addEventListener('DOMContentLoaded', () => {
  const theme = localStorage.getItem('theme');
  if (theme != null) documentElement.dataset.theme = theme;
});
