namespace App {
  export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
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
}
