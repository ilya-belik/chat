const chatModule = (function () {

	let sendBtn 			 = document.querySelector('.send-message-btn-js'),
		 sendMessageForm 	 = document.querySelector('.send-message-js');
		 closeChat			 = document.querySelector('.close-chat-js'),
		 messageInput		 = document.querySelector('.client-massage-text-js'),
		 messagesContainer = document.querySelector('.messages-container'),
		 modalChat 			 = document.querySelector('.modal-chat-js'),

		 zoomChatBtn 		 = document.querySelector('.zoom-chat-js'),
		 chatHistory		 = [],
		 lastMessage = {
		 	client: '',
		 	agent: ''
		 };
 
	class Global_Chat_Config{
		constructor(options){
			this.audio = options.audio;
			this.onSendClientMessage = options.onSendClientMessage;
			this.messages = options.messages;
		}

		changeРroperties(data){
			if (data) {
				for(let key in data){
					switch (key){
						case 'audio':
							this.audio = data[key]
						break;
						case 'onSendClientMessage':
							this.onSendClientMessage = data[key]
						break;
						case 'prompts':
							this.prompts_gen(data[key]);
						break;
					}
				}
			}
		}

		prompts_gen(arr){
			let prompts = document.createElement('div');
			    prompts.classList.add('message-prompts', 'message-prompts-js', 'active');

					

			for(let i = 0; i < arr.length; i++){
				let promtBtn = document.createElement('button');
				promtBtn.classList.add('prompt', 'prompts-js');

				promtBtn.innerHTML = arr[i];

				prompts.appendChild(promtBtn);
			}

			messagesContainer.appendChild(prompts);
		}
	}	

	let globalConfig = new Global_Chat_Config({
		audio: false,
		onSendClientMessage: false,
	});


	// Открыть/закрыть чат 
	function chat_actions(){
		modalChat.classList.toggle('active');
	}


	// Увеличение чата
	function zoom_chat(){
		modalChat.classList.toggle('zoom-in');
		zoomChatBtn.classList.toggle('active');
	}

	// Рендер сообщения в чате
	function render_html(message){

		// Если есть подсказки - убрать
		let prompts = document.querySelector('.message-prompts-js');
		if (prompts && prompts.classList.contains('active'))
			prompts.classList.remove('active');


		// Рендер
		messagesContainer.appendChild(message);
		messagesContainer.scrollTop = messagesContainer.scrollHeight;
		reset_form();
	}




	/*
		Аргументы 
		create_message({
			type: 'client',
			message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis illum tempora earum pariatur, reprehenderit quibu',
		});

		create_message({
			type: 'agent',
			message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis illum tempora earum pariatur, reprehenderit quibu',
			sender: {
				avatar: 'sender.jpg',
				name: 'Alex',
			}
		});
	*/


	// Содание сообщения 
	function create_message(data){
		let message 			= document.createElement('div');


		message.classList.add('message');

		message_to_history(data);

		// Если сообщение пустое
		if (!data.message.length) return false;

		// If the client sent a message
		if (data.type === 'client') {



			message.classList.add('client');
			message.innerHTML = `<div class="text-container">
											<p class="message-text">${data.message}</p>
										</div>`;

			lastMessage.client = data.message;


			// Выполнение функции после отправки сообщения
			if (globalConfig.onSendClientMessage){
				globalConfig.onSendClientMessage();
			} 

		}

		// If the operator sent a message
		else if(data.type == 'agent'){
			message.classList.add('agent');

			// message.innerHTML = `<img src="${data.sender.avatar}" alt="sender avatar" class="avatar">
			// 							<div class="text-container">
			// 								<p class="sender-name">${data.sender.name}</p>
			// 								<p class="message-text">${data.message}</p>
			// 							</div>`;

			message.innerHTML = `<figure class="avatar" style="background-image: url('${data.sender.avatar}')"></figure>
										<div class="text-container">
											<p class="sender-name">${data.sender.name}</p>
											<p class="message-text">${data.message}</p>
										</div>`;
			
			lastMessage.agent = data.message;

			if (globalConfig.audio) {
				new_message_sound();
			}
		}


		// Drawing a message in the DOM
		render_html(message);
	}


	// Звук входящего сообщения
	function new_message_sound(){
		let audio = new Audio();
  		audio.src = 'audio/chatModule-newMessage.mp3'; 
  		audio.autoplay = true;
	}

	// Запись сообщения в историю 
	function message_to_history(messageInfo){
		let todayDate = function(){
								let date = new Date();
								return `${date.getFullYear()}-${date.getDate()}-${date.getMonth()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
							 },
			 message = {
			 	type = messageInfo.type,
			 	date = todayDate(),
			 	messageText = messageInfo.message,
			 };
		chatHistory.push(message);
	}

	// Reset input in form
	function reset_form(){
		messageInput.value = '';
	}



	// Zoom chat on desctop
	zoomChatBtn.onclick = function(){
		zoom_chat();
	}

	// Send message 
	sendBtn.onclick = function(){
		create_message({
			type: 'client',
			message: messageInput.value,
		});
	}


	//  При отправке формы по нажатию enter
	sendMessageForm.onsubmit = function(){
		create_message({
			type: 'client',
			message: messageInput.value,
		});
		return false;
	}

	// Отправка сообщения при клике на подсказки
	messagesContainer.onclick = function(event){
		let target = event.target;

		if (target.classList.contains('prompts-js')) {
			create_message({
				type: 'client',
				message: target.innerHTML,
			});
		}
	}


	// Close chat
	closeChat.onclick = function(){
		chat_actions();
	}
	

	return {
	   chat_actions,
	   create_message,
	   lastMessage,
	   globalConfig,
	   chatHistory
	};

})();




/*


// Открытие/закрытие чата
chatModule.chat_actions();



// Последнее сообщение в чате от юзера и оператора
chatModule.lastMessage

// lastMessage = {
// 	client: '',
//  	agent: ''
// };



// Отправка смс юзером

chatModule.create_message({
	type: 'client',
	message: 'Lorem ipsum dolor sit amet',
});



// Отправка смс оператором

chatModule.create_message({
	type: 'agent',
	message: 'Lorem ipsum dolor sit amet',
	sender: {
		avatar: 'img/sender.jpg',
		name: 'Alex',
	}
});




chatModule.globalConfig.changeРroperties({
	// Звук нового сообщения
	audio: true,

	// Что произойдет после отправки сообщения юзером?
	onSendClientMessage: function(){

		setTimeout(function(){
			chatModule.create_message({
				type: 'agent',
				message: chatModule.lastMessage.client,
				sender: {
					avatar: 'img/sender.jpg',
					name: 'Alex',
				}
			});
		}, 1000);
		
	},

	// Подсказки для первого сообщения
	prompts: [
		'Здравствуйте!',
		'Как вам позвонить?',
		'Какой у вас сегодня график работы?'
	],
});


*/
