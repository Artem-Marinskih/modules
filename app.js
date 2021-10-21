const app = document.querySelector(".app");

pre = document.createElement("pre");
pre.classList.add("no-date", "fa");
pre.textContent = `Дата и время не выбраны `;
app.append(pre);

const noDate = document.querySelector(".no-date");

i = document.createElement("i");
i.classList.add("fa", "fa-pencil");
app.append(i);

function getMonth(dateResult) {
  const month = dateResult.getMonth();
  switch (month) {
    case 0:
      return "января";
    case 1:
      return "февраля";
    case 2:
      return "марта";
    case 3:
      return "апреля";
    case 4:
      return "мая";
    case 5:
      return "июня";
    case 6:
      return "июля";
    case 7:
      return "августа";
    case 8:
      return "сентября";
    case 9:
      return "октября";
    case 10:
      return "ноября";
    case 11:
      return "декабря";
    default:
      return "месяц";
  }
}

const pencil = document.querySelector(".fa-pencil");
pencil.addEventListener("click", () => {
  const myModal = new modal({
    target: document.querySelector(".fa-pencil"),
    props: {
      closable: true,
      closepos: "modal-closer-right",
      bgclose: true,
      content: `<input class='date' value = ${noDate.textContent}>`,
      heading: "Выберете дату и время",
      buttons: [
        { text: "OK", class: "ok", event: "ok" },
        { text: "Отмена", class: "cancel", event: "close" },
      ],
    },
  });

  myModal.$on("close", function () {
    myModal.$set({ visible: false });
  });
  myModal.$on("ok", function () {
    let date = datePicker.selectedDates[0];
    let modal = document.querySelector(".modal-inner");

    if (!date) {
      modal.classList.add("vibro");
      vanillaToast.show("Ошибка", { className: "error" });

      setTimeout(() => {
        modal.classList.remove("vibro");
      }, 1000);
      return;
    }

    const dateResult = new Date(date);
    noDate.textContent = `${dateResult.getDate()} ${getMonth(
      dateResult
    )} ${dateResult.getFullYear()} ${dateResult.getHours()}: ${dateResult.getMinutes()} `;
    myModal.$set({ visible: false });
  });

  datePicker = new flatpickr(".date", {
    allowInput: true,
    enableTime: true,
    mode: "single",
    minDate: "today",
    time_24hr: true,
    dateFormat: "d-m-Y H:i",
    locale: "ru",
  });
});
