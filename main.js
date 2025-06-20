document.addEventListener("DOMContentLoaded", () => {
	const chat = document.getElementById("chat")
	const webhookURL = document.getElementById("webhook-url")
	const sendBTN = document.getElementById("send-btn")

	const whAvatar = document.getElementById("wh-avatar")
	const whName = document.getElementById("wh-name")


	sendBTN.addEventListener("click", async () => {
		sendBTN.disabled = chat.disabled = webhookURL.disabled = true
		await sendDiscordMessage({ content: chat.value, embeds: [] }, webhookURL.value)
		chat.value = ""
		sendBTN.disabled = chat.disabled = webhookURL.disabled = false
	})

	webhookURL.value = ""
	webhookURL.addEventListener("change", async () => {
		sendBTN.disabled = chat.disabled = webhookURL.disabled = true
		let data = await getDiscordWebhook(webhookURL.value)
		if (data !== undefined) {
			console.log(data)
			if (data.avatarUrl !== null) whAvatar.src = data.avatarUrl
			else whAvatar.src = "./avatarless.png"
			whName.innerText = data.name
			sendBTN.disabled = chat.disabled = webhookURL.disabled = false
		} else {
			whAvatar.src = "./error.png"
			whName.innerText = "Invalid Webhook"
			webhookURL.disabled = false
		}
	})
})