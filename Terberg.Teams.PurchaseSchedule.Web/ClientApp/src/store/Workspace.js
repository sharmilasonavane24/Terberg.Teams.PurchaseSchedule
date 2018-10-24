const requestWorkspacesType = 'REQUEST_WORKSPACES';
const receiveWorkspacesType = 'RECEIVE_WORKSPACES';
const requestWorkspacesError = 'REQUEST_WORKSPACES_ERROR';

const initialState = {
    workspaces: [],
    workspaceId: '',
    isLoading: false,
    isError: false
};

export const actionCreators = {
    requestWorkspaces: () => async (dispatch) => {
        dispatch({ type: requestWorkspacesType });
        var result = JSON.parse('[{ "id":"1", "name":"WorkspaceName1" },{ "id":"2", "name":"WorkspaceName2" },{ "id":"3", "name":"WorkspaceName3" }]');
        dispatch({ type: receiveWorkspacesType, result });
    }
};

export const reducer = (state, action) => {
    state = state || initialState;

    switch (action.type) {
        case requestWorkspacesType:
            return {
                ...state,
                isLoading: true,
                isError: false
            };

        case receiveWorkspacesType:
            return {
                ...state,
                workspaces: action.result,
                isLoading: false,
                isError: false
            };

        case requestWorkspacesError:
            return {
                ...state,
                
                isLoading: false,
                isError: true
            };

        default:
            return state;
    }
};