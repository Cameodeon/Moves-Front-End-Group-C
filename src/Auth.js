import jwtDecode from 'jwt-decode';

const Auth = {
    
    isAuthenticated: localStorage.getItem('access_token') ? true : false,

    jwtPayload: localStorage.getItem('access_token') ? jwtDecode(localStorage.getItem('access_token')) : { },

    login(token) {
        this.isAuthenticated = true;
        this.jwtPayload = jwtDecode(token);
        localStorage.setItem('access_token', token);
    },

    signout() {
        this.isAuthenticated = false;
        localStorage.removeItem('access_token');
    },

    getUser() {
        return this.jwtPayload;
    },

    isAuth() {
        return this.isAuthenticated;
    }

};
    
export default Auth;