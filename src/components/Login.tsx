import { signIn, signOut } from '@/lib/auth'

const styles = {
  badge: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    backgroundColor: '#1f2937',
    color: '#e2e8f0',
    border: '1px solid #4a5568',
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    fontSize: '0.875rem',
    cursor: 'pointer',
    transition: 'all 0.2s',
    maxWidth: 'fit-content',
  },
  image: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
  },
  name: {
    fontWeight: 500,
  },
}

const UserBadge = ({ session }: { session: unknown }) => {
  const { name, image } = session.user

  return (
    <div
      style={styles.badge}
      onClick={async () => {
        'use server'
        await signOut()
      }}
    >
      {image && (
        <img src={image} alt={`${name}'s profile`} style={styles.image} />
      )}
      <span style={styles.name}>{name}</span>
    </div>
  )
}

export const Login = async ({ session }: { session: unknown }) => {
  if (session?.user) {
    return <UserBadge session={session} />
  } else {
    return (
      <form
        action={async () => {
          'use server'
          await signIn('google')
        }}
      >
        <button
          style={{
            color: '#e2e8f0',
            border: '1px solid #4a5568',
            padding: '0.5rem 1rem',
            borderRadius: '0.375rem',
            fontSize: '0.875rem',
            cursor: 'pointer',
            transition: 'all 0.2s',
            ':hover': {
              backgroundColor: '#2d3748',
              borderColor: '#718096',
            },
          }}
          type="submit"
        >
          Login
        </button>
      </form>
    )
  }
}
