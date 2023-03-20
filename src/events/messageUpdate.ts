import { Attachment, AttachmentBuilder, AttachmentData, AuditLogEvent, Events, GuildTextBasedChannel, Interaction, Message, TextChannel } from "discord.js"
import Event from "../types/Event"
import log from "../utils/log";

// Emitted whenever a message is deleted
export default new Event({
	name: Events.MessageUpdate,
	async execute(oldmessage: Message, newmessage: Message) {

	},
}
)