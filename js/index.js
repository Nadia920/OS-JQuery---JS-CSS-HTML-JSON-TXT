let OSs;

$(document)
    .ajaxStart(function() {
        alert("Начало запроса");
    })
    .ajaxSend(function(event, jqxhr, settings) {
        alert("Запрос отправлен по адресу: "+settings.url);
    })
    .ajaxStop(function() {
        alert("Запросы завершены");
    })
    .ajaxError(function(event, jqxhr, settings) {
        alert("Ошибка");
    })
    .ajaxComplete(function(event, jqxhr, settings) {
        alert("Запрос завершен");
    })
    .ajaxSuccess(function(event, jqxhr, settings) {
        alert("С сервера получены данные: "+jqxhr.responseText);
    });


$(document).ready(function () {/*Функцию, которая запустится после того, как DOM полностью загрузился.*/
    function loadFile(filename) {
        if (document.getElementsByClassName("info")[0] != null)
            $(".info").remove();

        let divElement = document.createElement("div");
        divElement.className = "info";

        $(divElement).load(filename, function (responseText, statusTxt) {/*Загружает данные с сервера (html) и вставляет в указанный элемент.*/
            if (statusTxt == "success") {
                OSs = responseText.split('\n');/*Метод split() разбивает объект String на массив строк путём разделения строки указанной подстрокой.*/
                divElement.innerHTML = createList(OSs);/**/
                $(".bs").after(divElement);
            }
            if (statusTxt == "error")
                alert("Загрузка не удалась");
        });
    }

    $("#iPhone").click(function () {
        loadFile("../resource/iPhoneOS.txt");
    });

    $("#Android").click(function () {
        loadFile("../resource/AndroidOS.txt");
    });

    $("#Bada").click(function () {
        loadFile("../resource/BadaOS.txt");
    });

    $("#Symbian").click(function () {
        loadFile("../resource/SymbianOS.txt");
    });
});

$(document).on("click", "button#full_information", function () {

    let fileName = getFileName(OSs[0]);
    
    $.getJSON(fileName, function (responseText, status, xhr) {/*getJSON() позволяет загрузить закодированные в формате JSON данные с сервера, с помощью HTTP запроса методом GET. responsetext - ответ сервера */
        let Info = "";
        if (status == "error")
            alert("Не получилось считать");
        $.each(xhr.responseJSON, function (i, field) {
            Info += "Дата выхода: " + field.date + "</br>" +
            "Разработчики: " + field.developers+ "</br>" +
                "Семейство ОС: " + field.familyOs;
        });
        document.getElementsByClassName('OS_body')[0].innerHTML = Info;
    });
});

function createList(OS) {
    let htmlText = "<div class='OS_title'> " + OS[0] + "</div>";

    htmlText += "<div class='OS_body'>";
    for (let i = 1; i < OS.length; i++)
        htmlText +=  OS[i] + "<br/>";

    htmlText += "</div><button id='full_information'>Статистика</button>";

    return htmlText;
}

function getFileName(OSId) {
    let fileName = "";

    switch (OSId.trim()) {
        case "iPhone OS":
            fileName = "resource/iPhoneOS.json";
            break;
        case "Android OS":
            fileName = "resource/AndroidOS.json";
            break;
        case "Bada OS":
            fileName = "resource/BadaOS.json";
            break;
        case "Symbian OS":
            fileName = "resource/SymbianOS.json";
            break;
    }
    return fileName;
}
