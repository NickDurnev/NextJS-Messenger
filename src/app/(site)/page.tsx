import Hero from '../components/Hero';
import UserMenu from '../components/UserMenu/UserMenu';

export default function Home() {
  return (
    <main className="relative bg-blue-950">
      <section className='w-full h-20 px-10 py-4 '>
        <UserMenu />
      </section>
      <Hero />
    </main>
  )
}
