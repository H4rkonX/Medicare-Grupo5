import 'dotenv/config'
import path from 'path'
import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { mcpPlugin } from '@payloadcms/plugin-mcp'
import { en as adminLanguage } from '@payloadcms/translations/languages/en'
import { fileURLToPath } from 'url'
import { Admins } from './collections/Admins'
import { Media } from './collections/Media'
import { Folders } from './collections/Folders'
import { Tags } from './collections/Tags'
import { Users } from './collections/Users'
import { Specialties } from './collections/Specialties'
import { DoctorProfiles } from './collections/DoctorProfiles'
import { Availability } from './collections/Availability'
import { Appointments } from './collections/Appointments'
import { AuditEvents } from './collections/AuditEvents'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || 'local-dev-secret-key-12345',
  db: sqliteAdapter({
    push: true,
    client: {
      url: process.env.DATABASE_URI || 'file:./local.db',
      authToken: process.env.DATABASE_AUTH_TOKEN,
    },
  }),
  admin: {
    user: Admins.slug,
    constrainWidth: true,
    dashboard: {
      widgets: [],
      defaultLayout: [
        { widgetSlug: 'activity', width: 'full' },
        { widgetSlug: 'collections', width: 'full' },
      ],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  i18n: {
    fallbackLanguage: 'en',
    supportedLanguages: { en: adminLanguage },
  },
  collections: [
    Admins,
    Media,
    Folders,
    Tags,
    Users,
    Specialties,
    DoctorProfiles,
    Availability,
    Appointments,
    AuditEvents,
  ],
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  localization: {
    locales: [{ code: 'en', label: 'English' }],
    fallback: true,
    defaultLocale: 'en',
  },
  plugins: [mcpPlugin({})],
})
