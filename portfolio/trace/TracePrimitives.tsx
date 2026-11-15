'use client'

import { useEffect, useRef, type ReactNode } from 'react'

const icons = {
  evidence: 'M5 4h14v16H5zM8 8h8M8 12h8M8 16h5',
  insights: 'M9 18h6M10 21h4M8 14a7 7 0 1 1 8 0c-1 1-1 2-1 2H9s0-1-1-2Z',
  decisions: 'm5 12 4 4 10-10M5 4H3v17h17v-2',
  overview: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z',
  search: 'M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm6-2 6 6',
  plus: 'M12 5v14M5 12h14',
  close: 'm6 6 12 12M18 6 6 18',
  export: 'M12 3v12m-4-4 4 4 4-4M4 15v6h16v-6',
  menu: 'M4 6h16M4 12h16M4 18h16',
  arrow: 'M4 12h16m-6-6 6 6-6 6',
  check: 'm5 12 4 4 10-10',
  list: 'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01',
  cards: 'M3 4h8v7H3zM15 4h6v7h-6zM3 15h8v6H3zM15 15h6v6h-6z',
} as const

export function Icon({ name }: { name: keyof typeof icons }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={icons[name]} />
    </svg>
  )
}

export function BrandMark() {
  return (
    <svg
      viewBox="0 0 28 28"
      width="28"
      height="28"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 6v9a7 7 0 0 0 7 7h9M6 6h15M14 6v9h8"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="6" cy="6" r="2.5" fill="currentColor" />
      <circle cx="14" cy="15" r="2.5" fill="currentColor" />
      <circle cx="22" cy="22" r="2.5" fill="currentColor" />
    </svg>
  )
}

export function Dialog({
  title,
  children,
  onClose,
  drawer = false,
}: {
  title: string
  children: ReactNode
  onClose: () => void
  drawer?: boolean
}) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const dialog = ref.current!
    dialog.showModal()
    dialog
      .querySelector<HTMLInputElement | HTMLTextAreaElement>(
        'input:not([type="checkbox"]):not([type="file"]), textarea',
      )
      ?.focus()
    return () => {
      if (dialog.open) dialog.close()
    }
  }, [])
  return (
    <dialog
      ref={ref}
      className={'trace-dialog' + (drawer ? ' trace-drawer' : '')}
      aria-label={title}
      onCancel={onClose}
    >
      <div className="trace-dialog-inner">
        <header>
          <div>
            <p className="trace-dialog-context">Trace / Research workspace</p>
            <h2>{title}</h2>
          </div>
          <button
            className="trace-icon-button"
            type="button"
            aria-label="Close dialog"
            onClick={onClose}
          >
            <Icon name="close" />
          </button>
        </header>
        {children}
      </div>
    </dialog>
  )
}

export function Pill({
  children,
  tone = '',
}: {
  children: ReactNode
  tone?: string
}) {
  return (
    <span className={'trace-pill ' + tone}>
      <span aria-hidden="true" />
      {children}
    </span>
  )
}

export function SourceButton({
  title,
  meta,
  onClick,
}: {
  title: string
  meta: string
  onClick: () => void
}) {
  return (
    <button className="trace-source-link" onClick={onClick}>
      <span>
        <small>{meta}</small>
        <strong>{title}</strong>
      </span>
      <Icon name="arrow" />
    </button>
  )
}

export function Empty({
  title,
  body,
  action,
  onAction,
}: {
  title: string
  body: string
  action: string
  onAction: () => void
}) {
  return (
    <div className="trace-empty">
      <Icon name="evidence" />
      <h2>{title}</h2>
      <p>{body}</p>
      <button className="trace-secondary" onClick={onAction}>
        {action}
      </button>
    </div>
  )
}

export function recordReference(
  kind: 'evidence' | 'insights' | 'decisions',
  id: string,
) {
  const numeric = id.match(/^[eid](\d+)$/)?.[1]
  return `${{ evidence: 'OBS', insights: 'INS', decisions: 'DEC' }[kind]}-${numeric ? numeric.padStart(2, '0') : id.slice(0, 6).toUpperCase()}`
}

export function recordDate(date: string) {
  return new Date(date).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  })
}
