import { In, Like, Repository } from "typeorm"
import { SortDirection } from "../../common/constant"
import { FindManyUserQuery, FindManyUserResult, CreateUserData, UserSortBy, FindOneUserService, UpdateOneUserService, DeleteOneUserService } from "./models/users.interface"
import { Users } from "./models/users.schema"
import { getRepository } from "../../helpers/getRepository"

export class UserService {
  private readonly userRepository: Repository<Users>

  constructor() {
    this.userRepository = getRepository(Users)
  }

  async createOneUser(createOneData: CreateUserData): Promise<Users> {
    try {
      const newUser = await this.userRepository.save(createOneData)

      delete newUser.password

      return newUser
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async updateOneUser({ query, data }: UpdateOneUserService) {
    const { userId } = query;

    const user = await this.userRepository.findOne({
      where: {
        userId,
      }
    })
  
    if (!user) {
      throw {
        code: 404,
        message: 'User not found'
      }
    }
  
    return this.userRepository.update({ userId }, data)
  }

  async deleteOneUser({ query }: DeleteOneUserService) {
    const { userId } = query;

    const user = await this.userRepository.findOne({
      where: {
        userId,
      }
    })
  
    if (!user) {
      throw {
        code: 404,
        message: 'User not found'
      }
    }
  
    return this.userRepository.remove(user);
  }

  async findOneUser({ query, checkExist = true }: FindOneUserService): Promise<Users> {
    try {
      const user = await this.userRepository.findOne({
        where: query,
      })

      if (!user && checkExist) {
        throw {
          code: 404,
          message: 'User not found',
        }
      }

      return user
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async findManyUser(query: FindManyUserQuery): Promise<FindManyUserResult> {
    try {
      const {
        limit = 0,
        sortBy = UserSortBy.CREATED_AT,
        offset = 0,
        sortDirection = SortDirection.DESC,
        userId,
        firstName,
        lastName,
        status,
      } = query

      const [users, totalCount] = await this.userRepository.findAndCount({
        take: limit,
        skip: offset,
        order: {
          [sortBy]: sortDirection
        },
        where: {
          lastName: lastName ? Like(`%${lastName}%`) : undefined,
          userId: userId ? (Array.isArray(userId) ? In(userId) : userId) : undefined,
          firstName: firstName ? Like(`%${firstName}%`) : undefined,
          status,
        },
      })

      const modifiedUsers = users.map(({ password, ...user }) => user) as Users[];

      return {
        totalCount,
        list: modifiedUsers,
      }
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
