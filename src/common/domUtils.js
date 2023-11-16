class CustomDispatchEvent extends Event {
  constructor(type, params = {}) {
    super(type, { bubbles: true })
    Object.assign(this, params)
  }
}

export function createEvent(ClassOrType, arg) {
  return typeof ClassOrType === 'string'
    ? new CustomDispatchEvent(ClassOrType, arg)
    : new ClassOrType(arg)
}

export const createDispatcher = (EventClassOrType, argFn) => {
  return function eventDispatcher(event) {
    const arg = typeof argFn === 'function' ? argFn({ host: this, event }) : undefined
    const outEvent = createEvent(EventClassOrType, arg)
    event.stopPropagation()
    this.dispatchEvent(outEvent)
  }
}

export function createValueBinder(property) {
  return function valueBinder(e) {
    const propName = property ? property : e.target.dataset.property || e.target.name
    if (propName) {
      this[propName] = e.target.value
    }
  }
}

export const downloadText = (filename, text) => {
  const element = document.createElement('a')
  element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`)
  element.setAttribute('download', filename)

  element.style.display = 'none'
  element.classList.add('external')
  document.body.appendChild(element)

  element.click()

  document.body.removeChild(element)
}

export const downloadFile = (filename, url) => {
  const element = document.createElement('a')
  element.setAttribute('href', url)
  element.setAttribute('download', filename)

  element.style.display = 'none'
  element.classList.add('external')
  document.body.appendChild(element)

  element.click()

  document.body.removeChild(element)
}

const mimeTypeRegex = /[^:\s*]\w+\/[\w-+\d.]+(?=[;| ])/

export const getDataURLMimeType = (dataURL = '') => {
  return dataURL.match(mimeTypeRegex)[0] || ''
}

export const dataURLToBlob = (dataURL = '', mimeType = getDataURLMimeType(dataURL)) => {
  const byteCharacters = atob(dataURL.substr(`data:${mimeType};base64,`.length))
  const byteArrays = []

  for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
    const slice = byteCharacters.slice(offset, offset + 1024)

    const byteNumbers = new Array(slice.length)
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }

    const byteArray = new Uint8Array(byteNumbers)

    byteArrays.push(byteArray)
  }

  return new Blob(byteArrays, { type: mimeType })
}

export const dataURLToObjectURL = (dataURL = '', mimeType) => {
  const blob = dataURLToBlob(dataURL, mimeType)
  return URL.createObjectURL(blob)
}

export const dataURLToFile = (dataURL = '', fileName, mimeType = getDataURLMimeType(dataURL)) => {
  const blob = dataURLToBlob(dataURL, mimeType)
  return new File([blob], fileName, { type: mimeType })
}

export const openDataUrl = (dataURL, mimeType) => {
  const objectURL = dataURLToObjectURL(dataURL, mimeType)
  window.open(objectURL, '_blank')
}
