import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background safe-area-top">
      <Header />

      <main className="flex-1 px-5 py-8">
        <h2 className="text-2xl font-medium mb-6">About</h2>

        <div className="article-body space-y-4">
          <p>
            <strong>ADUmedia</strong> is a curated daily digest of the most
            important stories in architecture, design, and urbanism.
          </p>

          <p>
            Each day, our AI-powered editorial system scans dozens of publications 
            to bring you 5-7 essential reads. We prioritize critical discourse over 
            product announcements, long-form analysis over press releases.
          </p>

          <p>
            Our sources include ArchDaily, Dezeen, Domus, Designboom, Architectural
            Record, The Architectural Review, and many others. We aim to
            represent global perspectives and emerging voices alongside
            established publications.
          </p>

          <p>
            Weekly editions appear each Monday with a broader selection of
            longer reads. Weekend catch-up editions on Tuesday cover anything
            you might have missed.
          </p>

          <h3 className="text-xl font-medium mt-8 mb-4">Contact</h3>

          <p>
            For suggestions, corrections, or inquiries:
            <br />
            <a
              href="mailto:hello@adu.media"
              className="text-primary hover:underline"
            >
              hello@adu.media
            </a>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
