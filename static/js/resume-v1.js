const [DARK_THEME, LIGHT_THEME] = ['dark', 'light'];
const CURRENT_THEME_KEY = 'currentTheme';

const { documentElement } = document;

const toggleTheme = () => {
  const currentTheme = documentElement.dataset.theme;
  const contrastTheme = currentTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME;
  localStorage.setItem(CURRENT_THEME_KEY, contrastTheme);
  updateDocumentTheme();
};

const updateDocumentTheme = () => {
  const currentTheme = localStorage.getItem(CURRENT_THEME_KEY);
  if (currentTheme != null) documentElement.dataset.theme = currentTheme;
};

document.addEventListener('DOMContentLoaded', () => toggleTheme());
