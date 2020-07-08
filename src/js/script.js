const chatModule = (function () {

	let sendBtn 			 = document.querySelector('.send-message-btn-js'),
		 sendMessageForm 	 = document.querySelector('.send-message-js');
		 closeChat			 = document.querySelector('.close-chat-js'),
		 messageInput		 = document.querySelector('.client-massage-text-js'),
		 messagesContainer = document.querySelector('.messages-container'),
		 modalChat 			 = document.querySelector('.modal-chat-js'),

		 zoomChatBtn 		 = document.querySelector('.zoom-chat-js'),

		 config 		 = {},
		 lastMessage = {
		 	client: '',
		 	agent: ''
		 };


	function config_chat(data){
		if (data) {
			for(let key in data){

				if (key === 'prompts') {
					let prompts = document.createElement('div');
					prompts.classList.add('message-prompts', 'message-prompts-js', 'active');

					

					for(let i = 0; i < data[key].length; i++){
						let promtBtn = document.createElement('button');
						promtBtn.classList.add('prompt', 'prompts-js');

						promtBtn.innerHTML = data[key][i];

						prompts.appendChild(promtBtn);

					}



					messagesContainer.appendChild(prompts);
				}
				else if(key === 'onSendClientMessage'){
					config.onSendClientMessage = data[key];
				}

			}
		}
	}

	function chat_actions(){
		modalChat.classList.toggle('active');
	}

	function zoom_chat(){
		modalChat.classList.toggle('zoom-in');
		zoomChatBtn.classList.toggle('active');
	}

	function render_html(message){
		let prompts = document.querySelector('.message-prompts-js');
		if (prompts && prompts.classList.contains('active'))
			prompts.classList.remove('active');

		messagesContainer.appendChild(message);
		messagesContainer.scrollTop = messagesContainer.scrollHeight;
		reset_form();
	}




	/*
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

	function create_message(data){
		let message = document.createElement('div');
		message.classList.add('message');

		if (!data.message.length) return false;

		// If the client sent a message
		if (data.type === 'client') {

			message.classList.add('client');
			message.innerHTML = `<div class="text-container">
											<p class="message-text">${data.message}</p>
										</div>`;

			lastMessage.client = data.message;

			if (config.onSendClientMessage){
				config.onSendClientMessage();
			} 

		}

		// If the operator sent a message
		else if(data.type == 'agent'){
			message.classList.add('agent');

			message.innerHTML = `<img src="${data.sender.avatar}" alt="sender avatar" class="avatar">
										<div class="text-container">
											<p class="sender-name">${data.sender.name}</p>
											<p class="message-text">${data.message}</p>
										</div>`;
			
			lastMessage.agent = data.message;
		}


		// Drawing a message in the DOM
		render_html(message);
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

	sendMessageForm.onsubmit = function(){
		create_message({
			type: 'client',
			message: messageInput.value,
		});
		return false;
	}

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
	   config_chat,
	   lastMessage,
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




chatModule.config_chat({
	// Подсказки для первого смс
	prompts: [
		'Здравствуйте!',
		'Как вам позвонить?',
		'Какой у вас сегодня график работы?'
	],

	// Что произойдет после отправки смс юзером?
	onSendClientMessage: function(){
		console.log(chatModule.lastMessage);
	},
});


*/
