export var AUTENTICAR = '[AUTENTICAR]';
export var AUTENTICAR_SUCCESS = '[AUTENTICAR SUCCESS]';
export var AUTENTICAR_FAIL = '[AUTENTICAR FAIL]';
export var SET_AUTENTICADO = '[SET AUTENTICADO]';
export var LOGOUT = '[LOGOUT]';
export var LOGOUT_SUCCESS = '[LOGOUT SUCCESS]';
var Autenticar = /** @class */ (function () {
    function Autenticar(identificacion) {
        this.identificacion = identificacion;
        this.type = AUTENTICAR;
    }
    return Autenticar;
}());
export { Autenticar };
var AutenticarSuccess = /** @class */ (function () {
    function AutenticarSuccess(respuesta) {
        this.respuesta = respuesta;
        this.type = AUTENTICAR_SUCCESS;
    }
    return AutenticarSuccess;
}());
export { AutenticarSuccess };
var AutenticarFail = /** @class */ (function () {
    function AutenticarFail(error) {
        this.error = error;
        this.type = AUTENTICAR_FAIL;
    }
    return AutenticarFail;
}());
export { AutenticarFail };
var SetAutenticado = /** @class */ (function () {
    function SetAutenticado(usuario) {
        this.usuario = usuario;
        this.type = SET_AUTENTICADO;
    }
    return SetAutenticado;
}());
export { SetAutenticado };
var Logout = /** @class */ (function () {
    function Logout() {
        this.type = LOGOUT;
    }
    return Logout;
}());
export { Logout };
var LogoutSuccess = /** @class */ (function () {
    function LogoutSuccess() {
        this.type = LOGOUT_SUCCESS;
    }
    return LogoutSuccess;
}());
export { LogoutSuccess };
//# sourceMappingURL=auth.actions.js.map