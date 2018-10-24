const requestSuppliersType = 'REQUEST_SUPPLIERS';
const receiveSuppliersType = 'RECEIVE_SUPPLIERS';
const requestSuppliersError = 'REQUEST_SUPPLIERS_ERROR';

const initialState = {
    suppliers: [],
    supplierId: '',
    isLoading: false,
    isError: false
};

export const actionCreators = {
    requestSuppliers: () => async (dispatch) => {
        dispatch({ type: requestSuppliersType });
        var result = JSON.parse('[{ "id":"1", "name":"SupplierName1" },{ "id":"2", "name":"SupplierName2" },{ "id":"3", "name":"SupplierName3" }]');
        dispatch({ type: receiveSuppliersType, result });
    }
};

export const reducer = (state, action) => {
    state = state || initialState;

    switch (action.type) {
        case requestSuppliersType:
            return {
                ...state,
                isLoading: true,
                isError: false
            };

        case receiveSuppliersType:
            return {
                ...state,
                suppliers: action.result,
                isLoading: false,
                isError: false
            };

        case requestSuppliersError:
            return {
                ...state,

                isLoading: false,
                isError: true
            };

        default:
            return state;
    }
};