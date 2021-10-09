// Drag & Drop Interfaces
interface Draggable {
  dragStartHandler(event: DragEvent): void
  dragEndHandler(event: DragEvent): void
}

interface DragTarget {
  dragOverHandler(event: DragEvent): void
  dropHandler(event: DragEvent): void
  dragLeaveHandler(event: DragEvent): void
}

// Validation
interface Validation {
  value: string | number
  required?: boolean
  minLength?: number
  maxLength?: number
  min?: number
  max?: number
}

function validateUserInputs(validation: Validation): boolean {
  let isValid: boolean = true

  if (validation.required) {
    isValid = isValid && validation.value.toString().trim().length > 0
  }
  if (validation.minLength && typeof validation.value === 'string') {
    isValid = isValid && validation.value.length > validation.minLength
  }
  if (validation.maxLength && typeof validation.value === 'string') {
    isValid = isValid && validation.value.length < validation.maxLength
  }
  if (validation.min && typeof validation.value === 'number') {
    isValid = isValid && validation.value >= validation.min
  }
  if (validation.max && typeof validation.value === 'number') {
    isValid = isValid && validation.value <= validation.max
  }

  return isValid
}

// Auto Binding Interface
function AutoBind(_target: any, _name: string, descriptor: PropertyDescriptor) {
  const adjacentDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      return descriptor.value.bind(this)
    },
  }
  return adjacentDescriptor
}

// Project State Management
type Listener<T> = (items: T[]) => void

class State<T> {
  protected listeners: Listener<T>[] = []

  addListeners(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn)
  }
}

class ProjectState extends State<Project> {
  private projects: Project[] = []
  private static instance: ProjectState

  private constructor() {
    super()
  }

  static getInstance() {
    if (this.instance) {
      return this.instance
    }
    this.instance = new ProjectState()
    return this.instance
  }

  addProject(title: string, description: string, people: number) {
    const newProject = new Project(Math.random().toString(), title, description, people, ProjectStatus.Active)
    console.log(newProject)

    this.projects.push(newProject)
    this.updateListeners()
  }

  moveProject(projectId: string, newStatus: ProjectStatus) {
    const project = this.projects.find((project) => project.id === projectId)
    if (project && project.status !== newStatus) {
      project.status = newStatus
      this.updateListeners()
    }
  }

  private updateListeners() {
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice())
    }
  }
}

// Component Base
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement
  hostElement: T
  element: U

  constructor(templateElementId: string, hostElementId: string, attachAtBeginning: boolean, newElementId?: string) {
    this.templateElement = document.getElementById(templateElementId)! as HTMLTemplateElement
    this.hostElement = document.getElementById(hostElementId)! as T
    this.element = document.importNode(this.templateElement.content, true).firstElementChild as U

    if (newElementId) {
      this.element.id = newElementId
    }

    this.attach(attachAtBeginning)
  }

  private attach(attachAtBeginning: boolean) {
    this.hostElement.insertAdjacentElement(attachAtBeginning ? 'afterbegin' : 'beforeend', this.element)
  }

  abstract configure(): void
  abstract renderContent(): void
}

// Project Input
class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleElement: HTMLInputElement
  descriptionElement: HTMLTextAreaElement
  peopleElement: HTMLInputElement

  constructor() {
    super('project-input', 'app', true, 'user-input')

    this.titleElement = this.element.querySelector('#title') as HTMLInputElement
    this.descriptionElement = this.element.querySelector('#description') as HTMLTextAreaElement
    this.peopleElement = this.element.querySelector('#people') as HTMLInputElement

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

// Project Item
class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
  private project: Project

  get getPersons() {
    return this.project.people === 1 ? '1 person' : `${this.project.people} persons`
  }

  constructor(hostId: string, project: Project) {
    super('single-project', hostId, false, project.id)
    this.project = project
    this.configure()
    this.renderContent()
  }

  @AutoBind
  dragStartHandler(event: DragEvent) {
    event.dataTransfer!.setData('text/plain', this.project.id)
    event.dataTransfer!.effectAllowed = 'move'
  }

  dragEndHandler(_event: DragEvent) {}

  configure() {
    this.element.addEventListener('dragstart', this.dragStartHandler)
    this.element.addEventListener('dragend', this.dragEndHandler)
  }

  renderContent() {
    this.element.querySelector('h2')!.textContent = this.project.title
    this.element.querySelector('h3')!.textContent = `${this.getPersons} assigned`
    this.element.querySelector('p')!.textContent = this.project.description
  }
}

// Project List
class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {
  assignedProjects: Project[]

  constructor(private type: 'active' | 'finished') {
    super('project-list', 'app', false, `${type}-projects`)

    this.assignedProjects = []

    this.configure()
    this.renderContent()
  }

  @AutoBind
  dragOverHandler(event: DragEvent) {
    if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
      event.preventDefault()
      const listEl = this.element.querySelector('ul')!
      listEl.classList.add('droppable')
    }
  }

  @AutoBind
  dragLeaveHandler(_event: DragEvent) {
    const listEl = this.element.querySelector('ul')!
    listEl.classList.remove('droppable')
  }

  @AutoBind
  dropHandler(event: DragEvent) {
    const projectId = event.dataTransfer!.getData('text/plain')
    const projectType = this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished
    projectState.moveProject(projectId, projectType)
  }

  configure() {
    this.element.addEventListener('dragover', this.dragOverHandler)
    this.element.addEventListener('dragleave', this.dragLeaveHandler)
    this.element.addEventListener('drop', this.dropHandler)

    projectState.addListeners((projects: Project[]) => {
      const relevantProjects = projects.filter((project) => {
        if (this.type === 'active') {
          return project.status === ProjectStatus.Active
        }
        return project.status === ProjectStatus.Finished
      })
      this.assignedProjects = relevantProjects
      this.renderProjects()
    })
  }

  renderContent() {
    const listId = `${this.type}-projects-list`
    this.element.querySelector('ul')!.id = listId
    this.element.querySelector('h2')!.textContent = `${this.type.toUpperCase()} PROJECTS`
  }

  private renderProjects() {
    const listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement
    listEl.innerHTML = ''
    for (const project of this.assignedProjects) {
      new ProjectItem(this.element.querySelector('ul')!.id, project)
    }
  }
}

// Project Type
enum ProjectStatus {
  Active,
  Finished,
}

class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus
  ) {}
}

const projectState = ProjectState.getInstance()

const projectInput = new ProjectInput()
const actionProjectList = new ProjectList('active')
const finishedProjectList = new ProjectList('finished')
