import { Attachment, AttachmentBuilder, AttachmentData, AuditLogEvent, Events, GuildTextBasedChannel, Interaction, Message, TextChannel } from "discord.js"
import Event from "../types/Event"
import log from "../utils/log"
import webhooks from "../utils/webhooks"
import { RawAttachmentData } from "discord.js/typings/rawDataTypes"

// Emitted whenever a message is deleted
export default new Event({
	name: Events.MessageDelete,
	async execute(message: Message) {
		console.log(`a message was deleted in ${message.channel.id}.`)

	},
}
)