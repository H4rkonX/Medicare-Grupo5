import type { Access, CollectionConfig, FieldAccess } from 'payload'
import { getAppUser, isAppAdmin, isCMSAdmin } from './access'

const readOwnOrAdmin: Access = ({ req }) => {
  if (isCMSAdmin(req) || isAppAdmin(req)) return true
  const user = getAppUser(req)
  return user ? { id: { equals: user.id } } : false
}

const adminFieldAccess: FieldAccess = ({ req }) => isCMSAdmin(req) || isAppAdmin(req)

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    group: 'MediCare',
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'role', 'status'],
  },
  auth: {
    maxLoginAttempts: 5,
    lockTime: 10 * 60 * 1000,
  },
  access: {
    create: () => true,
    read: readOwnOrAdmin,
    update: readOwnOrAdmin,
    delete: ({ req }) => isCMSAdmin(req) || isAppAdmin(req),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      maxLength: 100,
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'patient',
      options: [
        { label: 'Paciente', value: 'patient' },
        { label: 'Médico', value: 'doctor' },
        { label: 'Administrador', value: 'admin' },
      ],
      access: {
        create: adminFieldAccess,
        update: adminFieldAccess,
      },
      admin: { position: 'sidebar' },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'active',
      options: [
        { label: 'Activo', value: 'active' },
        { label: 'Suspendido', value: 'suspended' },
      ],
      access: {
        create: adminFieldAccess,
        update: adminFieldAccess,
      },
      admin: { position: 'sidebar' },
    },
    {
      name: 'phone',
      type: 'text',
      maxLength: 24,
    },
  ],
  timestamps: true,
  versions: false,
}
