import prepareNewOrderMail from './mails/newOrderMail';

export default (orderRepository, userRepository, sendEmails) => async (customerId, products) => {
    const newOrder = await orderRepository.saveNewOrder(customerId, products);
    const customer = await userRepository.selectOneById(customerId);

    // Don't wait for the email promise to resolve so that we return the new order asap
    sendEmails(prepareNewOrderMail(
        customer,
        newOrder,
    ));

    return newOrder;
};
