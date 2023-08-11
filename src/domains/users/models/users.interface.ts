import { SortDirection } from "../../../common/constant"
import { Users } from "./users.schema"

export enum UserStatuses {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum UserSortBy {
  STATUS = 'status',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  EMAIL = 'email',
  PHONE_NUMBER = 'phoneNumber',
  TEAM_ID = 'teamId',
}

export interface CreateUserData {
  firstName?: string
  lastName?: string
  email: string
  password?: string
  status?: UserStatuses
  phoneNumber?: string
  facebook?: string
  instagram?: string
  address?: string
  profileImage?: string
  teamId?: string
}

interface FindOneUserQuery {
  userId?: string;
  email?: string;
}

export interface FindOneUserService {
  query: FindOneUserQuery
  checkExist?: boolean
}

interface UpdateOneUserQuery {
  userId: string
}

interface UpdateOneUserData {
  firstName?: string
  lastName?: string
  status?: UserStatuses
  facebook?: string
  instagram?: string
  address?: string
  profileImage?: string
}

export interface UpdateOneUserService {
  query: UpdateOneUserQuery
  data: UpdateOneUserData
}

interface DeleteOneUserQuery {
  userId: string
}

export interface DeleteOneUserService {
  query: DeleteOneUserQuery
}

export interface FindManyUserQuery {
  userId?: string | string[];
  firstName?: string;
  lastName?: string;
  status?: UserStatuses
  sortDirection?: SortDirection;
  sortBy?: UserSortBy;
  limit?: number;
  offset?: number;
}

export interface FindManyUserResult {
  list: Users[];
  totalCount: number;
}