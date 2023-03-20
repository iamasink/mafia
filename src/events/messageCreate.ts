import { Events, Guild, GuildTextBasedChannel, Message, Utils } from 'discord.js'
import Event from '../types/Event'
import { client } from "../index"
import database from '../utils/database'

import format from '../utils/format'




export default new Event({
	name: Events.MessageCreate,
	once: false,
	async execute(message: Message): Promise<void> {



	},
})