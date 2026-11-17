import type { CollectionConfig } from 'payload'
import { adminOnly } from './access'

export const Specialties: CollectionConfig = {
  slug: 'specialties',
  admin: {
    group: 'MediCare',
    useAsTitle: 'name',
    defaultColumns: ['name', 'description'],
  },
  access: {
    create: adminOnly,
    read: () => true,
    update: adminOnly,
    delete: adminOnly,
  },
  fields: [
    { name: 'name', type: 'text', required: true, unique: true, maxLength: 80 },
    { name: 'slug', type: 'slug', useAsSlug: 'name' },
    { name: 'description', type: 'textarea', required: true, maxLength: 240 },
    {
      name: 'icon',
      type: 'select',
      defaultValue: 'heart',
      options: ['heart', 'brain', 'eye', 'baby', 'stethoscope', 'bone'],
    },
    { name: 'active', type: 'checkbox', defaultValue: true },
  ],
  timestamps: true,
  versions: false,
}
