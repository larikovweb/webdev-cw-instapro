export function saveUserToLocalStorage(user) {
  window.localStorage.setItem('user', JSON.stringify(user));
}

export function getUserFromLocalStorage(user) {
  try {
    return JSON.parse(window.localStorage.getItem('user'));
  } catch (error) {
    return null;
  }
}

export function removeUserFromLocalStorage(user) {
  window.localStorage.removeItem('user');
}

export const getToken = () => {
  const user = getUserFromLocalStorage();
  const token = user ? `Bearer ${user.token}` : undefined;
  return token;
};

export function formatDate(date) {
  let diff = new Date() - date;

  if (diff < 1000) {
    return 'Сейчас';
  }

  let sec = Math.floor(diff / 1000);

  if (sec < 60) {
    return sec + ' секунд назад';
  }

  let min = Math.floor(diff / 60000);
  if (min < 60) {
    return min + ' минут назад';
  }

  let d = date;
  d = [
    '0' + d.getDate(),
    '0' + (d.getMonth() + 1),
    '' + d.getFullYear(),
    '0' + d.getHours(),
    '0' + d.getMinutes(),
  ].map((component) => component.slice(-2));

  return d.slice(0, 3).join('.') + ' ' + d.slice(3).join(':');
}

export const protectionInnerHTML = (text) => {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
};
