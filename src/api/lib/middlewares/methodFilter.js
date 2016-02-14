export default (availableMethods = ['GET', 'POST', 'PUT', 'DELETE']) => {
    return function* filterRequest(next) {
        const clean = method => method.toLowerCase().trim();
        const method = clean(this.method);
        const isAllowed = availableMethods.map(clean).indexOf(method) !== -1;

        if (!isAllowed) {
            this.status = 405; // Method Not Allowed
            this.body = {};
            return;
        }

        yield next;
    };
};
