/* globals API_URL */
/* eslint no-param-reassign: off */
import ApolloClient, { createNetworkInterface } from 'apollo-client';

const networkInterface = createNetworkInterface({ uri: `${API_URL}/graphql` });

networkInterface.use([{
    applyMiddleware(req, next) {
        if (!req.options.headers) {
            req.options.headers = {};  // Create the header object if needed.
        }

        const token = localStorage.getItem('token');

        if (token) {
            req.options.headers.authorization = token;
        }

        // Allows API to set http-only cookies with AJAX calls
        // @see http://www.redotheweb.com/2015/11/09/api-security.html
        req.options.credentials = 'include';

        next();
    },
}]);

const client = new ApolloClient({
    dataIdFromObject: (result) => {
        if (!result || !result.id) return null;
        if (result.__typename) return `${result.__typename}_${result.id}`;
        return result.id;
    },
    networkInterface,
});

export default client;
