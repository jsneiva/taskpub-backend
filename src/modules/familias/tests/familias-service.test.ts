import { createRandomString } from '@helpers/utils'
import { FamiliasRepository } from '../familias-repository'
import { FamiliasService } from '../familias-service'
import { IFamilia } from '../interfaces/familias-repository'

const familiasService = new FamiliasService(new FamiliasRepository())

function randomFamiliaData() {
  return {
    nome: createRandomString(30)
  }
}

async function createFamilia(): Promise<IFamilia> {
  const data = randomFamiliaData()
  const familia = await familiasService.create(data)
  return familia as IFamilia
}

describe('Serviço de familias de publicadores', () => {
  test('Deve cadastrar uma nova família', async () => {
    const { id } = await createFamilia()
    const familia = await familiasService.findById(id)
    expect(familia?.id).toBe(id)
    await familiasService.remove(id)
  })

  test('Deve alterar os dados de uma familia', async () => {
    const { id } = await createFamilia()
    const alterData = randomFamiliaData()
    const familia = await familiasService.update(id, alterData)
    expect(familia).toMatchObject({ id, ...alterData })
    await familiasService.remove(id)
  })

  test('Deve remover uma família', async () => {
    const { id } = await createFamilia()
    const removed = await familiasService.remove(id)
    const familia = await familiasService.findById(id)
    expect(removed && !familia).toBe(true)
  })

  test('Deve listar as familias', async () => {
    const familias = await Promise.all(
      Array(10)
        .fill(null)
        .map(() => createFamilia())
    )
    const list = await familiasService.findMany()
    expect(list.length >= familias.length).toBe(true)
    await Promise.all(familias.map(fam => familiasService.remove(fam.id)))
  })

  test('Deve listar as familias com filtros de busca', async () => {
    const familias = await Promise.all(
      Array(10)
        .fill(null)
        .map(() => createFamilia())
    )
    const data = { nome: familias[0].nome }
    const list = await familiasService.findMany(data)
    expect(list.length === 1).toBe(true)
    await Promise.all(familias.map(fam => familiasService.remove(fam.id)))
  })
})
