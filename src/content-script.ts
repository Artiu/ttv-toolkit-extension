let chatMessages: HTMLDivElement | null = null;

const messagesObserver = new MutationObserver((mutations) => {
	mutations.forEach((mutation) => {
		mutation.addedNodes.forEach((node) => {
			if (!(node instanceof HTMLElement)) return;
			const messageBodyElement = node.querySelector(
				"[data-a-target='chat-line-message-body']"
			);
			if (messageBodyElement) {
				console.log(messageBodyElement.textContent);
			}
		});
	});
});

const chatWaitingObserver = new MutationObserver(() => {
	if (chatMessages && chatMessages.parentNode) {
		return;
	}
	if (chatMessages && !chatMessages.parentNode) {
		messagesObserver.disconnect();
	}
	chatMessages =
		(document.getElementsByClassName("chat-scrollable-area__message-container")[0] as
			| HTMLDivElement
			| undefined) ?? null;
	if (chatMessages) {
		messagesObserver.observe(chatMessages, {
			childList: true,
		});
	}
});

chatWaitingObserver.observe(document.body, {
	childList: true,
});
