const requestSuppliersType = 'REQUEST_SUPPLIERS';
const receiveSuppliersType = 'RECEIVE_SUPPLIERS';
const requestSuppliersError = 'REQUEST_SUPPLIERS_ERROR';

const initialState = {
    suppliers: [],
    supplierId: '',
    isLoading: false,
    isError: false,
    errorMessage:''
};

export const actionCreators = {
    requestSuppliers: () => async (dispatch) => {
        dispatch({ type: requestSuppliersType });
        const url = "api/purchaseschedule/suppliers";
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            console.log(response);
            if (response.ok) {
                response.json()
                    .then(result => {
                        dispatch({ type: receiveSuppliersType, result });
                    })
                    .catch((err) => {
                        var errorMessage = "No suppliers found. " + err.message
                        dispatch({ type: requestSuppliersError,errorMessage });
                    });
            } else {
                response.json()
                    .then(result => {
                        var errorMessage = result.message;
                        dispatch({ type: requestSuppliersError, errorMessage });
                    })
                    .catch(err => {
                        var errorMessage = "No suppliers found. " + err.message
                        dispatch({ type: requestSuppliersError, errorMessage });
                    });
            }
        }
        catch (err) {
            var errorMessage = "No suppliers found. " + err.message
            dispatch({ type: requestSuppliersError, errorMessage });
        }
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
                errorMessage: action.errorMessage,
                isLoading: false,
                isError: true
            };

        default:
            return state;
    }
};