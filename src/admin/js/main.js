/* global angular APP_NAME ADMIN_API_URL */
import 'ng-admin';
import productsConfig from './products/config';
import ordersConfig from './orders/config';
import headerTemplate from './header.html';
require('ng-admin/build/ng-admin.min.css');

function redirectToLogin() {
    window.location = '/admin/login.html';
}

function logout() {
    window.localStorage.removeItem('id');
    window.localStorage.removeItem('email');
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('expires');
    redirectToLogin();
}

window.logout = logout;

if (!window.localStorage.getItem('token')) redirectToLogin();

const myApp = angular.module('myApp', ['ng-admin']);

myApp.config(['NgAdminConfigurationProvider', (nga) => {
    const admin = nga
        .application(APP_NAME)
        .baseApiUrl(ADMIN_API_URL);

    admin.addEntity(nga.entity('products'));
    admin.addEntity(nga.entity('orders'));

    productsConfig(nga, admin);
    ordersConfig(nga, admin);

    admin.menu(nga.menu()
        .addChild(nga
            .menu(admin.getEntity('products'))
            .icon('<span class="fa fa-picture-o fa-fw"></span>')
        )
        .addChild(nga
            .menu(admin.getEntity('orders'))
            .icon('<span class="fa fa-credit-card fa-fw"></span>')
        )
    );

    admin.dashboard(nga.dashboard());
    admin.header(headerTemplate);

    nga.configure(admin);
}]);

myApp.config(['RestangularProvider', (RestangularProvider) => {
    RestangularProvider.setDefaultHttpFields({ withCredentials: true });
    RestangularProvider.addFullRequestInterceptor((element, operation, what, url, headers) => {
        const currentTime = (new Date()).getTime();
        const tokenExpires = window.localStorage.getItem('expires');
        const finalHeaders = headers || {};

        if (tokenExpires && tokenExpires < currentTime) logout();

        finalHeaders.Authorization = window.localStorage.getItem('token');

        return { headers: finalHeaders };
    });
}]);
