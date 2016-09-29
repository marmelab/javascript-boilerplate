export const template = (subject, order) => `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>${subject}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    </head>
    <body>
        <p>Dear Customer</p>
        <p>Your order "${order.reference}" has successfuly be send.</p>
    </body>
</html>
`;


export default function prepareNewOrderMail(user, order) {
    const subject = 'Your order is send';
    const body = template(subject, order);

    return {
        to: user.email,
        subject,
        body,
    };
}
