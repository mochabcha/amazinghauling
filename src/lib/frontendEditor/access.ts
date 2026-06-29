import type { User } from '@/payload-types'

export type FrontendEditorUser = Pick<User, 'id'> & Partial<Pick<User, 'email'>>

export function canUseFrontendEditor(user: null | undefined | FrontendEditorUser) {
  return Boolean(user?.id)
}
