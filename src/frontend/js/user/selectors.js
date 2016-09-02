export const getPreviousRoute = state => {
    if (state.routing && state.routing.locationBeforeTransitions && state.routing.locationBeforeTransitions.state) {
        return state.routing.locationBeforeTransitions.state.nextPathname;
    }

    return '/';
};
