// tokenStorage.js
export function storeToken(tok) {
    try {
      localStorage.setItem('token_data', tok.accessToken);
    } catch (e) {
      console.log(e.message);
    }
  }
  
  export function retrieveToken() {
    var ud;
    try {
      ud = localStorage.getItem('token_data');
    } catch (e) {
      console.log(e.message);
    }
    return ud;
  }