import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'
import ApplicationCommand from '../types/ApplicationCommand'
import database from '../utils/database'


export default new ApplicationCommand({
	data: new SlashCommandBuilder()
		.setName('join')
		.setDescription('description'),
	async execute(interaction: ChatInputCommandInteraction): Promise<void> {
		const user = interaction.user
		database.set(`.users.${user.id}`, "")
	},
})