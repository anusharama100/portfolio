import { validateWorkspace, type Workspace } from './domain'
const DB_NAME = 'trace-research-workspace'
let connection: Promise<IDBDatabase> | undefined
function open(): Promise<IDBDatabase> {
  if (!connection) connection = new Promise((resolve, reject) => {
    if (!('indexedDB' in window)) { reject(new Error('This browser does not provide local workspace storage.')); return }
    const request = indexedDB.open(DB_NAME, 1)
    request.onupgradeneeded = () => request.result.createObjectStore('workspace')
    request.onsuccess = () => {
      const db = request.result
      db.onversionchange = () => { db.close(); connection = undefined }
      resolve(db)
    }
    request.onerror = () => { connection = undefined; reject(request.error || new Error('Local storage could not be opened.')) }
    request.onblocked = () => reject(new Error('Close other Trace tabs, then retry saving.'))
  })
  return connection
}
export async function loadWorkspace(): Promise<Workspace | null> {
  const db = await open()
  return new Promise((resolve, reject) => {
    const tx = db.transaction('workspace', 'readonly')
    const req = tx.objectStore('workspace').get('current')
    req.onsuccess = () => { try { resolve(req.result ? validateWorkspace(req.result) : null) } catch (error) { reject(error) } }
    req.onerror = () => reject(req.error)
  })
}
export async function saveWorkspace(workspace: Workspace): Promise<void> {
  const db = await open()
  return new Promise((resolve, reject) => {
    const tx = db.transaction('workspace', 'readwrite')
    tx.objectStore('workspace').put(validateWorkspace(workspace), 'current')
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error || new Error('The workspace could not be saved.'))
    tx.onabort = () => reject(tx.error || new Error('Saving was interrupted.'))
  })
}
export function download(name: string, contents: string, type = 'application/json') {
  const url = URL.createObjectURL(new Blob([contents], { type }))
  const a = document.createElement('a')
  a.href = url; a.download = name; a.click()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
export function evidenceCsv(w: Workspace, studyId: string): string {
  const cell = (s: string) => '"' + (/^[=+@\-\t\r]/.test(s) ? "'" + s : s).replace(/"/g, '""') + '"'
  return [['Title', 'Observation', 'Source', 'Tags'], ...w.evidence.filter(e => e.studyId === studyId).map(e => [e.title, e.body, e.source, e.tags.join('; ')])].map(row => row.map(cell).join(',')).join('\r\n')
}
