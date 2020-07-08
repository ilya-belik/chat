chatModule.config_chat({
	prompts: [
		'Здравствуйте!',
		'Как вам позвонить?',
		'Какой у вас сегодня график работы?'
	],

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
