const input = document.querySelector('.card-input')
const content = document.querySelector('.card_content-wrapper')
const messageContainer = document.querySelector('.card-message_content')

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
