export const PUBLIC_ROUTES = {
  USERS: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup'
  },
  ABOUT_US: '/about-us'
}

export const PUBLIC_ROUTES_HOME = '/'

export const PRIVATE_ROUTES = {
  CHARTS: {
    BIOCHEMISTRY: '/charts/biochemistry',
    COAGULATION: '/charts/coagulation',
    HEMATOLOGY: '/charts/hematology'
  },

  MISC: {
    ANALYTICS_TABLE: '/misc/analytics-table'
  }
} as const

export const { CHARTS } = PRIVATE_ROUTES
export const MISC = PRIVATE_ROUTES.MISC

export const PRIVATE_ROUTES_LIST = [
  CHARTS.BIOCHEMISTRY,
  CHARTS.COAGULATION,
  CHARTS.HEMATOLOGY,
  MISC.ANALYTICS_TABLE
] as const

export const PUBLIC_ROUTES_LIST = [
  PUBLIC_ROUTES.USERS.LOGIN,
  PUBLIC_ROUTES.USERS.SIGNUP,
  PUBLIC_ROUTES.ABOUT_US
] as const
