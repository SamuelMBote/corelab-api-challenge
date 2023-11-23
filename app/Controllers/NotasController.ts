import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Nota from 'App/Models/Nota'
type Iresponsenota =
  | {
      message: string
      data: Nota
    }
  | {
      message: string
      data: Nota[]
    }

export default class NotasController {
  public async store({ request, response }: HttpContextContract): Promise<Iresponsenota> {
    const body = request.body()
    const nota = await Nota.create(body)
    response.status(201)
    return { message: 'Nota incluida com sucesso', data: nota }
  }

  public async index({ request, response }: HttpContextContract) {
    const { pesquisa, cores }: Record<string, string> = request.qs()
    let notas: Nota[]
    if (pesquisa && pesquisa.length > 0 && cores && cores.length > 0) {
      notas = await Nota.query()
        .whereLike('texto', '')
        .whereLike('texto', `%${pesquisa}%`)
        .orWhereLike('titulo', `%${pesquisa}%`)
        .andWhereIn('cor', cores.split(','))
    } else if (pesquisa && pesquisa.length > 0 && (!cores || cores.length <= 0)) {
      notas = await Nota.query()
        .whereLike('texto', `%${pesquisa}%`)
        .orWhereLike('titulo', `%${pesquisa}%`)
    } else if ((!pesquisa || pesquisa.length <= 0) && cores && cores.length > 0) {
      notas = await Nota.query().whereIn('cor', cores.split(','))
    } else {
      notas = await Nota.all()
    }

    if (notas && notas.length > 0) {
      response.status(200)
      return { message: 'Notas Encontradas', data: notas }
    } else {
      response.status(204)
      return { message: 'Nehuma Nota Encontradas', data: [] }
    }
  }
  public async show({ response, params: { id } }: HttpContextContract): Promise<Iresponsenota> {
    const nota = await Nota.findByOrFail('id', id)

    if (nota) {
      response.status(200)
      return { message: 'Dados encontrados', data: nota }
    } else {
      response.status(204)
      return { message: 'Nada Encontrado', data: [] }
    }
  }

  public async update({
    params: { id },
    request,
    response,
  }: HttpContextContract): Promise<Iresponsenota> {
    const body: Record<keyof Nota, any> = request.body()
    const nota = await Nota.findByOrFail('id', id)
    if (nota) {
      nota.titulo = body.titulo
      nota.texto = body.texto
      nota.favorito = body.favorito
      nota.cor = body.cor
      await nota.save()

      response.status(200)
      return { message: 'Nota atualizada com sucesso', data: nota }
    } else {
      response.status(204)
      return { message: 'Nota atualizada com sucesso', data: [] }
    }
  }
  public async destroy({ params: { id }, response }: HttpContextContract): Promise<Iresponsenota> {
    const nota = await Nota.findByOrFail('id', id)
    if (nota) {
      await nota.delete()
      response.status(200)
      return { message: 'Nota excluida com sucesso', data: nota }
    } else {
      response.status(204)
      return { message: 'Nota não foi encontrada ou já havia sido excluida', data: [] }
    }
  }
}
