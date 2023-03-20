import { ActionRowBuilder, Events, GuildTextBasedChannel, Interaction, Message, ModalActionRowComponentBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js"
import Event from "../types/Event"
import { client } from "../index"
import commands from "../utils/commands"
import embeds from "../utils/embeds"


// Emitted when an interaction is created.
export default new Event({
	name: Events.InteractionCreate,
	async execute(interaction: Interaction) {
		let location: string
		if (interaction.channel) location = interaction.channel.name
		else location = "dms"
		console.log(`${interaction.user.tag} in #${location} triggered an interaction.`)

		//const guildID = interaction.guild.id


		if (interaction.isChatInputCommand()) {
			console.log("chatinput")


			//console.log(interaction)
			//console.log(interaction.commandName)
			//console.log(interaction.client)
			//console.log(interaction.client.commands)
			//console.log(interaction.options)



			// checks if the command is an aliased (guild) command
			//const dbpath = `.guilds.${guildID}.commands.aliases`
			//const aliases = await database.get(dbpath) || {}
			// console.log(`aliases: ${JSON.stringify(aliases)}`)
			// const aliasedCommand = aliases[interaction.commandName]
			// //console.log(aliasedCommand)
			// if (aliasedCommand) {
			// 	commands.run(interaction, aliasedCommand.commandname, aliasedCommand.group, aliasedCommand.subcommand, aliasedCommand.defaultoptions)
			//} else {
			commands.run(interaction)
			//}

		}

		else if (interaction.isAutocomplete()) {
			console.log(interaction)

			const command = client.commands.get(interaction.commandName)

			console.log(command)
			if (!command) {
				console.error(`No command matching ${interaction.commandName} was found.`)
				return
			}

			try {
				await command.autocomplete(interaction)
			} catch (error) {
				console.error(error)
			}
		}

		else if (interaction.isUserContextMenuCommand()) {
			// gets the (global) command data from the interaction
			console.log(interaction.commandName)
			const command = await client.commands.get(interaction.commandName)
			console.log(command)

			if (!command) {
				console.log(`${interaction} not a command.`)
			}
			commands.run(interaction)

		}

		else if (interaction.isMessageContextMenuCommand()) { }



	}
}
)