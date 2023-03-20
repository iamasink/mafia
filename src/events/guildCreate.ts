import { Events, Guild, Interaction, Message } from "discord.js"
import Event from "../types/Event"
import { client } from "../index"
import database from "../utils/database"
import embeds from "../utils/embeds"

// Emitted whenever the client joins a guild.
export default new Event({
	name: Events.GuildCreate,
	async execute(guild: Guild) {
		console.log(`a guild was joined: ${guild}`)



		guild.systemChannel.send({ embeds: await embeds.profileEmbed(":wave: Hi!", ".", null, client.user) })
	},
}
)