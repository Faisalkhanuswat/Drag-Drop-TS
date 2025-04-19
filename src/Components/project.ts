import Component from "./base";
import { autobind } from "../Decorators/autobind";
import { Draggable } from "../Interfaces/project-interface";

export default class List extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
    constructor(private proj: { id: string, title: string, desc: string, people: number }, private hostId: string) {
        super('single-project', hostId, true);
        this.config();
        this.renderContent();
    }

    get persons() {
        if (this.proj.people === 1) {
            return this.proj.people + " Person";
        } else {
            return this.proj.people + " Persons";
        }
    }
    @autobind
    dragStartHandler(event: DragEvent): void {
        event.dataTransfer!.setData('text/plain', this.proj.id);
        event.dataTransfer!.effectAllowed = 'move';
    }

    dragEndHandler(event: DragEvent): void {
    }

    config(): void {
        this.element.addEventListener('dragstart', this.dragStartHandler);
        this.element.addEventListener('dragend', this.dragEndHandler);
    }

    renderContent(): void {
        const h2 = this.element.querySelector('h2')!;
        h2.textContent = this.proj.title;
        const h5 = this.element.querySelector('h5')!;
        h5.textContent = this.persons;
        const p = this.element.querySelector('p')!;
        p.textContent = this.proj.desc;
    }
}
