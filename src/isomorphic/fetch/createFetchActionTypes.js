export const REQUEST = 'REQUEST';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';

/**
 * Creates action types constants for fetch actions, prefixed with the specified base:
 * - REQUEST: should be dispatched when a fetch action is requested
 * - SUCCESS: should be dispatched when a fetch action succeeds
 * - FAILURE: should be dispatched when a fetch action fails
 *
 * @example
 * import createFetchActionTypes from 'common-client/createFetchActionTypes';
 * const productsActionTypes = createFetchActionTypes('PRODUCT');
 *
 * console.log(productsActionTypes.REQUEST); // output `PRODUCT_REQUEST`
 * console.log(productsActionTypes.SUCCESS); // output `PRODUCT_SUCCESS`
 * console.log(productsActionTypes.FAILURE); // output `PRODUCT_FAILURE`
 */
export default base =>
    [REQUEST, SUCCESS, FAILURE].reduce((requestTypes, type) => ({
        ...requestTypes,
        [type]: `${base}_${type}`,
    }), {});
