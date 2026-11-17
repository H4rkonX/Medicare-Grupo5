'use server'

import config from '@payload-config'
import { getPayload } from 'payload'
import { appAuth } from '@/lib/app-auth'

export type ActionState = {
  ok: boolean
  message: string
}

const cleanText = (value: FormDataEntryValue | null, max: number) =>
  typeof value === 'string' ? value.trim().slice(0, max) : ''

const validEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
const strongPassword = (password: string) =>
  password.length >= 8 && /[a-z]/.test(password) && /[A-Z]/.test(password) && /\d/.test(password)

export async function loginAction(
  _previous: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const email = cleanText(formData.get('email'), 160).toLowerCase()
  const password = cleanText(formData.get('password'), 128)
  if (!validEmail(email) || !password) return { ok: false, message: 'Revisa tus credenciales.' }

  try {
    const user = await appAuth.login(email, password)
    if (!user) return { ok: false, message: 'No se pudo iniciar la sesión.' }
    if (user.status === 'suspended') {
      await appAuth.logout()
      return { ok: false, message: 'Tu cuenta está suspendida. Contacta al centro médico.' }
    }
    return { ok: true, message: 'Sesión iniciada.' }
  } catch {
    return { ok: false, message: 'Correo o contraseña incorrectos.' }
  }
}

export async function registerAction(
  _previous: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const name = cleanText(formData.get('name'), 100)
  const email = cleanText(formData.get('email'), 160).toLowerCase()
  const phone = cleanText(formData.get('phone'), 24)
  const password = cleanText(formData.get('password'), 128)

  if (name.length < 3) return { ok: false, message: 'Ingresa tu nombre completo.' }
  if (!validEmail(email)) return { ok: false, message: 'Ingresa un correo válido.' }
  if (!strongPassword(password)) {
    return { ok: false, message: 'Usa 8 caracteres, mayúscula, minúscula y número.' }
  }

  try {
    const payload = await getPayload({ config })
    await payload.create({
      collection: 'users',
      overrideAccess: false,
      draft: false,
      data: { name, email, phone, password, role: 'patient', status: 'active' },
    })
    await appAuth.login(email, password)
    return { ok: true, message: 'Cuenta creada correctamente.' }
  } catch {
    return { ok: false, message: 'No pudimos crear la cuenta. El correo puede estar registrado.' }
  }
}

export async function logoutAction() {
  await appAuth.logout()
}

export async function createAppointmentAction(
  _previous: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const user = await appAuth.currentUser()
  if (!user || user.role !== 'patient') return { ok: false, message: 'Inicia sesión como paciente.' }

  const doctor = cleanText(formData.get('doctor'), 80)
  const date = cleanText(formData.get('date'), 10)
  const time = cleanText(formData.get('time'), 5)
  const reason = cleanText(formData.get('reason'), 500)
  const startsAt = new Date(`${date}T${time}:00`)

  if (!doctor || !date || !time || reason.length < 5 || Number.isNaN(startsAt.getTime())) {
    return { ok: false, message: 'Completa todos los datos de la cita.' }
  }

  try {
    const payload = await getPayload({ config })
    const profile = await payload.findByID({
      collection: 'doctor-profiles',
      id: doctor,
      user,
      overrideAccess: false,
    })
    const endsAt = new Date(startsAt.getTime() + (profile.consultationMinutes ?? 30) * 60_000)
    await payload.create({
      collection: 'appointments',
      user,
      overrideAccess: false,
      draft: false,
      data: {
        reference: `MC-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
        patient: user.id,
        doctor: profile.id,
        startsAt: startsAt.toISOString(),
        endsAt: endsAt.toISOString(),
        reason,
        status: 'scheduled',
      },
    })
    return { ok: true, message: 'Tu cita fue reservada.' }
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : 'No se pudo reservar la cita.',
    }
  }
}

export async function cancelAppointmentAction(id: string): Promise<ActionState> {
  const user = await appAuth.currentUser()
  if (!user || user.role !== 'patient') return { ok: false, message: 'No autorizado.' }

  try {
    const payload = await getPayload({ config })
    await payload.update({
      collection: 'appointments',
      id,
      user,
      overrideAccess: false,
      data: { status: 'cancelled' },
    })
    return { ok: true, message: 'Cita cancelada.' }
  } catch {
    return { ok: false, message: 'No se pudo cancelar la cita.' }
  }
}
