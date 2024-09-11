import GitButton from '@/components/GitButton'
import SignForm from '@/components/SignForm'

export default async function Signin() {
  return (
    <div className='overflow-hidden'>
      <SignForm />
      <GitButton />
    </div>
  )
}