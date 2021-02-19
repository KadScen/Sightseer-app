const isLogged = (state = false , action) => {
    switch (action.type) {
        case 'SIGNEDIN':
            return !state;
        default:
            return state;
    }
}

export default isLogged;