"use client"

import { useEffect, useRef, useState } from "react";
import { ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight } from "./LandingIcons";
import { FlowingArtwork } from "./FlowingArtwork";
import { PortfolioHeader } from "./PortfolioHeader";
import { krokosDesignPreviews } from "./krokosDesignEvidence";
import { toniProjectPreviews } from "./toniProjectPreviews";
import { Link } from "@/portfolio/compat";

const ribbon = "/landing/editorial-flow.jpg";
const crusoeImage = "/landing/project-crusoe.png";
const crusoeImage2 = "/landing/project-crusoe-2.png";
const crusoeImage3 = "/landing/project-crusoe-3.png";
const nexusImage = "/landing/project-nexus.png";
const nexusImage2 = "/landing/project-nexus-2.png";
const nexusImage3 = "/landing/project-nexus-3.png";
const neuranoteImage = "/landing/project-neuranote.png";
const neuranoteImage2 = "/landing/project-neuranote-2.png";
const neuranoteImage3 = "/landing/project-neuranote-3.png";
const flowopsImage = "/landing/project-flowops.png";
const flowopsImage2 = "/landing/project-flowops-2.png";
const flowopsImage3 = "/landing/project-flowops-3.png";

const linkedin = "https://www.linkedin.com/in/anusha-ramachandran-45882724a";
const github = "https://github.com/anusharama100";
const projects = [
  {
    name: "Crusoe",
    title: "Making the complex cloud feel clear.",
    type: "Cloud infrastructure",
    description: "Three connected initiatives that made dense cloud workflows clearer, more actionable, and easier to trust.",
    tags: ["Interface systems", "Engineering collaboration"],
    path: "crusoe",
    images: [
      { src: crusoeImage, alt: "Crusoe cloud resource provisioning interface" },
      { src: crusoeImage2, alt: "Crusoe Kubernetes empty state interface" },
      { src: crusoeImage3, alt: "Crusoe cloud cost breakdown dashboard" },
    ],
  },
  {
    name: "Krokos Bio",
    title: "A warmer welcome to botanical science.",
    type: "Biotechnology website",
    description: "A responsive website that brings plant science into a clear digital story, from interaction prototypes to the published Squarespace build.",
    tags: ["Responsive web", "Scroll interactions"],
    path: "krokos",
    images: krokosDesignPreviews,
  },
  {
    name: "ToniPR",
    title: "One conversation. A world of content.",
    type: "Product interface prototype",
    description: "An HTML, CSS, and JavaScript frontend connecting onboarding, interview setup, and content review in one guided workflow.",
    tags: ["HTML / CSS / JavaScript", "Interactive prototype"],
    path: "tonipr",
    images: toniProjectPreviews,
  },
  {
    name: "Nexus",
    title: "Multiple models. One clear answer.",
    type: "AI learning experience",
    description: "Consensus-backed answers from multiple models for students who need clarity without the noise.",
    tags: ["Interaction systems", "Coded prototyping"],
    path: "nexus",
    images: [
      { src: nexusImage, alt: "Nexus multi-model answer interface" },
      { src: nexusImage2, alt: "Nexus research and comparison interface" },
      { src: nexusImage3, alt: "Nexus consensus-backed response interface" },
    ],
  },
  {
    name: "NeuraNote",
    title: "A little less noise. A lot more learning.",
    type: "Learning application prototype",
    description: "A React and TypeScript study prototype connecting note capture, concept maps, and review flows, with notes saved in the browser.",
    tags: ["React + TypeScript", "Stateful interfaces"],
    path: "neuranote",
    images: [
      { src: neuranoteImage, alt: "NeuraNote learning dashboard" },
      { src: neuranoteImage2, alt: "NeuraNote concept mapping interface" },
      { src: neuranoteImage3, alt: "NeuraNote review experience" },
    ],
  },
  {
    name: "FlowOps",
    title: "Bringing flow to everyday operations.",
    type: "Workflow application prototype",
    description: "An interactive Next.js prototype for creating, approving, and resolving requests, with role switching and a browser-side data store.",
    tags: ["Next.js + TypeScript", "Role-specific workflows"],
    path: "flowops",
    images: [
      { src: flowopsImage, alt: "FlowOps request management interface" },
      { src: flowopsImage2, alt: "FlowOps operational workflow interface" },
      { src: flowopsImage3, alt: "FlowOps request details interface" },
    ],
  },
  {
    name: "HABITat",
    title: "Small habits. A world worth growing.",
    type: "Mobile app concept",
    description: "A playful habit-building experience that turns small daily wins into a growing habitat, with rewards and shared goals that make consistency feel encouraging.",
    tags: ["Figma prototype", "Interaction design"],
    path: "habitat",
    images: [
      { src: "/habitat/habitat-hero.png", alt: "HABITat sign-in and habitat profile phone previews" },
      { src: "/habitat/home-screen.jpeg", alt: "HABITat home screen with habit progress and animal rewards" },
      { src: "/habitat/shared-habits.jpeg", alt: "HABITat shared habits and social accountability interface" },
    ],
  },
];

type Project = (typeof projects)[number];

function ProjectImageSlideshow({ project }: { project: Project }) {
  const [activeImage, setActiveImage] = useState(0);
  const currentImage = project.images[activeImage] ?? project.images[0]!;

  const previousImage = () => setActiveImage(current => (current - 1 + project.images.length) % project.images.length);
  const nextImage = () => setActiveImage(current => (current + 1) % project.images.length);

  return (
    <div
      className={`project-image-link project-card-slideshow${project.images.length > 5 ? " project-card-slideshow-expanded" : ""}`}
      aria-label={`${project.name} image slideshow`}
      data-reveal
    >
      <Link className="project-image-stage" href={`/case-study/${project.path}/`} aria-label={`View ${project.name} case study`}>
        <img
          key={`${project.path}-${activeImage}`}
          src={currentImage.src}
          alt={currentImage.alt}
          loading="lazy"
        />
      </Link>
      <div className="image-slideshow-controls" aria-label={`${project.name} slideshow controls`}>
        <button type="button" onClick={previousImage} aria-label={`Previous ${project.name} image`}><ArrowLeft size={15} strokeWidth={1.5} /></button>
        <div className="image-slideshow-dots">
          {project.images.map((image, index) => (
            <button
              className={index === activeImage ? "is-active" : ""}
              type="button"
              onClick={() => setActiveImage(index)}
              aria-label={`Show ${project.name} image ${index + 1}`}
              aria-current={index === activeImage ? "true" : undefined}
              key={image.src}
            />
          ))}
        </div>
        {project.images.length > 5 && <span className="image-slideshow-count" aria-label={`Image ${activeImage + 1} of ${project.images.length}`}>{activeImage + 1} / {project.images.length}</span>}
        <button type="button" onClick={nextImage} aria-label={`Next ${project.name} image`}><ArrowRight size={15} strokeWidth={1.5} /></button>
      </div>
    </div>
  );
}
export default function PortfolioLanding() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;
    const elements = page.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    elements.forEach(element => {
      element.classList.add("reveal-ready");
      observer.observe(element);
    });
    const images = page.querySelectorAll<HTMLElement>(".project-image-link");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      images.forEach(image => {
        const rect = image.getBoundingClientRect();
        const progress = Math.min(1, Math.max(0, (vh - rect.top) / (vh * 0.75)));
        image.style.setProperty("--zoom", reduce ? "1" : String(progress));
      });
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { observer.disconnect(); window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(frame); };
  }, []);

  return (
    <div className="landing-page" ref={pageRef}>
      <PortfolioHeader />
      <main>
        <section className="hero" aria-labelledby="intro-title">
          <img className="hero-art" src={ribbon} alt="" width={1920} height={1024} fetchPriority="high" />
          <FlowingArtwork src={ribbon} />
          <div className="hero-content site-container">
            <h1 id="intro-title"><span className="headline-line"><span>product designer + engineer.</span></span></h1>
            <p className="hero-description">I design and build interfaces,<br className="desktop-break" /> from first idea to working frontend.</p>
            <ul className="hero-stack" aria-label="Frontend tools"><li>React</li><li>TypeScript</li><li>Next.js</li><li>HTML + CSS</li></ul>
            <div className="hero-actions">
              <a className="hero-cta" href="#projects"><span className="circle-arrow"><ArrowDownRight size={34} strokeWidth={1} /></span><span>view selected work</span></a>
              <a className="hero-code-link" href={github} target="_blank" rel="noreferrer" aria-label="View GitHub repositories">view GitHub <ArrowUpRight size={18} strokeWidth={1.5} /></a>
            </div>
          </div>
        </section>
        <section className="work-section site-container" id="projects" aria-labelledby="work-title">
          <div className="section-heading" data-reveal><h2 id="work-title">Selected work</h2><span>interfaces, interactions & code</span></div>
          <div className="projects-list">
            {projects.map((project, index) => (
              <article className={`project-row ${index % 2 === 1 ? "reverse" : ""}`} key={project.path}>
                <ProjectImageSlideshow project={project} />
                <div className="project-info" data-reveal>
                  <div className="project-topline"><span className="project-number">0{index + 1} / {project.name}</span><span className="project-type">{project.type}</span></div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
                  <Link className="case-link" href={`/case-study/${project.path}/`}>View case study <ArrowUpRight size={16} strokeWidth={1.5} /></Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <footer className="contact-section" id="contact">
        <div className="site-container">
          <div className="contact-top" data-reveal><div><span className="eyebrow">Good things start with a conversation</span><h2>Let’s make something<br /><em>meaningful.</em></h2><a className="text-sm" href="mailto:anusharama100@gmail.com">anusharama100@gmail.com</a></div><a href="mailto:anusharama100@gmail.com" aria-label="Email Anusha"><span className="circle-arrow"><ArrowUpRight size={30} strokeWidth={1} /></span></a></div>
          <div className="footer-bottom"><span>© {new Date().getUTCFullYear()} <span className="person-name">Anusha Ramachandran</span></span><div className="footer-links"><a href={github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight className="inline size-3" /></a><a href={linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight className="inline size-3" /></a><a href="/Anusha_Ramachandran_Resume.pdf" target="_blank" rel="noreferrer">Résumé <ArrowUpRight className="inline size-3" /></a><a href="#">Back to top ↑</a></div></div>
        </div>
      </footer>
    </div>
  );
}
