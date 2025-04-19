import Component from "./base";
import { validateField } from "../utils/validate";
import { autobind } from "../Decorators/autobind";
import { projectState } from "../States/project-states";

export default class AddProject extends Component<HTMLDivElement, HTMLFormElement> {

    constructor() {
        super('add-project', 'app', false);
        this.config();
    }

    private validateFields(data: any): string | undefined {
        if (!validateField({ value: data.title, required: true, minLength: 5, maxLength: 20 })) {
            return 'Invalid title field';
        }
        if (!validateField({ value: data.desc, required: false, minLength: 5, maxLength: 50 })) {
            return 'Invalid description field';
        }
        if (!validateField({ value: data.people, required: true, min: 0, max: 10 })) {
            return 'Invalid people field';
        }
        return;
    }

    config() {
        this.element.addEventListener('submit', this.handler)
    }
    renderContent(): void { }
    @autobind
    private handler(e: Event) {
        e.preventDefault()
        const formData = new FormData(this.element);
        const data = Object.fromEntries(formData as any);
        data.people = +data.people;
        const error = this.validateFields(data);
        if (error) {
            return alert(error)
        }
        const { title, desc, people } = data;
        projectState.addProject(title, desc, people);
        this.element.reset()
    }


}