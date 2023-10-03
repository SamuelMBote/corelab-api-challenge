"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Nota_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Nota"));
class NotasController {
    async store({ request, response }) {
        const body = request.body();
        const nota = await Nota_1.default.create(body);
        response.status(201);
        return { message: 'Nota incluida com sucesso', data: nota };
    }
    async index({ request, response }) {
        const { pesquisa, cores } = request.qs();
        let notas;
        if (pesquisa && pesquisa.length > 0 && cores && cores.length > 0) {
            notas = await Nota_1.default.query()
                .whereLike('texto', '')
                .whereLike('texto', `%${pesquisa}%`)
                .orWhereLike('titulo', `%${pesquisa}%`)
                .andWhereIn('cor', cores.split(','));
        }
        else if (pesquisa && pesquisa.length > 0 && (!cores || cores.length <= 0)) {
            notas = await Nota_1.default.query()
                .whereLike('texto', `%${pesquisa}%`)
                .orWhereLike('titulo', `%${pesquisa}%`);
        }
        else if ((!pesquisa || pesquisa.length <= 0) && cores && cores.length > 0) {
            notas = await Nota_1.default.query().whereIn('cor', cores.split(','));
        }
        else {
            notas = await Nota_1.default.all();
        }
        if (notas && notas.length > 0) {
            response.status(200);
            return { message: 'Notas Encontradas', data: notas };
        }
        else {
            response.status(204);
            return { message: 'Nehuma Nota Encontradas', data: [] };
        }
    }
    async show({ response, params: { id } }) {
        const nota = await Nota_1.default.findByOrFail('id', id);
        if (nota) {
            response.status(200);
            return { message: 'Dados encontrados', data: nota };
        }
        else {
            response.status(204);
            return { message: 'Nada Encontrado', data: [] };
        }
    }
    async update({ params: { id }, request, response, }) {
        const body = request.body();
        const nota = await Nota_1.default.findByOrFail('id', id);
        if (nota) {
            nota.titulo = body.titulo;
            nota.texto = body.texto;
            nota.favorito = body.favorito;
            nota.cor = body.cor;
            await nota.save();
            response.status(200);
            return { message: 'Nota atualizada com sucesso', data: nota };
        }
        else {
            response.status(204);
            return { message: 'Nota atualizada com sucesso', data: [] };
        }
    }
    async destroy({ params: { id }, response }) {
        const nota = await Nota_1.default.findByOrFail('id', id);
        if (nota) {
            await nota.delete();
            response.status(200);
            return { message: 'Nota excluida com sucesso', data: nota };
        }
        else {
            response.status(204);
            return { message: 'Nota não foi encontrada ou já havia sido excluida', data: [] };
        }
    }
}
exports.default = NotasController;
//# sourceMappingURL=NotasController.js.map