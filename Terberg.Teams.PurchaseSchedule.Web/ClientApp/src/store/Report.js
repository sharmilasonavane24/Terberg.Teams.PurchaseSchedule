const requestReportsType = 'REQUEST_REPORTS';
const receiveReportsType = 'RECEIVE_REPORTS';
const requestReportsError = 'REQUEST_REPORTS_ERROR';

const initialState = {
    reports: [],
    reportId: '',
    isLoading: false,
    isError: false,
    errorMessage: ''
};

export const actionCreators = {
    requestReports: (companycode,
        supplierid,
        buyerid,
        isPurchaseOrder,
        isPlannedOrder,
        isForecastSale,
        isForecastLongTerm) => async (dispatch) => {
            dispatch({ type: requestReportsType });

            let params = {
                     "companycode": companycode,
                "supplierid": supplierid,
                "buyerid": buyerid,
                "isPurchaseOrder": isPurchaseOrder,
                "isPlannedOrder": isPlannedOrder,
                "isForecastSale": isForecastSale,
                "isForecastLongTerm": isForecastLongTerm
            }

            let query = Object.keys(params)
                .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
                .join('&');

            const url = "api/purchaseschedule/reports/?" + query;
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {  'Content-Type': 'application/json' },
            });
            if (response.ok) {
                response.json()
                    .then(result => {
                        dispatch({ type: receiveReportsType, result });
                    })
                    .catch((err) => {
                        var errorMessage = "No report found. " + err.message
                        dispatch({ type: requestReportsError, errorMessage });
                    });
            } else {
                response.json()
                    .then(result => {
                        var errorMessage = result.message;
                        dispatch({ type: requestReportsError, errorMessage });
                    })
                    .catch(err => {
                        var errorMessage = "No report found. " + err.message
                        dispatch({ type: requestReportsError, errorMessage });
                    });
            }
        }
        catch (err) {
            console.log(err);
            var errorMessage = "No report found. " + err.message
            dispatch({ type: requestReportsError, errorMessage });
        }
    }
};

export const reducer = (state, action) => {
    state = state || initialState;

    switch (action.type) {
        case requestReportsType:
            return {
                ...state,
                isLoading: true,
                isError: false
            };

        case receiveReportsType:
            return {
                ...state,
                reports: action.result,
                isLoading: false,
                isError: false
            };

        case requestReportsError:
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