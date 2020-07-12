# Модуль чата (Front-End)

<a href="https://ilya-belik.github.io/chat/dist/ " target="_blank">Демонстрация чата</a>

#

### Установка чата:


#### HTML:

##### Стили и скрипты
```html
<!-- Необходимо добавить css чата в head  -->
<link rel="stylesheet" href="css/chat.min.css">

<!-- Необходимо добавить JavaScript чата перед закрывающим body  -->
<script src="js/chat.min.js"></script>
```
<br>

##### HTML чата
```html	
<!-- Окно чата  -->
<div class="modal-chat modal-chat-js">
	<div class="chat-header">

		<!--Заголовок чата-->
		<div class="text-block">
			<h5 class="title">Введите сообщение</h5>
			<p class="subtitle">Оператор в сети</p>
		</div>
		
		<!--Кнопка закрытия чата-->
		<button class="close-chat close-chat-js"></button>
	</div>
	<div class="chat-body">
	
		<div class="messages-container"></div>
		
		<!--Форма отправки сообщения-->
		<form class="send-message send-message-js">
			<div class="input-container">
				<input type="text" placeholder="Текст сообщения..." class="client-massage-text client-massage-text-js">
				<button class="send-message-btn send-message-btn-js" type="button"></button>
			</div>
		</form>
	</div>
</div>
```


#### JavaScript

##### Открытие/закрытие чата
```javascript
// Функция открытия/закрытия чата
chatModule.chat_actions()
```
```html
<!-- Пример в html  -->
<button onclick="chatModule.chat_actions()">Открыть чат</button>
```
<br>


#####  История сообщений

```javascript

// Полная история сообщений
chatModule.chatHistory
// Возвращает array следующего типа:
[
	{
		type: "client", // отправитель, им может быть agent или client
		date: "2020-12-6 11:4:13",  // дата и время отправки (гггг-дд-мм чч:мм:сс) 
		messageText: 'Текст сообщения'
	}
]
// Последнее сообщение в чате от юзера и оператора
chatModule.lastMessage

// Возвращает obj следующего типа: 
lastMessage = {
	client: 'Сообщение клиента',
	agent: 'Сообщение оператора'
};
```

<br>

#####  Отправить сообщение от юзера

```javascript
chatModule.create_message({
	type: 'client',
	message: 'Lorem ipsum dolor sit amet',
});
```

<br>

#####  Отправить сообщение от оператора

```javascript
chatModule.create_message({
	type: 'agent',
	message: 'Lorem ipsum dolor sit amet',
	sender: {
		avatar: 'img/sender.jpg',
		name: 'Alex',
	}
});
```
<br>

##### Настройки чата
```javascript
chatModule.globalConfig.changeРroperties({
	// Звук нового сообщения (по умолчанию false)
	audio: true,

	// Что произойдет после отправки сообщения юзером?
	onSendClientMessage: function(){
		// Ваш код...	
	},

	// Подсказки для первого сообщения
	prompts: [
		'Здравствуйте!',
		'Как вам позвонить?',
		'Какой у вас сегодня график работы?',
		// ...
	],
});
```
