import { Header } from './sections/Header';
import { Hero } from './sections/Hero';
import { Features } from './sections/Features';
import { Screenshots } from './sections/Screenshots';
import { Ecosystem } from './sections/Ecosystem';
import { Install } from './sections/Install';
import { Footer } from './sections/Footer';

export function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <Screenshots />
        <Ecosystem />
        <Install />
      </main>
      <Footer />
    </>
  );
}
