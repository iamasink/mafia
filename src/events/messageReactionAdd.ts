import { EmbedBuilder, Events, GuildTextBasedChannel, Interaction, Message, MessageReaction, ReactionManager, User } from "discord.js"
import Event from "../types/Event"
import { client } from "../index"
import database from "../utils/database"
import messageCreate from "./messageCreate"
import embeds from "../utils/embeds"
import { type } from "os"

// Emitted whenever a reaction is added to a message
export default new Event({
	name: Events.MessageReactionAdd,
	async execute(reaction: MessageReaction, user: User) {

	},
}
)