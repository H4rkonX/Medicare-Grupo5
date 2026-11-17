import type { Access, CollectionConfig } from 'payload'
import { getAppUser, isAppAdmin, isCMSAdmin } from './access'

const manageAvailability: Access = ({ req }) => {
  if (isCMSAdmin(req) || isAppAdmin(req)) return true
  const user = getAppUser(req)
  return user?.role === 'doctor' ? { 'doctor.user': { equals: user.id } } : false
}

export const Availability: CollectionConfig = {
  slug: 'availability',
  admin: {
    group: 'MediCare',
    useAsTitle: 'label',
    defaultColumns: ['label', 'doctor', 'dayOfWeek', 'startTime', 'endTime'],
  },
  access: {
    create: manageAvailability,
    read: () => true,
    update: manageAvailability,
    delete: manageAvailability,
  },
  fields: [
    { name: 'label', type: 'text', required: true, maxLength: 100 },
    {
      name: 'doctor',
      type: 'relationship',
      relationTo: 'doctor-profiles',
      required: true,
    },
    {
      name: 'dayOfWeek',
      type: 'select',
      required: true,
      options: [
        { label: 'Lunes', value: '1' },
        { label: 'Martes', value: '2' },
        { label: 'Miércoles', value: '3' },
        { label: 'Jueves', value: '4' },
        { label: 'Viernes', value: '5' },
        { label: 'Sábado', value: '6' },
      ],
    },
    { name: 'startTime', type: 'text', required: true },
    { name: 'endTime', type: 'text', required: true },
    { name: 'active', type: 'checkbox', defaultValue: true },
  ],
  timestamps: true,
  versions: false,
}
