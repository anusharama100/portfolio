"use client"

import type { SVGProps } from 'react'

type IconProps = Omit<SVGProps<SVGSVGElement>, 'direction'> & { size?: number; strokeWidth?: number }

function Arrow({ direction, size = 20, strokeWidth = 1.5, ...props }: IconProps & { direction: 'left' | 'right' | 'up-right' | 'down-right' }) {
  const path = {
    left: 'M19 12H5m7 7-7-7 7-7',
    right: 'M5 12h14m-7-7 7 7-7 7',
    'up-right': 'M5 19 19 5M7 5h12v12',
    'down-right': 'M5 5 19 19M19 7v12H7',
  }[direction]
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><path d={path} /></svg>
}

export const ArrowLeft = (props: IconProps) => <Arrow direction="left" {...props} />
export const ArrowRight = (props: IconProps) => <Arrow direction="right" {...props} />
export const ArrowUpRight = (props: IconProps) => <Arrow direction="up-right" {...props} />
export const ArrowDownRight = (props: IconProps) => <Arrow direction="down-right" {...props} />
