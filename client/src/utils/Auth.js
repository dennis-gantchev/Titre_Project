import jwtDecode from "jwt-decode"

class Auth {
    constructor(){
        
    }
    loggedIn = () => {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken(); // GEtting token from localstorage
        return !!token && !this.isTokenExpired(token); // handwaiving here
      }
    
    loggedInAdmin = () => {
        const token = this.getToken(); // GEtting token from localstorage
        let isAdmin = false
        if(token){
            isAdmin = this.getProfile().role === "Admin"
        }
        return !!token && !this.isTokenExpired(token) && isAdmin; // handwaiving here
    }
      isTokenExpired = (token) => {
        try {
          const decoded = jwtDecode(token);
          if (decoded.exp < Date.now() / 1000) {
            // Checking if token is expired. N
            return true;
          } else return false;
        } catch (err) {
          return false;
        }
      }
    
      setToken = (idToken) => {
        // Saves user token to localStorage
        localStorage.setItem('id_token', idToken);
      }
    
      getToken = () => {
        // Retrieves the user token from localStorage
        return localStorage.getItem('id_token');
      }
    
      logout = () => {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('id_token');
      }
    
      getProfile = () => {
        // Using jwt-decode npm package to decode the token
        return jwtDecode(this.getToken());
      }
}

export default Auth