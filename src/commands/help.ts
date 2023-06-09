import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'
import ApplicationCommand from '../types/ApplicationCommand'
import commands from '../utils/commands'
import format from '../utils/format'
import interactionCreate from '../events/interactionCreate'

export default new ApplicationCommand({
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Help me!!'),
	async execute(interaction: ChatInputCommandInteraction): Promise<void> {
		interaction.reply("hi")
	},
})