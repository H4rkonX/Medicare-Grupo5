import type { Access, CollectionConfig, Where } from 'payload'
import { getAppUser, isAppAdmin, isCMSAdmin } from './access'

const doctorOrAdmin: Access = ({ req }) => {
  if (isCMSAdmin(req) || isAppAdmin(req)) return true
  const user = getAppUser(req)
  return user?.role === 'doctor' ? { user: { equals: user.id } } : false
}

export const DoctorProfiles: CollectionConfig = {
  slug: 'doctor-profiles',
  admin: {
    group: 'MediCare',
    useAsTitle: 'displayName',
    defaultColumns: ['displayName', 'specialty', 'active'],
  },
  access: {
    create: ({ req }) => isCMSAdmin(req) || isAppAdmin(req),
    read: ({ req }) => {
      if (isCMSAdmin(req) || isAppAdmin(req)) return true
      const user = getAppUser(req)
      if (user?.role === 'doctor') {
        const ownOrActive: Where = {
          or: [
            { active: { equals: true } },
            { user: { equals: user.id } },
          ],
        }
        return ownOrActive
      }
      return { active: { equals: true } } satisfies Where
    },
    update: doctorOrAdmin,
    delete: ({ req }) => isCMSAdmin(req) || isAppAdmin(req),
  },
  fields: [
    { name: 'displayName', type: 'text', required: true, maxLength: 100 },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      unique: true,
      filterOptions: { role: { equals: 'doctor' } },
    },
    {
      name: 'specialty',
      type: 'relationship',
      relationTo: 'specialties',
      required: true,
    },
    { name: 'licenseNumber', type: 'text', required: true, unique: true, maxLength: 50 },
    { name: 'bio', type: 'textarea', required: true, maxLength: 500 },
    { name: 'yearsExperience', type: 'number', min: 0, max: 70, required: true },
    { name: 'consultationMinutes', type: 'number', defaultValue: 30, min: 15, max: 120 },
    { name: 'active', type: 'checkbox', defaultValue: true },
  ],
  timestamps: true,
  versions: false,
}
