/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element)
    this.renderAccountsList()
    this.element = element
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const modaAccList = this.element.querySelector("select.accounts-select")
    modaAccList.innerHTML = ""
    const data = User.current()
    Account.list(data, (err, response) => {
      if (response.success) {
        response.data.forEach((accObj) =>
          modaAccList.insertAdjacentHTML(
            "beforeend",
            `<option value="${accObj.id}">${accObj.name}</option>`
          )
        )
      }
    })
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      if (response.success) {
        let modalName
        switch (data.type) {
          case "expense":
            modalName = "newExpense"
            break
          case "income":
            modalName = "newIncome"
            break
        }
        document.forms[`new-${data.type}-form`].reset()
        App.getModal(modalName).close()
        App.update()
      }
    })
  }
}
