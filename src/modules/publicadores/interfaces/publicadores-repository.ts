import { IBaseRepository } from '@global/interfaces/base-repository'

export interface ITelefonePublicador {
  id: number
  publicador_id: number
  telefone: string
  fixo: boolean
  whatsapp: boolean
}

export interface IPublicador {
  id: number
  nome: string
  apelido: string
  endereco: string
  numero_endereco: string
  complemento_endereco: string
  bairro: string
  cidade: string
  uf: string
  cep: string
  ponto_referencia: string
  email: string
  situacao: 'AT' | 'IN' | 'DE' | 'DI'
  estado_civil: 'S' | 'C' | 'V' | 'D'
  data_nascimento: Date
  data_batismo: Date
  data_publicador: Date
  data_pioneiro_regular: Date
  observacao: string
  ungido: boolean
  chefe_familia: boolean
  anciao: boolean
  servo_ministerial: boolean
  pioneiro_regular: boolean
  pioneiro_auxiliar: boolean
  superintendente_grupo: boolean
  ajudante_grupo: boolean
  user_id: number
  grupo_campo_id: number
  familia_id: number
  telefones: ITelefonePublicador[]
  created_at: Date
  updated_at: Date
}

export interface IPublicadoresRepository extends IBaseRepository<IPublicador> {}
