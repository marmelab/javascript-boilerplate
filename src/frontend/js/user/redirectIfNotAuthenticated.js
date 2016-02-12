export default (store) => {
    return (nextState, replace) => {
        const { user: { authenticated }} = store.getState();

        if (!authenticated) {
            replace({
                pathname: '/login',
                state: { nextPathname: nextState.location.pathname },
            });
        }
    };
};
