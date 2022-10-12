import { Main } from "../components/Main";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

const AboutPage = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <Main>
        <p className='text-white'>Hello about page</p>
      </Main>
      <Footer />
    </div>
  );
};

export default AboutPage;
