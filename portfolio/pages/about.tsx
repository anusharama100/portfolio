"use client"

import { ArrowUpRight } from '@/portfolio/components/LandingIcons';
import { PortfolioHeader } from '@/portfolio/components/PortfolioHeader';

const firstPhotos = [
  { src: "/about-grad.jpg", alt: "Anusha celebrating her UC Davis graduation" },
  { src: "/about-nature.jpg", alt: "Swings surrounded by greenery" },
  { src: "/about-sunset.jpg", alt: "Sunset over the harbor" },
];

const secondPhotos = [
  { src: "/about-friends-grad-1.jpg", alt: "Anusha celebrating graduation with friends" },
  { src: "/about-matcha.jpg", alt: "Matcha drinks around a table" },
  { src: "/about-food.jpg", alt: "Dinner shared around a table" },
];

function PhotoBoard({ photos, label }: { photos: typeof firstPhotos; label: string }) {
  return (
    <div className="about-photo-board" role="group" aria-label={label}>
      {photos.map((photo, index) => (
        <figure className={`about-polaroid about-polaroid-${index + 1}`} key={photo.src}>
          <img src={photo.src} alt={photo.alt} width={600} height={800} loading="lazy" />
        </figure>
      ))}
    </div>
  );
}
export default function AboutPage() {
  return (
    <div className="landing-page about-page">
      <PortfolioHeader active="about" />
      <main className="about-main">
        <div className="about-intro site-container">
          <h1>a little about me</h1>
          <p>I’m <span className="person-name">Anusha</span>, a visual and product designer drawn to clear systems, playful details, and the small choices that make digital products feel human.</p>
        </div>

        <section className="about-stories site-container" aria-label="More about Anusha">
          <div className="about-story-row">
            <PhotoBoard photos={firstPhotos} label="Graduation, nature, and travel photos" />
            <div className="about-story-copy">
              <span className="about-story-index">01 / what drives me</span>
              <h2>making complexity feel <em>clear.</em></h2>
              <p>My work lives around AI, complex workflows, and the tiny interaction choices that make a product feel trustworthy.</p>
              <p>I bring research, visual design, prototypes, and storytelling together to make useful things feel easy to use without making them boring.</p>
            </div>
          </div>

          <div className="about-story-row about-story-row-reverse">
            <PhotoBoard photos={secondPhotos} label="Friends, matcha, and food photos" />
            <div className="about-story-copy">
              <span className="about-story-index">02 / beyond the screen</span>
              <h2>little moments, big <em>perspective.</em></h2>
              <p>Friends, good food, a matcha run, or time outdoors. The moments away from my desk keep me curious and give me fresh ways to look at the work.</p>
            </div>
          </div>
        </section>

        <div className="about-next site-container">
          <p>have something in mind?</p>
          <a href="mailto:anusharama100@gmail.com">let’s make it happen <ArrowUpRight size={25} strokeWidth={1.5} /></a>
          <div className="about-next-links"><a href="/#projects">view selected work</a><a href="/Anusha_Ramachandran_Resume.pdf" target="_blank" rel="noreferrer">view résumé <ArrowUpRight size={14} /></a></div>
        </div>
      </main>
    </div>
  );
}
