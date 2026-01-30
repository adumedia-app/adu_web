// src/pages/About.tsx
/**
 * About Page
 */

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
            <strong>a/d/u</strong> is a curated daily digest of the most
            important stories in architecture, design, and urbanism.
          </p>

          <p>
            Each day, our editorial system scans dozens of publications to bring you 5-7
            essential reads. We prioritize critical discourse over product
            announcements, long-form analysis over press releases.
          </p>

          <p>
            Our sources include ArchDaily, Dezeen, Places Journal, Architectural
            Record, The Guardian, Metropolis, and many others. We aim to
            represent global perspectives and emerging voices alongside
            established publications.
          </p>

          <p>
            Weekly editions appear each Monday with a broader selection of
            longer reads. Weekend editions on Tuesdays help you catch up on 
            what you might have missed.
          </p>

          <h3 className="text-xl font-medium mt-8 mb-4">Contact</h3>

          <p>
            For suggestions, corrections, or inquiries:
            <br />

              href="mailto:hello@adu.media"
              className="text-primary hover:underline"
            >
              hello@adu.media
            </a>
          </p>

          <h3 className="text-xl font-medium mt-8 mb-4">Follow</h3>

          <p>
            Get daily updates on Telegram:
            <br />

              href="https://t.me/adumedia"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              @adumedia
            </a>
          </p>

          <h3 className="text-xl font-medium mt-8 mb-4">Install</h3>

          <p>
            Add a/d/u to your home screen for the best reading experience. On
            iOS, tap the share button and select "Add to Home Screen." On
            Android, tap the menu and select "Install app."
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;