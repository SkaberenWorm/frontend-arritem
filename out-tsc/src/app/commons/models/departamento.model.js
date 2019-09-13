var Departamento = /** @class */ (function () {
    function Departamento(fields) {
        this.id = 0;
        this.nombre = '';
        this.activo = true;
        if (fields) {
            Object.assign(this, fields);
        }
    }
    return Departamento;
}());
export { Departamento };
//# sourceMappingURL=departamento.model.js.map