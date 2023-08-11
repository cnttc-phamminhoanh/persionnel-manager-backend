import { EntityTarget, ObjectLiteral, Repository } from "typeorm"
import dataSource from "../database/dataSource"

export const getRepository = <T extends ObjectLiteral>(schema: EntityTarget<ObjectLiteral>): Repository<T> => {
  const repository = dataSource.getRepository(schema)

  return repository as Repository<T>
}
