import { ArrowUpRight } from './LandingIcons'

const linkedin = 'https://www.linkedin.com/in/anusha-ramachandran-45882724a'

export function PortfolioHeader({ active = 'work' }: { active?: 'work' | 'about' }) {
  return (
    <header className="site-header site-container">
      <a className="wordmark" href="/" aria-label="Anusha Ramachandran, home">
        <img className="monogram" src="/landing/ar-logo-final.png" alt="AR monogram" width={1024} height={1024} />
        <span className="wordmark-name">Anusha Ramachandran<small>product designer + engineer</small></span>
      </a>
      <nav className="site-nav" aria-label="Main navigation">
        <a href="/#projects" className={active === 'work' ? 'nav-active' : undefined} aria-current={active === 'work' ? 'page' : undefined}>work</a>
        <a href="/about/" className={active === 'about' ? 'nav-active' : undefined} aria-current={active === 'about' ? 'page' : undefined}>about</a>
        <a className="desktop-nav" href="/Anusha_Ramachandran_Resume.pdf" target="_blank" rel="noreferrer">résumé <ArrowUpRight className="inline size-4" /></a>
        <a className="desktop-nav linkedin-link" href={linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile">
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M20.447 2H3.553A1.553 1.553 0 0 0 2 3.553v16.894C2 21.305 2.695 22 3.553 22h16.894c.858 0 1.553-.695 1.553-1.553V3.553C22 2.695 21.305 2 20.447 2ZM7.94 18.74H4.977V9.197H7.94v9.543ZM6.459 7.895a1.716 1.716 0 1 1 0-3.432 1.716 1.716 0 0 1 0 3.432Zm12.281 10.845h-2.958v-4.643c0-1.106-.02-2.531-1.542-2.531-1.542 0-1.78.957-1.78 1.87v4.845h-2.958V9.197h2.84v1.303h.04c.395-.747 1.361-1.542 2.8-1.542 2.994 0 3.548 1.97 3.548 4.532v5.25Z" /></svg>
        </a>
      </nav>
    </header>
  )
}
