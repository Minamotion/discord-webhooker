document.addEventListener("DOMContentLoaded", () => {
	const chat = document.getElementById("chat")
	const sendBTN = document.getElementById("send-btn")
	
	const whAPI = document.getElementById("wh-api")
	const whAvatar = document.getElementById("wh-avatar")
	const whName = document.getElementById("wh-name")


	sendBTN.addEventListener("click", async () => {
		sendBTN.disabled = chat.disabled = whAPI.disabled = true
		await sendDiscordMessage({ content: chat.value, embeds: [] }, whAPI.value)
		chat.value = ""
		sendBTN.disabled = chat.disabled = whAPI.disabled = false
	})

	whAPI.value = ""
	whAPI.addEventListener("change", async () => {
		sendBTN.disabled = chat.disabled = whAPI.disabled = true
		let data = await getDiscordWebhook(whAPI.value)
		if (data !== undefined) {
			console.log(data)
			if (data.avatarUrl !== null) whAvatar.src = data.avatarUrl
			else whAvatar.src = "./avatarless.png"
			whName.innerText = data.name
			sendBTN.disabled = chat.disabled = whAPI.disabled = false
		} else {
			whAvatar.src = "./error.png"
			whName.innerText = "Invalid Webhook"
			whAPI.disabled = false
		}
	})
})