const express = require('express')
const path = require('path')
const pg = require('pg')

const PORT = process.env.PORT || 3000
const app = express()
app.listen(PORT, () => `console.log(server started on port ${PORT})`)
/////////////////////////////////////////

CONTACT = [
	{
		id: 1,
		first_name: 'Denis',
		last_name: 'Oshi',
		email: 'oshinodenis@gmail.com',
	},
]

/////////////////////////////////////////
async function database() {
	const { Client } = pg
	const client = new Client({
		user: 'postgres',
		password: 'kafka',
		host: 'localhost',
		port: 5432,
		database: 'postgres',
	})

	await client.connect()

	return (rows = await client.query(`SELECT * FROM users`))

	await client.end()
}
database()
app.get('/api/contacts', (req, res) => {
	res.status(200).json(rows.rows)
})

////////////////////////////////////////////////////////////////
app.use(express.static(path.resolve(__dirname, 'client')))
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
})
