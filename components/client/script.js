const input = document.querySelector('.card-input')
const content = document.querySelector('.card_content-wrapper')
const messageContainer = document.querySelector('.card-message_content')

async function request(url, method = 'GET', data = null) {
	try {
		const headers = {}

		let body

		if (data) {
			headers['Content-Type'] = 'application/json'
			body = JSON.stringify(data)
		}

		const response = await fetch(url, {
			method,
			headers,
			body,
		})
		return await response.json()
	} catch (e) {
		console.warn('Error: ', e.message)
	}
}

async function getContact() {
	const data = await request('/api/contacts')

	data.forEach(element => {
		content.innerHTML += `
		<div class="card-message_content">
				<span class="message_content-span">${element.first_name}</span>
		</div>
		`
	})
}
getContact()

function isURL(value) {
	try {
		new URL(value)
		return true
	} catch (_) {
		return false
	}
}

input.addEventListener('keydown', event => {
	const value = input.value.trim()
	const words = value.split(' ')

	const htmlElement = words
		.map(word => {
			if (isURL(word)) {
				return `<a class="message_content-link" target='_blank' href="${word} "
				>${word}</a>`
			}
			return word
		})
		.join(' ')

	if (event.key === 'Enter') {
		event.preventDefault()
		if (value.length === 0) return
		content.innerHTML += `

		<div class="card-message_content">
			<span class="message_content-span">
			${htmlElement}</span>
		</div>
		`
		input.value = ''
		content.scrollTop = content.scrollHeight
		// content.scrollHeight = content.scrollTop
	}
})

const btn = document.querySelector('.test_commit')
const form = document.querySelector('.form')

btn.addEventListener('click', async event => {
	event.preventDefault()

	const formData = new FormData(form)

	let valueObj = {}
	for (let [name, value] of formData) {
		valueObj[name] = value.trim()
	}

	const response = await request('/api/contacts', 'POST', valueObj)

	console.log(response)

	if (valueObj.input1 !== '' && valueObj.input2 !== '') {
		content.innerHTML += `
		<div class="card-message_content">
				<span class="message_content-span">
				<span class="_object">First name:</span> ${valueObj.input1}
				<br/>
				<span class="_object">Last name:</span> ${valueObj.input2}</span>
		</div>
		`
	}
})
