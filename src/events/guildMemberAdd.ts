import { Events, GuildMember, Interaction, Message } from "discord.js"
import Event from "../types/Event"
import { client } from "../index"
import database from "../utils/database"
import log from "../utils/log"
import commands from "../utils/commands"
import invites from "../utils/invites"

// Emitted whenever a user joins a guild.
export default new Event({
	name: Events.GuildMemberAdd,
	async execute(member: GuildMember) {
		const guild = member.guild


	},
}
)