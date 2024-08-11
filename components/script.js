const input = document.querySelector('.card-input')
const content = document.querySelector('.card_content-wrapper')

function isURL(value) {
	try {
		new URL(value)
		return true
	} catch (_) {
		return false
	}
}

input.addEventListener('keydown', event => {
	const value = input.value
	if (event.key === 'Enter') {
		if (value.length === 0) return
		event.preventDefault()
		const words = value.split(' ')

		htmlElement = words
			.map(word => {
				if (isURL(word)) {
					return `<a class="message_content-link" href="${word}"
				>${word}</a>`
				}
				return word
			})
			.join(' ')

		content.innerHTML += `
		
		<div class="card-message_content">
			<span class="message_content-span"
			>
			${htmlElement}</span>
		</div>
		
		`
		input.value = ''
	}
})
