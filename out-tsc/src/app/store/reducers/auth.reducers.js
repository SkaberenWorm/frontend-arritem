var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import * as fromActions from '../actions';
var initState = {
    loading: false,
    authenticate: false,
    login: null,
    error: null,
    user: null,
};
export function authReducer(state, action) {
    if (state === void 0) { state = initState; }
    switch (action.type) {
        case fromActions.AUTENTICAR:
            return __assign({}, state, { loading: true, user: action.identificacion.usuario, error: null });
        case fromActions.AUTENTICAR_SUCCESS:
            return __assign({}, state, { authenticate: true, loading: false, login: action.respuesta, error: null });
        case fromActions.AUTENTICAR_FAIL:
            return __assign({}, state, { authenticate: false, loading: false, error: { error: action.error.error, status: action.error.status } });
        case fromActions.SET_AUTENTICADO:
            return __assign({}, state, { authenticate: true, user: action.usuario });
        case fromActions.LOGOUT:
            return this.initState;
        default:
            return state;
    }
}
//# sourceMappingURL=auth.reducers.js.map