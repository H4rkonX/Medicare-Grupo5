import type { Access, CollectionBeforeChangeHook, CollectionConfig, Where } from 'payload'
import { getAppUser, isAppAdmin, isCMSAdmin } from './access'

const appointmentScope: Access = ({ req }) => {
  if (isCMSAdmin(req) || isAppAdmin(req)) return true
  const user = getAppUser(req)
  if (!user) return false
  if (user.role === 'doctor') {
    const doctorScope: Where = { 'doctor.user': { equals: user.id } }
    return doctorScope
  }
  const patientScope: Where = { patient: { equals: user.id } }
  return patientScope
}

const protectAppointment: CollectionBeforeChangeHook = async ({
  data,
  operation,
  originalDoc,
  req,
}) => {
  const user = getAppUser(req)

  if (operation === 'create' && user?.role === 'patient') {
    data.patient = user.id
    data.status = 'scheduled'
  }

  const doctorId =
    typeof data.doctor === 'object' ? data.doctor?.id : data.doctor ?? originalDoc?.doctor
  const startsAt = data.startsAt ?? originalDoc?.startsAt

  if (!doctorId || !startsAt) throw new Error('La cita requiere médico y fecha.')
  if (new Date(startsAt).getTime() <= Date.now()) {
    throw new Error('La cita debe programarse en una fecha futura.')
  }

  const doctor = await req.payload.findByID({
    collection: 'doctor-profiles',
    id: doctorId,
    overrideAccess: true,
  })
  if (!doctor.active) throw new Error('El médico seleccionado no está disponible.')

  const conflicts = await req.payload.find({
    collection: 'appointments',
    overrideAccess: true,
    limit: 1,
    where: {
      and: [
        { doctor: { equals: doctorId } },
        { startsAt: { equals: startsAt } },
        { status: { not_equals: 'cancelled' } },
        ...(originalDoc?.id ? [{ id: { not_equals: originalDoc.id } }] : []),
      ],
    },
  })
  if (conflicts.totalDocs > 0) throw new Error('Ese horario ya fue reservado.')

  return data
}

export const Appointments: CollectionConfig = {
  slug: 'appointments',
  admin: {
    group: 'MediCare',
    useAsTitle: 'reference',
    defaultColumns: ['reference', 'patient', 'doctor', 'startsAt', 'status'],
  },
  access: {
    create: ({ req }) => {
      if (isCMSAdmin(req) || isAppAdmin(req)) return true
      return getAppUser(req)?.role === 'patient'
    },
    read: appointmentScope,
    update: appointmentScope,
    delete: ({ req }) => isCMSAdmin(req) || isAppAdmin(req),
  },
  hooks: {
    beforeChange: [protectAppointment],
    afterChange: [
      async ({ doc, operation, req }) => {
        await req.payload.create({
          collection: 'audit-events',
          overrideAccess: true,
          data: {
            action: operation === 'create' ? 'appointment.created' : 'appointment.updated',
            entity: 'appointment',
            entityId: String(doc.id),
            actorEmail: req.user?.email ?? undefined,
            details: { status: doc.status, startsAt: doc.startsAt },
          },
        })
      },
    ],
  },
  fields: [
    {
      name: 'reference',
      type: 'text',
      required: true,
      unique: true,
      defaultValue: () => `MC-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
    },
    { name: 'patient', type: 'relationship', relationTo: 'users', required: true },
    {
      name: 'doctor',
      type: 'relationship',
      relationTo: 'doctor-profiles',
      required: true,
    },
    { name: 'startsAt', type: 'date', required: true },
    { name: 'endsAt', type: 'date', required: true },
    { name: 'reason', type: 'textarea', required: true, maxLength: 500 },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'scheduled',
      options: [
        { label: 'Programada', value: 'scheduled' },
        { label: 'Confirmada', value: 'confirmed' },
        { label: 'Completada', value: 'completed' },
        { label: 'Cancelada', value: 'cancelled' },
        { label: 'No asistió', value: 'no-show' },
      ],
    },
    { name: 'patientNotes', type: 'textarea', maxLength: 500 },
    {
      name: 'clinicalNotes',
      type: 'textarea',
      maxLength: 2000,
      access: {
        read: ({ req }) => {
          if (isCMSAdmin(req) || isAppAdmin(req)) return true
          return getAppUser(req)?.role === 'doctor'
        },
        create: ({ req }) => {
          if (isCMSAdmin(req) || isAppAdmin(req)) return true
          return getAppUser(req)?.role === 'doctor'
        },
        update: ({ req }) => {
          if (isCMSAdmin(req) || isAppAdmin(req)) return true
          return getAppUser(req)?.role === 'doctor'
        },
      },
    },
  ],
  timestamps: true,
  versions: false,
}
