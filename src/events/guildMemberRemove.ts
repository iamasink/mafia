import { AuditLogEvent, EmbedBuilder, Events, Guild, GuildMember, Interaction, Message } from "discord.js"
import Event from "../types/Event"
import { client } from "../index"
import database from "../utils/database"
import log from "../utils/log"
import format from "../utils/format"

// Emitted whenever a user joins a guild.
export default new Event({
	name: Events.GuildMemberRemove,
	async execute(member: GuildMember) {
		let action: string = "left"

	}
})