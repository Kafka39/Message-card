const express = require('express')
const path = require('path')
const pg = require('pg')

const PORT = process.env.PORT || 3000
const app = express()
app.listen(PORT, () => `console.log(server started on port ${PORT})`)
/////////////////////////////////////////
app.use(express.json())

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

	app.post('/api/contacts', async (req, res) => {
		const { input1, input2 } = req.body;
	
		try {
			// Вставляем данные без указания id
			await client.query(
				`INSERT INTO users (first_name, last_name, email) VALUES ($1, $2, $3)`,
				[input1, input2, 'XZ@mail.ru']
			);
			console.log(req.body);
			res.status(201).send('User added successfully');
		} catch (error) {
			console.error('Error inserting data:', error);
			res.status(500).send('Server error');
		}
	});
	

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
