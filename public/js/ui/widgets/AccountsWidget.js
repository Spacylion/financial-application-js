/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */

class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(element) {
    if (!element) {
      throw new Error("Невалидное значение для AccountsWidget")
    }
    this.element = element
    this.registerEvents()
    this.update()
  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
    const addNewAccBtn = document.querySelector(".accounts-panel")
    addNewAccBtn.addEventListener("click", (ev) => {
      ev.preventDefault()
      if (ev.target.closest("span.create-account")) {
        App.getModal("createAccount").open()
      }
      if (ev.target.closest("li.account")) {
        this.onSelectAccount(ev.target.closest("li.account"))
      }
    })
  }

  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {
    const data = User.current()
    if (data) {
      Account.list(data, (err, response) => {
        if (response.success) {
          this.clear()
          this.renderItem(response.data)
        }
      })
    }
  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    const accountList = document.querySelectorAll(
      "ul.accounts-panel > li.account"
    )
    accountList.forEach((account) => account.remove())
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount(element) {
    const selectedAcc = document.querySelector("li.active")
    if (selectedAcc) {
      selectedAcc.classList.remove("active")
    }
    element.classList.add("active")
    App.showPage("transactions", {
      account_id: element.dataset.id,
    })
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML(item) {
    return `<li class="account" data-id="${item.id}">
        <a href="#">
            <span>${item.name}</span> 
            <span>${item.sum} ₽</span>
        </a>
      </li>`
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem(data) {
    const accountListMenu = document.querySelector(".accounts-panel")
    data.forEach((item) =>
      accountListMenu.insertAdjacentHTML("beforeend", this.getAccountHTML(item))
    )
  }
}
