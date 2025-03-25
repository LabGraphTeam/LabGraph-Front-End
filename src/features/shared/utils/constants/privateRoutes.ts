export const PRIVATE_ROUTES = {
    CHARTS: {
        BIOCHEMISTRY: '/charts/biochemistry',
        COAGULATION: '/charts/coagulation',
        HEMATOLOGY: '/charts/hematology',
    },

    MISC: {
        ANALYTICS_TABLE: '/misc/analytics-table',
    },

    ABOUT_US: '/about-us',
};

export const CHARTS = PRIVATE_ROUTES.CHARTS;
export const MISC = PRIVATE_ROUTES.MISC;
export const ABOUT_US = PRIVATE_ROUTES.ABOUT_US;

export const PRIVATE_ROUTES_LIST = [
    CHARTS.BIOCHEMISTRY,
    CHARTS.COAGULATION,
    CHARTS.HEMATOLOGY,
    MISC.ANALYTICS_TABLE,
    ABOUT_US,
];