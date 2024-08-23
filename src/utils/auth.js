const auth = {
    isAuthenticated() {
        return !!localStorage.getItem('token'); // Check if token exists
    },
    isAdmin() {
        return localStorage.getItem('role') === 'admin'; // Check if role is admin
    },
};

export default auth;
