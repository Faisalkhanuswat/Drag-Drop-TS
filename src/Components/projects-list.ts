import Component from "./base.js";
import { autobind } from "../Decorators/autobind.js";
import { projectState } from "../States/project-states.js";
import { Project, ProjectStatus } from "../Modules/projects.js";
import List from "./project.js";
import { DragTarget } from "src/Interfaces/project-interface.js";

export default class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {
    assignedProjects: Project[];

    constructor(private type: 'active' | 'finished') {
        super('projects-container', 'app', true);
        this.assignedProjects = [];
        this.config();
        this.renderContent();
    }

    @autobind
    dragOverHandler(event: DragEvent): void {
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            event.preventDefault();
            const ul = this.element.querySelector('ul') as HTMLUListElement;
            ul.classList.add(this.type === 'active' ? 'bg-blue-100' : 'bg-green-100');
        }
    }

    @autobind
    dropHandler(event: DragEvent): void {
        const id = event.dataTransfer!.getData('text/plain');
        projectState.moveProject(id, this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished);
        const ul = this.element.querySelector('ul') as HTMLUListElement;
        ul.classList.remove(this.type === 'active' ? 'bg-blue-100' : 'bg-green-100');
    }

    @autobind
    dragLeaveHandler(_: DragEvent): void {
        const ul = this.element.querySelector('ul') as HTMLUListElement;
        ul.classList.remove(this.type === 'active' ? 'bg-blue-100' : 'bg-green-100');
    }

    private renderProjects() {
        const ul = this.element.querySelector('ul') as HTMLUListElement;
        ul.innerHTML = ""
        for (const proj of this.assignedProjects) {
            new List(proj, `projects-list-${this.type}`)
        }
    }

    config() {
        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);
        this.element.addEventListener('drop', this.dropHandler);

        projectState.addEventListener((projects: Project[]) => {
            const relevantProjects = projects.filter(proj => {
                if (this.type === 'active') {
                    return proj.status === ProjectStatus.Active
                }
                return proj.status === ProjectStatus.Finished
            });
            this.assignedProjects = relevantProjects;
            this.renderProjects()
        })
    }
    renderContent() {
        const h2 = this.element.querySelector('h2')! as HTMLHeadElement;
        h2.textContent = this.type.toUpperCase() + " PROJECTS"
        h2.classList.add(this.type === 'active' ? 'bg-indigo-500' : 'bg-green-500');
        const ul = this.element.querySelector('ul') as HTMLUListElement;
        ul.id = `projects-list-${this.type}`;
    }
}