import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InstallButton from "@/components/InstallButton";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background safe-area-top">
      <Header />

      <main className="flex-1 px-5 py-8">
        <div className="article-body space-y-4">
          <p>
            <strong>a/d/u</strong> is a curated daily digest of the most important stories in architecture, design, and urbanism, available as a web app and on <a href="https://t.me/a_d_u_media" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Telegram</a>.
          </p>

          <p>
            Each day, our AI-powered editorial system scans dozens of publications 
            to bring you 7 essential reads. We prioritize critical discourse over 
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

          <h3 className="text-xl font-medium mt-8 mb-4">Install the App</h3>

          <p>
            Install a/d/u to your device for quick access and a native app experience:
          </p>

          <div className="py-4">
            <InstallButton />
          </div>

          <div className="divider my-8" />

          <p>
            For suggestions, corrections, or inquiries:
            <br />
            <a href="mailto:admin@adu.media" className="text-primary hover:underline">admin@adu.media</a>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;