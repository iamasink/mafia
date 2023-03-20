import { Events, Interaction, Invite, Message } from "discord.js"
import Event from "../types/Event"
import { client } from "../index"
import database from "../utils/database"

// Emitted whenever an invite is created
export default new Event({
	name: Events.InviteCreate,
	async execute(invite: Invite) {
	}
})