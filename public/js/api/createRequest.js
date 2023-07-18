/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  if (options) {
    const xhr = new XMLHttpRequest()
    let formData = new FormData()
    let sendURL = options.url
    if (options.method !== "GET") {
      Object.entries(options.data).forEach(([key, value]) =>
        formData.append(key, value)
      )
    } else {
      formData = ""
      if (!sendURL.includes("/account")) {
        sendURL += "?"
        Object.entries(options.data).forEach(
          ([key, value]) => (sendURL += `${key}=${value}&`)
        )
        sendURL = sendURL.slice(0, -1)
      }
    }
    try {
      xhr.open(options.method, sendURL)
      xhr.send(formData)
    } catch (err) {
      options.callback(err, null)
    }
    xhr.responseType = "json"
    xhr.addEventListener("readystatechange", function () {
      if (xhr.status === 200 && xhr.readyState === xhr.DONE) {
        options.callback(null, xhr.response)
      }
    })
  }
}
