"use client"

import { useEffect, useRef, useState } from 'react'

export type NeuraVideoChapter = { time: number; label: string; detail: string }

export function neuraChapterAt(chapters: readonly NeuraVideoChapter[], time: number) {
  return chapters.reduce((active, chapter, index) => time >= chapter.time ? index : active, 0)
}

export function neuraTimestamp(time: number) {
  return `${String(Math.floor(time / 60)).padStart(2, '0')}:${String(Math.floor(time % 60)).padStart(2, '0')}`
}

export default function NeuraWalkthroughVideo({ label, poster, sources, chapters = [], captions, width, height }: {
  label: string;
  poster: string;
  sources: { src: string; type: string }[];
  chapters?: readonly NeuraVideoChapter[];
  captions?: string;
  width?: number;
  height?: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const pendingTime = useRef<number | null>(null)
  const [active, setActive] = useState(0)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    return () => { if (video && !video.paused) video.pause() }
  }, [])

  function seek(video: HTMLVideoElement, time: number) {
    video.currentTime = Number.isFinite(video.duration) ? Math.min(time, Math.max(0, video.duration - 0.05)) : time
  }

  function jumpTo(index: number) {
    const video = videoRef.current
    if (!video) return
    const time = chapters[index].time
    setActive(index)
    if (video.readyState >= 1) seek(video, time)
    else pendingTime.current = time
    void video.play().catch(() => undefined)
  }

  return <div className="neura-chaptered-video">
    <div className="neura-video-frame">
      {failed ? <div className="neura-video-fallback" role="group" aria-label={label}>
        <img src={poster} alt={`${label} preview`} width={width} height={height} />
        <p>This recording is currently unavailable. The prototype preview is shown above.</p>
      </div> : <video ref={videoRef} aria-label={label} controls playsInline preload="metadata" poster={poster} width={width} height={height}
        onLoadedMetadata={() => {
          if (videoRef.current && pendingTime.current !== null) {
            seek(videoRef.current, pendingTime.current)
            pendingTime.current = null
          }
        }}
        onTimeUpdate={event => {
          if (pendingTime.current === null) setActive(neuraChapterAt(chapters, event.currentTarget.currentTime))
        }}
        onError={() => setFailed(true)}>
        {sources.map(source => <source key={source.src} src={source.src} type={source.type} />)}
        {captions && <track kind="captions" src={captions} srcLang="en" label="English scene descriptions" />}
        Your browser does not support embedded video.
      </video>}
    </div>
    {chapters.length > 0 && <>
      <div className="neura-video-chapters" role="group" aria-label={`${label} chapters`}>
        {chapters.map((chapter, index) => <button key={chapter.time} type="button" aria-label={`Watch ${chapter.label} at ${neuraTimestamp(chapter.time)}`}
          aria-pressed={active === index} disabled={failed} onClick={() => jumpTo(index)}>
          <span>{neuraTimestamp(chapter.time)}</span><strong>{chapter.label}</strong>
        </button>)}
      </div>
      <p className="neura-video-current"><strong>{chapters[active].label}.</strong> {chapters[active].detail}</p>
    </>}
  </div>
}
