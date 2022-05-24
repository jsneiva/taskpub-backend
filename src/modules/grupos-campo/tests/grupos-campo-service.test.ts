import { createRandomString } from '@helpers/utils'
import { GruposCampoRepository } from '../grupos-campo-repository'
import { GruposCampoService } from '../grupos-campo-service'
import { IGrupoCampo } from '../interfaces/grupos-campo-repository'

const gruposCampoService = new GruposCampoService(new GruposCampoRepository())

function randomGrupoCampoData() {
  return {
    nome: createRandomString(30)
  }
}

async function createGrupoCampo(): Promise<IGrupoCampo> {
  const data = randomGrupoCampoData()
  const grupoCampo = await gruposCampoService.create(data)
  return grupoCampo as IGrupoCampo
}

describe('Serviço de grupos de serviço de campo', () => {
  test('Deve cadastrar um novo grupo', async () => {
    const { id } = await createGrupoCampo()
    const grupoCampo = await gruposCampoService.findById(id)
    expect(grupoCampo?.id).toBe(id)
    await gruposCampoService.remove(id)
  })

  test('Deve alterar os dados de um grupo', async () => {
    const { id } = await createGrupoCampo()
    const alterData = randomGrupoCampoData()
    const grupoCampo = await gruposCampoService.update(id, alterData)
    expect(grupoCampo).toMatchObject({ id, ...alterData })
    await gruposCampoService.remove(id)
  })

  test('Deve remover um grupo', async () => {
    const { id } = await createGrupoCampo()
    const removed = await gruposCampoService.remove(id)
    const grupoCampo = await gruposCampoService.findById(id)
    expect(removed && !grupoCampo).toBe(true)
  })

  test('Deve listar os grupos', async () => {
    const gruposCampo = await Promise.all(
      Array(10)
        .fill(null)
        .map(() => createGrupoCampo())
    )
    const list = await gruposCampoService.findMany()
    expect(list.length >= gruposCampo.length).toBe(true)
    await Promise.all(gruposCampo.map(fam => gruposCampoService.remove(fam.id)))
  })

  test('Deve listar os grupos com filtros de busca', async () => {
    const gruposCampo = await Promise.all(
      Array(10)
        .fill(null)
        .map(() => createGrupoCampo())
    )
    const data = { nome: gruposCampo[0].nome }
    const list = await gruposCampoService.findMany(data)
    expect(list.length === 1).toBe(true)
    await Promise.all(gruposCampo.map(fam => gruposCampoService.remove(fam.id)))
  })
})
