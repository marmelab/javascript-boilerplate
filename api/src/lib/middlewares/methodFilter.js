/* eslint no-param-reassign: off */
export default (availableMethods = ['GET', 'POST', 'PUT', 'DELETE']) => async (ctx, next) => {
    const clean = method => method.toLowerCase().trim();
    const method = clean(ctx.method);
    const isAllowed = availableMethods.map(clean).indexOf(method) !== -1;
    if (!isAllowed) {
        ctx.status = 405; // Method Not Allowed
        ctx.body = {};
        return;
    }

    await next();
};
