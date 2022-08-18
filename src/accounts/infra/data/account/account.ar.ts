import * as TypeORM from 'typeorm';
import { AccountType, BankAccount } from '@accounts/domain';

@TypeORM.Entity('accounts')
export class AccountActiveRecord extends TypeORM.BaseEntity {
  @TypeORM.PrimaryGeneratedColumn()
  public id: number;

  @TypeORM.Column({
    length: 16,
  })
  public firstName: string;

  @TypeORM.Column({
    length: 16,
  })
  public lastName: string;

  @TypeORM.Index({ unique: true })
  @TypeORM.Column({
    length: 32,
  })
  public email: string;

  @TypeORM.Column({
    length: 24,
  })
  public document: string;

  @TypeORM.Column({
    type: 'enum',
    enum: AccountType,
  })
  public type: AccountType;

  @TypeORM.Index({ unique: true })
  @TypeORM.Column({
    length: 16,
  })
  public secretKey: string;

  @TypeORM.Column()
  public level: string;

  @TypeORM.Column({
    /*
      Devemos sempre ser cautelosos no momento de escolher
      como armazenar estruturas aninhadas.
      Podemos armazenar esses objetos de duas formas:
        1 - Desnormalização: serializar o objeto e incorporá-lo dentro de uma coluna (embedding)
          Ex: Json Column, Binary Column...
        2 - Desnormalização: distribuir cada campo de um objeto em uma coluna (embedding)
          Ex: | contact.name | contact.phone |
        3 - Normalização: criar uma tabela para cada objeto e ligá-las por meio de uma
        chave estrangeira (foreign key)

      Quando lidamos com objetos serializados, como JSON, devemos levar em conta que em muitas
      engines não é possível criar indexes e realizar consultas avançadas para esses dados.
      Além disso, podemos enfrentar problemas de perfomance à medida que esses registros JSON
      ocupem mais espaço. Ex: Cache, paginação e dentre outros mecanismos.

      Os seguintes tópicos podem ser úteis no momento de decidir a estrutura de armazenamento:
        - Qual é a natureza do objeto? É um objeto de valor simples com no máximo 3 níveis de hierarquia?
        - É uma lista de objetos de valor com um tamanho pouco dinâmico?
        - É um objeto de valor que muda com pouca frequência?

        Se a sua resposta foi "sim" para as três perguntas, então vá em frenter e serialize o objeto em uma
        coluna JSON.
    */
    type: 'json',
  })
  public bankAccount: BankAccount;

  @TypeORM.CreateDateColumn()
  public createdAt: Date;

  @TypeORM.UpdateDateColumn()
  public updatedAt: Date;
}
