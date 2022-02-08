import { Component } from './baseComponent'
import { AutoBind } from '../decorators/autobind'
import { projectState } from '../states/project'
import { Validation, validateUserInputs } from '../utils/validations'

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
	titleElement: HTMLInputElement
	descriptionElement: HTMLTextAreaElement
	peopleElement: HTMLInputElement

	constructor() {
		super('project-input', 'app', true, 'user-input')

		this.titleElement = this.element.querySelector('#title') as HTMLInputElement
		this.descriptionElement = this.element.querySelector(
			'#description'
		) as HTMLTextAreaElement
		this.peopleElement = this.element.querySelector(
			'#people'
		) as HTMLInputElement

		this.handleSubmitForm()
	}

	configure() {}

	renderContent() {}

	@AutoBind
	private handleSubmitForm() {
		this.element.addEventListener('submit', (event) => {
			event.preventDefault()

			const userInputs = this.getUserInputs()

			if (Array.isArray(userInputs)) {
				const [title, description, people] = userInputs
				projectState.addProject(title, description, people)
				this.clearUserInputs()
			}
		})
	}

	private getUserInputs(): [string, string, number] | void {
		const title = this.titleElement.value
		const description = this.descriptionElement.value
		const people = +this.peopleElement.value

		const validateTitle: Validation = {
			value: title,
			required: true,
			minLength: 5,
			maxLength: 20,
		}
		const validateDescription: Validation = {
			value: description,
			required: false,
		}
		const validatePeople: Validation = {
			value: people,
			required: true,
			min: 1,
			max: 10,
		}

		if (
			!validateUserInputs(validateTitle) ||
			!validateUserInputs(validateDescription) ||
			!validateUserInputs(validatePeople)
		) {
			alert('Invalid inputs, please try again')
			return
		} else {
			return [title, description, people]
		}
	}

	private clearUserInputs() {
		this.titleElement.value = ''
		this.descriptionElement.value = ''
		this.peopleElement.value = ''
	}
}
