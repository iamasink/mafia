import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, Emoji, GuildMember, SlashCommandBuilder } from 'discord.js'
import ApplicationCommand from '../types/ApplicationCommand'
import embeds from '../utils/embeds'
import { client } from '..'

export default new ApplicationCommand({
	data: new SlashCommandBuilder()
		.setName('start')
		.setDescription('Start a game')

	,
	async execute(interaction: ChatInputCommandInteraction): Promise<void> {
		const guild = interaction.guild

		if (!interaction.inGuild) return

		// create a reaction for users to react to in order to join the game
		const row1 = new ActionRowBuilder<ButtonBuilder>()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('2v2')
					.setLabel('2v2')
					.setStyle(ButtonStyle.Primary),
			)
			.addComponents(
				new ButtonBuilder()
					.setCustomId('3v3')
					.setLabel('3v3')
					.setStyle(ButtonStyle.Primary)
			)
			.addComponents(
				new ButtonBuilder()
					.setCustomId('4v4')
					.setLabel('4v4')
					.setStyle(ButtonStyle.Primary)
			)
			.addComponents(
				new ButtonBuilder()
					.setCustomId('5v5')
					.setLabel('5v5')
					.setStyle(ButtonStyle.Primary)
			)
			.addComponents(
				new ButtonBuilder()
					.setCustomId('any')
					.setLabel('any')
					.setStyle(ButtonStyle.Primary)
			)


		let msg = await interaction.reply({ embeds: embeds.messageEmbed("Choose a ghfyntmvbjcg <:redamonguspng:857630212644929556>"), fetchReply: true, components: [row1] })
		let playerCount: number = 0
		const collector1 = msg.createMessageComponentCollector({ time: 180 * 1000 })
		// will run on every time a reaction is collected
		collector1.on("collect", async i => {
			if (i.user.id !== interaction.user.id) {
				i.reply({ embeds: embeds.warningEmbed(`not for you to pick you dumb shit, ask ${(interaction.member as GuildMember).displayName} to choose. twat.`), ephemeral: true })
				return
			}
			i.deferUpdate()
			collector1.stop()
			switch (i.customId) {
				case "2v2": {
					playerCount = 4
					break
				}
				case "3v3": {
					playerCount = 6
					break
				}
				case "4v4": {
					playerCount = 8
					break
				}
				case "5v5": {
					playerCount = 10
					break
				}
				case 'any': {
					playerCount = -1
					break
				}
				default: {
					console.log("tf?")
				}
			}

			console.log("hi")


			// create buttons for users to use to in order to join/leave/start the game
			let row = new ActionRowBuilder<ButtonBuilder>()
				.addComponents(
					new ButtonBuilder()
						.setCustomId('join')
						.setLabel('Join')
						.setEmoji("<:watson3:971504370866876458>")
						.setStyle(ButtonStyle.Primary),
				)
				.addComponents(
					new ButtonBuilder()
						.setCustomId('leave')
						.setLabel('Leave')
						.setEmoji("<:Baker2:971504370493571092>")
						.setStyle(ButtonStyle.Primary),
				)
				.addComponents(
					new ButtonBuilder()
						.setCustomId('start')
						.setLabel('Start')
						.setEmoji("<:brookertr:971504369675673610>")
						.setStyle(ButtonStyle.Success)
						.setDisabled(true)
				)

			await msg.edit({ embeds: embeds.messageEmbed("Game Created!", "Join by clicking the button"), components: [row] })
			let joined: any[] = []
			const collector = msg.createMessageComponentCollector({ time: 5 * 60 * 1000 })
			// will run on every time a reaction is collected
			collector.on("collect", async i => {
				const option = i.customId

				switch (option) {
					case 'join': {

						const newrow = row
						if (playerCount == -1) {
							newrow.components[2].setDisabled(false)
						}

						if (playerCount != -1 && joined.length >= playerCount) {
							i.reply({ embeds: embeds.warningEmbed('no more players may join uwu!'), ephemeral: true })
						} else {
							if (joined.includes(i.user.id)) {
								i.reply({ embeds: embeds.warningEmbed(`you're already in the game you bellend`), ephemeral: true })
							} else {
								joined.push(i.user.id)
								console.log(joined)
								//i.reply({ embeds: embeds.warningEmbed(`Joined the game`), ephemeral: true })
								i.deferUpdate()
							}
						}

						if (playerCount != -1) {
							if (joined.length >= playerCount) {
								newrow.components[2].setDisabled(false)
							}
						}

						let string = (await Promise.all(joined.map(id => guild.members.fetch(id)))).join("\n")
						console.log(string)
						msg.edit({ embeds: embeds.messageEmbed("Game Created!", `**Joined**:\n${string}`), components: [newrow] })

						break
					}
					case 'leave': {
						const newrow = row

						let index = joined.findIndex(j => j === i.user.id)
						if (index != -1) {
							joined.splice(index, 1)
							console.log(joined)
							//i.reply({ embeds: embeds.warningEmbed(`Left the game`), ephemeral: true })
							i.deferUpdate()
						} else {
							i.reply({ embeds: embeds.warningEmbed(`You weren't in the game, braindead`), ephemeral: true })
						}

						if (playerCount != -1) {
							if (joined.length < playerCount) {
								newrow.components[2].setDisabled(true)
							}
						}

						let string = (await Promise.all(joined.map(id => guild.members.fetch(id)))).join("\n")
						console.log(string)
						msg.edit({ embeds: embeds.messageEmbed("Game Created!", `**Joined**:\n${string || "No players have joined"}`), components: [newrow] })
						break
					}
					case 'start': {
						if (i.user.id !== interaction.user.id) {
							i.reply({ embeds: embeds.warningEmbed(`Not for you! Ask ${(interaction.member as GuildMember).displayName} to start`), ephemeral: true })
							return
						}
						// checks if there is the right amount of people in the game
						// if so it can start
						// if not it can't
						// (you could just do it so the start button enables when there's enough people)
						let row = new ActionRowBuilder<ButtonBuilder>()
							.addComponents(
								new ButtonBuilder()
									.setCustomId('join')
									.setLabel('Join')
									.setEmoji("<:watson3:971504370866876458>")
									.setStyle(ButtonStyle.Primary),
							)

						if (playerCount != -1) {
							if (joined.length < playerCount) {
								interaction.reply("There aren't enough people!")
							} else if (joined.length > playerCount) {
								interaction.reply("Theres too many people!")
							}
						}

						let players = joined

						// Shuffle the array randomly
						const shuffledPlayers = players.sort(() => Math.random() - 0.5)

						// Partition the shuffled array into two equal halves
						const half = Math.ceil(shuffledPlayers.length / 2)
						const team1 = shuffledPlayers.splice(0, half)
						const team2 = shuffledPlayers.splice(-half + 1)
						const mole1 = team1[Math.floor(Math.random() * team1.length)]
						const mole2 = team2[Math.floor(Math.random() * team2.length)]

						console.log(players)
						console.log(team1)
						console.log(team2)
						console.log(mole1)
						console.log(mole2)


						for (let i = 0, len = players.length; i < len; i++) {
							console.log(players[i])
							const player = await guild.members.fetch(players[i])
							console.log(player.user.username)
							let team: string
							if (team1.includes(players[i])) {
								team = "Team 1"
							} else {
								team = "Team 2"
							}

							player.send("hi" + team)
						}


						// pick one random person from the list to message telling them they're sus
						// message the others they are not sus
						// split the players into random teams
						// create 2 voice chats, unlocking them by the teams
						// should be all
						break
					}
					default: {
						console.log("oh man you fucked up oh no")
					}
				}
			})
		})

	},
})