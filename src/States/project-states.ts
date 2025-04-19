import { Project, ProjectStatus } from "../Modules/projects";

type Listener<T> = (items: T[]) => void;

class State<T> {
    protected listeners: Listener<T>[] = [];

    addEventListener(listenerFn: Listener<T>) {
        this.listeners.push(listenerFn);
    }
}

class ProjectState extends State<Project> {
    private projects: Project[] = [];
    private static instance: ProjectState;

    private constructor() {
        super();
    }

    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance
    }

    addProject(title: string, desc: string, people: number) {
        const newProject = new Project(Math.random().toString(), title, desc, people, ProjectStatus.Active);
        this.projects.push(newProject)
        this.updateListener()
    }

    moveProject(pId: string, newStatus: ProjectStatus) {
        const project = this.projects.find(proj => proj.id === pId);
        if (project && project.status !== newStatus) {
            project.status = newStatus
            this.updateListener()
        }
    }

    private updateListener() {
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }

}

export const projectState = ProjectState.getInstance();