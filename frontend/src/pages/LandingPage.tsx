import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Button from '../components/Button';
import { QrCode, History, BookOpen, ArrowRight } from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <NavBar />
      
      {/* Hero Section */}
      <section className="bg-white px-4 py-6 md:px-8 md:py-10">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="md:w-3/5">
              <h1 className="text-3xl md:text-4xl font-bold text-emot-primary mb-3">
                Turn Your Trash Into Treasure
              </h1>
              <p className="text-gray-700 mb-4 text-sm md:text-base">
                Berpartisipasi dengan sekolah bekerjasama! Kumpulkan, Berikan, dan Dapatkan reward sampahmu menjadi berkah bagi lingkungan sekitar!
              </p>
              <div className="flex space-x-3">
                <Link to="/register">
                  <Button variant="primary" className="px-6 py-2 text-sm">Daftar</Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" className="px-6 py-2 text-sm">Selengkapnya</Button>
                </Link>
              </div>
            </div>
            <div className="md:w-2/5 mt-4 md:mt-0">
              <img 
                src="/assets/images/trash-recycling.jpg" 
                alt="Recycling materials" 
                className="rounded-lg w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Divider */}
      <div className="border-b border-gray-200 mx-4 md:mx-8 my-2"></div>
      
      {/* Services Section */}
      <section className="px-4 py-8 md:px-8 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-xl md:text-2xl font-bold text-center text-emot-primary mb-6">
            Beberapa Layanan Kami
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <ServiceCard 
              icon={<QrCode size={20} />}
              title="Transaksi QR Code"
              description="Verifikasi transaksi sampah dengan mudah!"
            />
            <ServiceCard 
              icon={<History size={20} />}
              title="Riwayat Transparan"
              description="Lacak riwayat sampah dan poin anda!"
            />
            <ServiceCard 
              icon={<BookOpen size={20} />}
              title="Edukasi Lingkungan"
              description="Akses konten edukasi 3R dan pelestarian!"
            />
          </div>
        </div>
      </section>
      
      {/* How to Participate Section */}
      <section className="px-4 py-8 md:px-8">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-xl md:text-2xl font-bold text-center text-emot-primary mb-6">
            Bagaimana Cara Agar Anda<br />dapat Berpartisipasi
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <ParticipationCard 
              title="Kumpulkan sampah"
              description="Cari dan kumpulkan sampah sebanyak-banyaknya!"
            />
            <ParticipationCard 
              title="Setor ke Bank Sampah Sekolah"
              description="Berikan sampah ke pihak Sekolah"
            />
            <ParticipationCard 
              title="Dapatkan Hadiahnya dan tukarkan"
              description="Tukarkan sampah dengan point yang dapat ditukar dengan berbagai macam hadiah"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-emot-primary text-white px-4 py-4 md:px-8 md:py-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold">EMOT</h3>
              <p className="text-sm">Earn Money From Trash</p>
            </div>
            <div className="flex space-x-6">
              <Link to="/tentang" className="text-white hover:text-emot-light">
                Tentang
              </Link>
              <Link to="/layanan" className="text-white hover:text-emot-light">
                Layanan
              </Link>
              <Link to="/cara-kerja" className="text-white hover:text-emot-light">
                Cara Kerja
              </Link>
            </div>
          </div>
          <div className="mt-4 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} EMOT. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Service Card Component
interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center text-center h-full">
      <div className="mb-3 bg-emot-light w-12 h-12 rounded-full flex items-center justify-center text-emot-primary">
        {icon}
      </div>
      <h3 className="text-base font-semibold mb-1 text-emot-primary">{title}</h3>
      <p className="text-gray-600 text-xs">{description}</p>
      <div className="mt-auto pt-3">
        <div className="w-6 h-6 bg-emot-light rounded-full flex items-center justify-center text-emot-primary mx-auto">
          <ArrowRight size={12} />
        </div>
      </div>
    </div>
  );
};

// Participation Card Component
interface ParticipationCardProps {
  title: string;
  description: string;
}

const ParticipationCard: React.FC<ParticipationCardProps> = ({ title, description }) => {
  return (
    <div className="bg-emot-light p-4 rounded-lg text-center flex flex-col h-full border-t-4 border-emot-primary">
      <h3 className="text-base font-semibold mb-2 text-emot-primary">{title}</h3>
      <p className="text-gray-700 text-xs">{description}</p>
    </div>
  );
};

export default LandingPage;