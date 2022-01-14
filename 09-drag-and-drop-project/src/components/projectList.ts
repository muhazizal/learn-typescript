/// <reference path="../components/baseComponent.ts" />
/// <reference path="../interfaces/dragDrop.ts" />
/// <reference path="../decorators/autobind.ts" />
/// <reference path="../states/project.ts" />
/// <reference path="../models/project.ts" />

namespace App {
  export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {
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
}
