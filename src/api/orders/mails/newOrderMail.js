import 'ejs';

export default function prepareNewOrderMail(user, order) {
    const subject = 'Your order is send';
    const compileTemplate = require('./newOrderMail.ejs');
    const body = compileTemplate({ subject, user, order });

    return {
        to: user.email,
        subject,
        body,
    };
}
