import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

const Base = ({ children, ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    {children}
  </svg>
)

export const CalendarIcon = (props: IconProps) => (
  <Base {...props}><path d="M7 3v3M17 3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v14H4V6a1 1 0 0 1 1-1Z" /><path d="m8 14 2 2 5-5" /></Base>
)
export const SearchIcon = (props: IconProps) => (
  <Base {...props}><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4" /></Base>
)
export const ShieldIcon = (props: IconProps) => (
  <Base {...props}><path d="M12 3 5 6v5c0 4.5 2.7 8.1 7 10 4.3-1.9 7-5.5 7-10V6l-7-3Z" /><path d="m9 12 2 2 4-5" /></Base>
)
export const HeartIcon = (props: IconProps) => (
  <Base {...props}><path d="M20.8 8.8c0 5.2-8.8 10.2-8.8 10.2S3.2 14 3.2 8.8A4.6 4.6 0 0 1 12 6.9a4.6 4.6 0 0 1 8.8 1.9Z" /></Base>
)
export const ClockIcon = (props: IconProps) => (
  <Base {...props}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Base>
)
export const UsersIcon = (props: IconProps) => (
  <Base {...props}><circle cx="9" cy="9" r="3" /><path d="M3.5 20c.5-4 2.3-6 5.5-6s5 2 5.5 6M16 5.5a3 3 0 0 1 0 6M16.5 14c2.5.4 3.7 2.4 4 5" /></Base>
)
export const ArrowIcon = (props: IconProps) => (
  <Base {...props}><path d="M5 12h14M14 7l5 5-5 5" /></Base>
)
export const StethoscopeIcon = (props: IconProps) => (
  <Base {...props}><path d="M5 3v6a5 5 0 0 0 10 0V3M3 3h4M13 3h4M10 14v1a5 5 0 0 0 10 0v-2" /><circle cx="20" cy="11" r="2" /></Base>
)
export const LockIcon = (props: IconProps) => (
  <Base {...props}><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></Base>
)
export const HomeIcon = (props: IconProps) => (
  <Base {...props}><path d="m3 11 9-8 9 8M5 10v10h14V10M9 20v-6h6v6" /></Base>
)
