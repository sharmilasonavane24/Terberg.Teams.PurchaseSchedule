const requestVersionsType = 'REQUEST_VERSIONS';
const receiveVersionsType = 'RECEIVE_VERSIONS';
const requestVersionsError = 'REQUEST_VERSIONS_ERROR';

const initialState = {
    versions: [],
    versionId: '',
    isLoading: false,
    isError: false
};

export const actionCreators = {
    requestVersions: () => async (dispatch) => {
        dispatch({ type: requestVersionsType });
        var result = JSON.parse('[{ "versionid":"1", "versionname":"1" },{ "versionid":"2", "versionname":"2" },{ "versionid":"3", "versionname":"3" }]');
        dispatch({ type: receiveVersionsType, result });
    }
};

export const reducer = (state, action) => {
    state = state || initialState;

    switch (action.type) {
        case requestVersionsType:
            return {
                ...state,
                isLoading: true,
                isError: false
            };

        case receiveVersionsType:
            return {
                ...state,
                versions: action.result,
                isLoading: false,
                isError: false
            };

        case requestVersionsError:
            return {
                ...state,
                
                isLoading: false,
                isError: true
            };

        default:
            return state;
    }
};