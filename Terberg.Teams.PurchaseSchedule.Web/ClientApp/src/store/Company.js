const requestCompaniesType = 'REQUEST_COMPANIES';
const receiveCompaniesType = 'RECEIVE_COMPANIES';
const requestCompaniesError = 'REQUEST_COMPANIES_ERROR';

const initialState = {
    companies: [],
    isLoading: false,
    isError: false,
    errorMessage:''
};

export const actionCreators = {
    requestCompanies: () => async (dispatch) => {
        dispatch({ type: requestCompaniesType });
        const url = "api/purchaseschedule/companies";
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            if (response.ok) {
                response.json()
                    .then(result => {
                        dispatch({ type: receiveCompaniesType, result });
                    })
                    .catch((err) => {
                        var errorMessage = "No companies found. " + err.message
                        dispatch({ type: requestCompaniesError,errorMessage });
                    });
            } else {
                response.json()
                    .then(result => {
                        var errorMessage = result.message;
                        dispatch({ type: requestCompaniesError, errorMessage });
                    })
                    .catch(err => {
                        var errorMessage = "No companies found. " + err.message
                        dispatch({ type: requestCompaniesError, errorMessage });
                    });
            }
        }
        catch (err) {
            var errorMessage = "No companies found. " + err.message
            dispatch({ type: requestCompaniesError, errorMessage });
        }
    }
};

export const reducer = (state, action) => {
    state = state || initialState;

    switch (action.type) {
        case requestCompaniesType:
            return {
                ...state,
                isLoading: true,
                isError: false
            };

        case receiveCompaniesType:
            return {
                ...state,
                companies: action.result,
                isLoading: false,
                isError: false
            };

        case requestCompaniesError:
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