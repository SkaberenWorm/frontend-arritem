var Usuario = /** @class */ (function () {
    function Usuario(fields) {
        this.id = 0;
        this.nombre = '';
        this.correo = '';
        this.activo = true;
        this.rol = '';
        if (fields) {
            Object.assign(this, fields);
        }
    }
    return Usuario;
}());
export { Usuario };
//# sourceMappingURL=usuario.model.js.map