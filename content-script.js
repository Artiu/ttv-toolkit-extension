let chatMessages = null;

const messagesObserver = new MutationObserver((mutations) => {
	mutations.forEach((mutation) => {
		mutation.addedNodes.forEach((node) => {
			const messageBodyElement = node.querySelector(
				"[data-a-target='chat-line-message-body']"
			);
			if (messageBodyElement) {
				console.log(messageBodyElement.textContent);
			}
		});
	});
});

const chatWaitingObserver = new MutationObserver((mutations) => {
	if (chatMessages && chatMessages.parentNode) {
		return;
	}
	if (chatMessages && !chatMessages.parentNode) {
		messagesObserver.disconnect();
	}
	[chatMessages] = document.getElementsByClassName("chat-scrollable-area__message-container");
	if (chatMessages) {
		messagesObserver.observe(chatMessages, {
			childList: true,
		});
	}
});

chatWaitingObserver.observe(document.body, {
	childList: true,
});
