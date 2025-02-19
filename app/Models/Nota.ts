import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Nota extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public favorito: boolean

  @column()
  public titulo: string

  @column()
  public texto: string

  @column()
  public cor: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
