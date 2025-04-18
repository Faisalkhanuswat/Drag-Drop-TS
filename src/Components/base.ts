export default abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateElement: HTMLTemplateElement;
    hostElement: T;
    element: U;

    constructor(tempId: string, hostId: string, beforeEnd: boolean) {
        this.templateElement = document.getElementById(tempId) as HTMLTemplateElement;
        this.hostElement = document.getElementById(hostId) as T;

        const content = document.importNode(this.templateElement.content, true);
        this.element = content.firstElementChild as U;

        this.render(beforeEnd);
    }

    private render(beforeEnd: boolean) {
        const position = beforeEnd ? "beforeend" : 'afterbegin';
        this.hostElement.insertAdjacentElement(position, this.element);
    }

    abstract config(): void;
    abstract renderContent(): void;
}