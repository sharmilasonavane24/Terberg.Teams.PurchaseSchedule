const requestBuyerGroupsType = 'REQUEST_BUYERGROUPS';
const receiveBuyerGroupsType = 'RECEIVE_BUYERGROUPS';
const requestBuyerGroupsError = 'REQUEST_BUYERGROUPS_ERROR';

const initialState = {
    buyerGroups: [],
    isLoading: false,
    isError: false,
    errorMessage: ''
};

export const actionCreators = {
    requestBuyerGroups: () => async (dispatch) => {
        dispatch({ type: requestBuyerGroupsType });
        const url = "api/purchaseschedule/buyergroups";
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            if (response.ok) {
                response.json()
                    .then(result => {
                        dispatch({ type: receiveBuyerGroupsType, result });
                    })
                    .catch((err) => {
                        var errorMessage = "No buyer group found. " + err.message
                        dispatch({ type: requestBuyerGroupsError, errorMessage });
                    });
            } else {
                response.json()
                    .then(result => {
                        var errorMessage = result.message;
                        dispatch({ type: requestBuyerGroupsError, errorMessage });
                    })
                    .catch(err => {
                        var errorMessage = "No buyer group found. " + err.message
                        dispatch({ type: requestBuyerGroupsError, errorMessage });
                    });
            }
        }
        catch (err) {
            var errorMessage = "No buyer group found. " + err.message
            dispatch({ type: requestBuyerGroupsError, errorMessage });
        }
    }
};

export const reducer = (state, action) => {
    state = state || initialState;

    switch (action.type) {
        case requestBuyerGroupsType:
            return {
                ...state,
                isLoading: true,
                isError: false
            };

        case receiveBuyerGroupsType:
            return {
                ...state,
                buyerGroups: action.result,
                isLoading: false,
                isError: false
            };

        case requestBuyerGroupsError:
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