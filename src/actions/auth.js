


//LOGIN
export const login = (data) =>({
    type: 'LOGIN',
    data
});




//LOGOUT

export const logout = () =>({
    type: 'LOGOUT'
});


export const startLogout = () => {
    return () => {
        return firebase.auth().signOut();
    };
};