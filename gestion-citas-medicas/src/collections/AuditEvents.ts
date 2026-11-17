import type { CollectionConfig } from 'payload'
import { adminOnly } from './access'

export const AuditEvents: CollectionConfig = {
  slug: 'audit-events',
  admin: {
    group: 'Seguridad',
    useAsTitle: 'action',
    defaultColumns: ['action', 'entity', 'actorEmail', 'createdAt'],
  },
  access: {
    create: () => false,
    read: adminOnly,
    update: () => false,
    delete: () => false,
  },
  fields: [
    { name: 'action', type: 'text', required: true },
    { name: 'entity', type: 'text', required: true },
    { name: 'entityId', type: 'text', required: true },
    { name: 'actorEmail', type: 'email' },
    { name: 'details', type: 'json' },
  ],
  timestamps: true,
  versions: false,
}
