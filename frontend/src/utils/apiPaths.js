export const BASE_URL = 'http://localhost:8000/api/v1';

export const API_PATHS = {
    // AUTHENTICATION ENDPOINTS
    // These endpoints are used for user authentication and management
    AUTH: {
        LOGIN: `${BASE_URL}/auth/login`,
        REGISTER: `${BASE_URL}/auth/register`,
        LOGOUT: `${BASE_URL}/auth/logout`,
        GET_USER_INFO: `${BASE_URL}/auth/getUserInfo`,
        // LOGOUT: `${BASE_URL}/auth/logout`,
    },

    // IMAGE UPLOAD ENDPOINTS
    // This endpoint is used for uploading user images
    IMAGE: {
        UPLOAD: `${BASE_URL}/auth/upload-image`,
    },

    // USER PROFILE ENDPOINTS
    // These endpoint is used for managing user profiles
    DASHBOARD: {
        GET_DATA: `${BASE_URL}/dashboard`,
    },

    // INCOME ENDPOINTS
    // These endpoints are used for managing income records
    INCOME: {
        GET_INCOME: `${BASE_URL}/income/getAll`,
        ADD_INCOME: `${BASE_URL}/income/add`,
        DELETE_INCOME: (id) => `${BASE_URL}/income/delete/${id}`,
        DOWNLOAD_INCOME: `${BASE_URL}/income/downloadIncomeExcel`,
    },

    // EXPENSE ENDPOINTS
    // These endpoints are used for managing expense records
    EXPENSE: {
        GET_EXPENSE: `${BASE_URL}/expense/getAll`,
        ADD_EXPENSE: `${BASE_URL}/expense/add`,
        DELETE_EXPENSE: (id) => `${BASE_URL}/expense/delete/${id}`,
        DOWNLOAD_EXPENSE: `${BASE_URL}/expense/downloadExpenseExcel`,
    },
}