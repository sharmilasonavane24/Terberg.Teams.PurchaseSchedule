const requestBuyersType = 'REQUEST_BUYERS';
const receiveBuyersType = 'RECEIVE_BUYERS';
const requestBuyersError = 'REQUEST_BUYERS_ERROR';

const initialState = {
    buyers: [],
    buyerId: '',
    isLoading: false,
    isError: false,
    errorMessage: ''
};

export const actionCreators = {
    requestBuyers: () => async (dispatch) => {
        dispatch({ type: requestBuyersType });
        const url = "api/purchaseschedule/buyers";
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            if (response.ok) {
                response.json()
                    .then(result => {
                        dispatch({ type: receiveBuyersType, result });
                    })
                    .catch((err) => {
                        var errorMessage = "No buyer found. " + err.message
                        dispatch({ type: requestBuyersError, errorMessage });
                    });
            } else {
                response.json()
                    .then(result => {
                        var errorMessage = result.message;
                        dispatch({ type: requestBuyersError, errorMessage });
                    })
                    .catch(err => {
                        var errorMessage = "No buyer found. " + err.message
                        dispatch({ type: requestBuyersError, errorMessage });
                    });
            }
        }
        catch (err) {
            var errorMessage = "No buyer found. " + err.message
            dispatch({ type: requestBuyersError, errorMessage });
        }
    }
};

export const reducer = (state, action) => {
    state = state || initialState;

    switch (action.type) {
        case requestBuyersType:
            return {
                ...state,
                isLoading: true,
                isError: false
            };

        case receiveBuyersType:
            return {
                ...state,
                buyers: action.result,
                isLoading: false,
                isError: false
            };

        case requestBuyersError:
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