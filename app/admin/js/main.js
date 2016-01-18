/* global angular */
import 'ng-admin';
require('ng-admin/build/ng-admin.min.css');

const myApp = angular.module('myApp', ['ng-admin']);

myApp.config(['NgAdminConfigurationProvider', (nga) => {
    const admin = nga
        .application('TeamPlay')
        .baseApiUrl(ADMIN_API_URL); // eslint-disable-line no-undef

    // admin.addEntity(nga.entity('users'));

    // require('./users/userConfig')(nga, admin);

    admin.menu(nga.menu()
        // .addChild(nga.menu(admin.getEntity('users')).icon('<span class="fa fa-users"></span>'))
    );

    admin.dashboard(nga.dashboard());

    nga.configure(admin);
}]);

myApp.config(['RestangularProvider', (RestangularProvider) => {
    RestangularProvider.addFullRequestInterceptor((element, operation, what, url, headers, params) => {
        if (operation === 'getList') {
            if (params._page) {
                const start = (params._page - 1) * params._perPage;
                const end = params._page * params._perPage - 1;
                params.range = `[${start},${end}]`;
                delete params._page;
                delete params._perPage;
            }

            if (params._sortField) {
                params.sort = `[${params._sortField},${params._sortDir}]`;
                delete params._sortField;
                delete params._sortDir;
            }

            if (params._filters) {
                params.filter = params._filters;
                delete params._filters;
            }
        }

        return {params};
    });
}]);
