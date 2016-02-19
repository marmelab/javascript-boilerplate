export default (store) => {
    return (nextState, replace) => {
        const { user: { authenticated }} = store.getState();

        if (!authenticated) {
            replace({
                pathname: '/sign-in',
                state: { nextPathname: nextState.location.pathname },
            });
        }
    };
};
