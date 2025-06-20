/**
 * @typedef {{content:string,embeds:{title:string,description:string,color:Number,footer:{text:string,icon_url:string},author:{name:string,icon_url:string},fields:{name:string,value:string,inline:boolean}[],image:{url:string},thumbnail:{url:string}}}} DiscordMessage
 */

/**
 * Sends a discord message from a webhook
 * @param {DiscordMessage} message Message to send
 * @param {string} webhookURL Webhook
 * @returns {Promise<any>}
 */
async function sendDiscordMessage(message, webhookURL) {
	return await fetch(webhookURL, { headers: { "Content-Type": "application/json" }, method: "POST", body: JSON.stringify(message) })
}

/**
 * Gets a discord webhook
 * @param {string} webhookURL Webhook
 * @returns {{avatarUrl:string,name:string}|undefined}
 */
async function getDiscordWebhook(webhookURL) {
	let data = await fetch(webhookURL).then(d=>d.json()).catch(e=>console.error(e))
	if (data === undefined) return
	if (data.code !== undefined) return
	return {
		avatarUrl: (data.avatar!==null)?`https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}?size=256`:null,
		name: data.name,
	}
}