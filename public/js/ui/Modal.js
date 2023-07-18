/**
 * Класс Modal отвечает за
 * управление всплывающими окнами.
 * В первую очередь это открытие или
 * закрытие имеющихся окон
 * */
class Modal {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью Modal.registerEvents()
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(element) {
    if (!element) {
      throw new Error("Невалидное значение для Modal")
    }
    this.element = element
    this.registerEvents()
  }

  /**
   * При нажатии на элемент с data-dismiss="modal"
   * должен закрыть текущее окно
   * (с помощью метода Modal.onClose)
   * */
  registerEvents() {
    const elementBtns = this.element.getElementsByTagName("button")
    for (let button of elementBtns) {
      if (
        button.hasAttribute("data-dismiss") &&
        button.dataset.dismiss === "modal"
      ) {
        button.addEventListener("click", (ev) => {
          ev.preventDefault()
          this.onClose(button)
        })
      }
    }
  }

  /**
   * Срабатывает после нажатия на элементы, закрывающие окно.
   * Закрывает текущее окно (Modal.close())
   * */
  onClose(e) {
    e.onClick = this.close()
  }
  /**
   * Открывает окно: устанавливает CSS-свойство display
   * со значением «block»
   * */
  open() {
    this.element.style.display = "block"
  }
  /**
   * Закрывает окно: удаляет CSS-свойство display
   * */
  close() {
    this.element.removeAttribute("style")
  }
}
