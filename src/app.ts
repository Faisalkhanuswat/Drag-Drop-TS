import AddProject from "./Components/add-project";
import ProjectList from "./Components/projects-list";

import "./app.css";

console.log('Drag and Drop Project runnig...');

new AddProject()
new ProjectList('active');
new ProjectList('finished');