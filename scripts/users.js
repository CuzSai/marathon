const users = {
    Durandal: { name: 'Durandal', password: 'rampancy', hasAccess: true },
    Tycho: { name: 'Tycho', password: 'protocol', hasAccess: false },
    Leela: { name: 'Leela', password: 'guardian', hasAccess: false },
    // Add more users as needed
  };
  
  let currentUser = users.Tycho; // Default user
  
  export function getCurrentUser() {
    return currentUser;
  }
  
  export function setCurrentUser(username, password) {
    const matchedKey = Object.keys(users).find(
      key => key.toLowerCase() === username.toLowerCase()
    );
    if (matchedKey && users[matchedKey].password === password) {
      currentUser = users[matchedKey];
      return true;
    }
    return false;
  }
  