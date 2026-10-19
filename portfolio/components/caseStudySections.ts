export type StudySection = { id: string; title: string; element: HTMLElement }

const cleanLabel = (text: string) => text.replace(/^(?:Design\s+)?\d+\s*[·./]\s*/i, '').replace(/\s+/g, ' ').trim()

/** Only offer destinations that belong to the story currently on screen. */
export function collectStudySections(root: HTMLElement, slug: string): StudySection[] {
  return [...root.querySelectorAll<HTMLElement>('.legacy-case-section, .crusoe-case-section, .crusoe-project-panel .crusoe-clean-section')]
    .filter(section => !section.closest('details:not([open]), [hidden]'))
    .flatMap((element, index) => {
      const label = element.matches('.crusoe-project-panel')
        ? 'Project overview'
        : element.dataset['studyTitle']
          ?? element.querySelector(':scope > .crusoe-clean-heading > span, :scope > .legacy-section-title, :scope > .crusoe-section-label strong')?.textContent
          ?? element.querySelector('.legacy-section-title, h2')?.textContent
      if (!label) return []
      const title = cleanLabel(label)
        .replace(/^V1$/i, 'V1: first release')
        .replace(/^V2$/i, 'V2: next iteration')
      if (!element.id) {
        const heading = element.getAttribute('aria-labelledby')
        element.id = heading ? `${heading}-section` : `chapter-${slug}-${index + 1}`
      }
      return [{ id: element.id, title, element }]
    })
}
