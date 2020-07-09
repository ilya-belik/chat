chatModule.globalConfig.changeРroperties({
	audio: true,
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
	prompts: [
		'Здравствуйте!',
		'Как вам позвонить?',
		'Какой у вас сегодня график работы?'
	],
});


/*


// Открытие/закрытие чата
chatModule.chat_actions();



// Последнее сообщение в чате от юзера и оператора
chatModule.lastMessage

// lastMessage = {
// 	client: '',
//  	agent: ''
// };



// Отправка сообщения юзером

chatModule.create_message({
	type: 'client',
	message: 'Lorem ipsum dolor sit amet',
});



// Отправка сообщения оператором

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
