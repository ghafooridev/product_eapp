import {
  ClerkProvider as CP
} from '@clerk/nextjs'
export default function ClerkProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <CP appearance={{
      elements: {
        headerTitle: {
          color: '#000'
        },
        formButtonPrimary: {
          fontSize: 14,
          textTransform: 'none',
          backgroundColor: '#000',
          '&:hover': {
            backgroundColor: '#49247A',
          },
        },
      },
    }}>
      {children}
    </CP>
  )
}