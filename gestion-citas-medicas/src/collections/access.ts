import type { Access, PayloadRequest } from 'payload'

type AppUser = {
  id: string | number
  collection?: string
  role?: 'patient' | 'doctor' | 'admin'
}

export const getAppUser = (req: PayloadRequest): AppUser | null => {
  const user = req.user as AppUser | null
  return user?.collection === 'users' ? user : null
}

export const isCMSAdmin = (req: PayloadRequest) => req.user?.collection === 'admins'

export const isAppAdmin = (req: PayloadRequest) => getAppUser(req)?.role === 'admin'

export const isStaff = (req: PayloadRequest) => {
  const role = getAppUser(req)?.role
  return role === 'admin' || role === 'doctor'
}

export const adminOnly: Access = ({ req }) => isCMSAdmin(req) || isAppAdmin(req)
