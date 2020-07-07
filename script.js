let sendBtn 			 = document.querySelector('.send-message-btn-js'),
	 messageInput		 = document.querySelector('.client-massage-text-js'),
	 messagesContainer = document.querySelector('.messages-container'),
	 modalChat 			 = document.querySelector('.modal-chat-js'),

	 messages = [];

function open_chat(){
	modalChat.classList.toggle('active');
}

function render_html(data){

	if (data.type === 'client') {
		let message = create_message({
			type: 'client',
			message: messageInput.value
		});
		messagesContainer.appendChild(message);
	}
	else if(data.type == 'agent'){
		let message =  create_message({
								type: 'agent',
								message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis illum tempora earum pariatur, reprehenderit quibu',
								sender: {
									avatar: 'sender.jpg',
									name: 'Alex',
								}
							});
		messagesContainer.appendChild(message);
	}
	

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

	if (data.type === 'client') {

		message.classList.add('client');
		message.innerHTML = `<div class="text-container">
										<p class="message-text">${data.message}</p>
									</div>`;
	}
	else if(data.type == 'agent'){
		message.classList.add('agent');

		message.innerHTML = `<img src="${data.sender.avatar}" alt="sender avatar" class="avatar">
									<div class="text-container">
										<p class="sender-name">${data.sender.name}</p>
										<p class="message-text">${data.message}</p>
									</div>`;
		
	}

	return message;
}

function reset_form(){
	messageInput.value = '';
}


sendBtn.onclick = function(){
	render_html({
		type: 'client'
	});

	setTimeout(function(){
		render_html({
			type: 'agent'
		});
	}, 1000);
}