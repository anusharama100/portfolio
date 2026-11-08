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
          <p>I’m <span className="person-name">Anusha</span>, a product designer and engineer bringing product thinking and frontend development together to make complex tools easier to use.</p>
        </div>

        <section className="about-stories site-container" aria-label="More about Anusha">
          <div className="about-story-row">
            <PhotoBoard photos={firstPhotos} label="Graduation, nature, and travel photos" />
            <div className="about-story-copy">
              <span className="about-story-index">01 / what drives me</span>
              <h2>from an idea to an <em>interface.</em></h2>
              <p>I move between research, interaction design, and implementation. I use React, TypeScript, Next.js, and HTML/CSS to turn workflows into interfaces people can try.</p>
              <p>I care about the details that show up in use: responsive layouts, clear loading and error states, accessible controls, and motion that supports the task.</p>
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
          <div className="about-next-links"><a href="/#projects">view selected work</a><a href="https://github.com/anusharama100" target="_blank" rel="noreferrer">explore my code <ArrowUpRight size={14} /></a><a href="/Anusha_Ramachandran_Resume.pdf" target="_blank" rel="noreferrer">view résumé <ArrowUpRight size={14} /></a></div>
        </div>
      </main>
    </div>
  );
}
