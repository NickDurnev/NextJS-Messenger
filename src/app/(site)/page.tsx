import dynamic from 'next/dynamic';
import UserMenu from "./components/UserMenu/UserMenu";

const Hero = dynamic(() => import('../components/Hero'), {
  loading: () => <p></p>,
})

export default function Home() {
  return (
    <main className="relative bg-blue-950">
      <div className="w-full flex justify-center">
        <div className="w-full sm:w-[70%] md:w-[50%] absolute top-20 z-10 sm:top-4 text-center">
          <h1 className="title">
            Be in touch with <span>Connectify</span>
          </h1>
        </div>
      </div>
      <section className="w-full h-20 px-10 py-4 ">
        <UserMenu />
      </section>
      <Hero />
    </main>
  );
}
