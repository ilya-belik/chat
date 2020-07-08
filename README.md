[Демонстрация чата](https://ilya-belik.github.io/chat/dist/ "Демонстрация")
#### HTML:

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Page Title</title>
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	
	<link rel="stylesheet" href="css/chat.min.css">

</head>
<body>
	<!-- Кнопка открытия чата  -->
	<button onclick="chatModule.chat_actions()">Открыть чат</button>
	
	
	<!-- Окно чата  -->
	<div class="modal-chat modal-chat-js">
		<div class="chat-header">
			<div class="text-block">
				<h5 class="title">Введите сообщение</h5>
				<p class="subtitle">Оператор в сети</p>
			</div>
			<button class="close-chat close-chat-js"></button>
		</div>
		<div class="chat-body">
			<div class="messages-container"></div>
			<form class="send-message send-message-js">
				<div class="input-container">
					<input type="text" placeholder="Текст сообщения..." class="client-massage-text client-massage-text-js">
					<button class="send-message-btn send-message-btn-js" type="button"></button>
				</div>
			</form>
		</div>
	</div>
	
	<script src="js/chat.min.js"></script>

</body>
</html>

```


#### JavaScript

**Открытие/закрытие чата**
```javascript
 chatModule.chat_actions();
```

**Последнее сообщение в чате от юзера и оператора**

```javascript
// (type: object)
chatModule.lastMessage

// Return
lastMessage = {
	client: '',
	agent: ''
};
```



**Отправка сообщения юзером**

```javascript
chatModule.create_message({
	type: 'client',
	message: 'Lorem ipsum dolor sit amet',
});
```



**Отправка сообщения оператором**

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

**Общие настройки чата**
```javascript
chatModule.config_chat({
	// Подсказки для первого сообщения
	prompts: [
		'Здравствуйте!',
		'Как вам позвонить?',
		'Какой у вас сегодня график работы?'
	],

	// Что произойдет после отправки сообщения юзером?
	onSendClientMessage: function(){
		// ...
	},
});
```
