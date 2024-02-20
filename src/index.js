import './style.css';
import { createManager } from "./manager";
import { createProject } from "./project";
import { createTODO } from './todo';

//                 const editButton = () => {
//                     const button = document.createElement("button");
//                     button.className = button.textContent = "edit";
//                     button.addEventListener("click", () => {
//                         div.textContent = '';
//                         div.removeEventListener("click", expandTodo);
//                         container.classList.add("expanded");

//                         const inputTitle = document.createElement("input");
//                         inputTitle.setAttribute("type","text");
//                         inputTitle.id = "todoTitle";
//                         inputTitle.value = todo.getTitle();

//                         const inputDescription = document.createElement("input");
//                         inputDescription.setAttribute("type","text");
//                         inputDescription.id = "todoDescription";
//                         inputDescription.value = todo.getDescription();

//                         const inputDate = document.createElement("input");
//                         inputDate.setAttribute("type","date");
//                         inputDate.id = "todoDueDate";
//                         inputDate.value = todo.getDueDate();

//                         const selectPriority = document.createElement("select");
//                         selectPriority.id = "todoPriority";

//                         const priorities = ["High","Medium","Low"];
//                         priorities.forEach(priority => {
//                             const option = document.createElement("option");
//                             option.value = priority;
//                             option.textContent = priority;
//                             if(priority === todo.getPriority()){
//                                 option.selected = true;
//                             }
//                             selectPriority.appendChild(option);
//                         });
                        
//                         const submit = document.createElement("button");
//                         submit.className = "submit";
//                         submit.textContent = "OK";
//                         submit.addEventListener("click", () => {
//                             todo.setTitle(inputTitle.value);
//                             todo.setDescription(inputDescription.value);
//                             todo.setDueDate(inputDate.value);
//                             todo.setPriority(selectPriority.value);
//                             displayProject(project);
//                             expandTodo();
//                         });

//                         container.replaceChild(submit, container.childNodes[1]);
//                         div.append(inputTitle,inputDescription,inputDate,selectPriority);
//                     });
//                     container.appendChild(button);
//                 }
        
//                 const deleteButton = () => {
//                     const button = document.createElement("button");
//                     button.className = button.textContent = "delete";
//                     button.addEventListener("click", () => {
                        
//                     });
//                     container.appendChild(button);
//                 }
    
//                 div.append(title,dueDate);

//                 const expandTodo = () => {
//                     displayTodoDetails(todo);
//                 }

//                 div.addEventListener("click", expandTodo);
//                 container.appendChild(div);
//                 editButton();
//                 deleteButton();
//                 board.appendChild(container);
//             });
//         }

//         const addTodoButton = () => {
//             const container = document.createElement("container");
//             container.className = "todo add";
        
//             const title = document.createElement("p");
//             title.className = "title";
//             title.textContent = "+";
//             container.appendChild(title);
//             board.appendChild(container);
//         }

//         if(project === "all"){
//             displayAllTodos(manager.getAllTodos());
//             addTodoButton();
//         }else {
//             title();
//             displayAllTodos(project.getTodos());
//             addTodoButton();
//         }
//     }

//     const displayTodoDetails = (todo) => {
//         const container = document.querySelector(".board > .todo");
//         const div = document.querySelector(".board > .todo > .details");
//         div.textContent = '';
//         const details = {
//             "title":todo.getTitle(),
//             "description":todo.getDescription(),
//             "dueDate": todo.getDueDate(),
//             "priority":todo.getPriority(),
//         };

//         for (let detail in details) {
//             const p = document.createElement('p');
//             p.className = detail;
//             p.textContent = details[detail];
//             div.appendChild(p);
//         }
//         container.classList.add("expanded");
//     }

//     initialDataLoad(manager);
//     layout();
//     displayProjectList(manager);
//     displayProject("all");
// }

//doc creator

const createButton = (name,text) => {

    const button = document.createElement("button");
    button.className = name;
    button.textContent = text;
    return button;
} 

const createDiv = (className) => {

    const div = document.createElement("div");
    div.className = className;
    return div;
}

//todo doms creator

const createProjectLi = (project) => {

    const list = document.createElement("li");
    list.className = "project";

    const wrapper = createDiv("wrapper");

    const holder = createDiv("title-holder");

    const title = document.createElement('p');
    title.className = "title";
    title.textContent = project.getTitle();

    holder.appendChild(title);
    wrapper.appendChild(holder);
    list.append(wrapper);

    return list;
}

const createProjectList = (projectList) => {

    const projectListUL = document.createElement("UL");
    projectListUL.className = "project-list";

    projectList.forEach((project, index) => {

        const list = createProjectLi(project);
        list.setAttribute("index",index);
        projectListUL.appendChild(list);
    });

    return projectListUL;
}

const createCurrentProjectLi = (projectLi) => {

    projectLi.classList.add("current");
    const wrapper = projectLi.childNodes[0];
    
    const deleteButton = createButton("delete","delete");

    wrapper.appendChild(deleteButton);

    return projectLi;
}

const updateProjectList = (manager, container) => {
    const newProjectList = displayProjectList(manager);
    container.replaceChild(newProjectList, container.childNodes[1]);
}

const displayProjectTitle = (project, index) => {

    const header = document.createElement("header");
    header.className = "project";
    header.setAttribute("projectIndex",index);

    const projectTitle = document.createElement('p');
    projectTitle.className = "title";
    projectTitle.textContent = project.getTitle().toUpperCase();

    const renameButton = createButton("rename", "rename");

    header.append(projectTitle, renameButton);

    return header;
}

const displayProjectTodos = (todos) => {

    const todoUl = document.createElement("UL");
    todoUl.className = "todo-list";

    todos.forEach((todo, index) => {

        const todoLi = document.createElement("li");
        todoLi.className = "todo";
        todoLi.setAttribute("todoIndex",index);

        const todoWrapper = createDiv("wrapper");

        const details = displayTodo(todo);

        const editButton = createButton("edit","edit");
        const deleteButton = createButton("delete", "delete");
        todoWrapper.append(details,editButton,deleteButton);
        todoLi.appendChild(todoWrapper);
        todoUl.appendChild(todoLi);
    });

    return todoUl;
}

const displayTodo = (todo) => {

    const details = createDiv("details");

    const title = document.createElement("p");
    title.className = "title";
    title.textContent = todo.getTitle();

    const dueDate = document.createElement("p");
    dueDate.className = "dueDate";
    dueDate.textContent = todo.getDueDate();

    //style depending on piority
    details.classList.add((todo.getPriority()).toLowerCase());

    details.append(title,dueDate);

    return details;
}

const displayExpandedTodo = (todo) => {

    const details = createDiv("details");

    const title = document.createElement("p");
    title.className = "title";
    title.textContent = todo.getTitle();

    const description = document.createElement("p");
    description.className = "description";
    description.textContent = todo.getDescription();

    const dueDate = document.createElement("p");
    dueDate.className = "dueDate";
    dueDate.textContent = todo.getDueDate();

    const priority = document.createElement("p");
    priority.className = "priority";
    priority.textContent = todo.getPriority();

    //style depending on piority
    details.classList.add((todo.getPriority()).toLowerCase());

    details.append(title,description,dueDate,priority);

    return details;
}

const editDetailsInput = (todo) => {

    const wrapper = createDiv("wrapper");
    const detailsInputDiv = createDiv("edit-details");

    const titleInput = document.createElement("input");
    titleInput.setAttribute("type","text");
    titleInput.id = "title";
    titleInput.value = todo.getTitle();

    const descriptionInput = document.createElement("input");
    descriptionInput.setAttribute("type","text");
    descriptionInput.id = "description";
    descriptionInput.value = todo.getDescription();

    const dueDateInput = document.createElement("input");
    dueDateInput.setAttribute("type","date");
    dueDateInput.id = "dueDate";
    dueDateInput.value = todo.getDueDate();

    const priortySelect = document.createElement("select");
    priortySelect.id = "todoPriority";

    const priorities = ["High","Medium","Low"];
    priorities.forEach(priority => {
        const option = document.createElement("option");
        option.value = priority;
        option.textContent = priority;
        if(priority === todo.getPriority()){
            option.selected = true;
        }
        priortySelect.appendChild(option);
    });
    
    detailsInputDiv.append(titleInput,descriptionInput,dueDateInput,priortySelect);

    const submitButton = createButton("submit","submit");
    wrapper.append(detailsInputDiv,submitButton)
    return wrapper;
}

const TodoList = (manager) => {

    //layout
    const body = document.querySelector('body');
    const main = document.createElement("container");
    main.className = "main";
    const sidebar = document.createElement("aside");
    sidebar.className = "manager";
    const board = document.createElement("section");
    board.className = "board";
    main.append(sidebar,board);
    body.append(main);

    const projects = manager.getProjects();

    //sidebar
        //all todos button
    const allTodosButton = createButton("all-todos","All");
        ///project list
    const projectList = createProjectList(projects);
        // add project button
    const addProjectButton = createButton("add-project", "+");
    sidebar.append(allTodosButton,projectList,addProjectButton);

    sidebar.addEventListener("click", (event) => {
        const target = event.target;
        console.log(target);

        if(target.matches(".all-todos")){
            // //all button
            // board.textContent = "";
            // resetClickedList(".manager > .project > .wrapper.clicked",".delete","clicked");
            // const header = document.createElement("header");
            // header.className = "project";
            // header.setAttribute("projectIndex","all");

            // const projectTitle = document.createElement('p');
            // projectTitle.className = "title";
            // projectTitle.textContent = "ALL";

            // const allTodos = manager.getAllTodos();
            // const allTodosUl = displayProjectTodos(allTodos);
            // header.appendChild(projectTitle);
            // board.append(header,allTodosUl);

        }else if(target.matches(".manager.add")){
            // //add button
            // const newProject = createProject("New");
            // manager.addProject(newProject);
            // updateProjectList(manager,sidebar);
            // //add delete button to latest project
            // const lastProjectLi = sidebar.childNodes[1].lastElementChild;
            // const wrapper = lastProjectLi.childNodes[0];
            // wrapper.classList.add("clicked");
            // const deleteButton = createButton("delete", "delete");
            // wrapper.appendChild(deleteButton);
            // const projectIndex = lastProjectLi.getAttribute("projectIndex");
            // //display the projectTitle
            // const projectTitle = displayProjectTitle(projects[projectIndex],projectIndex);
            // board.textContent = "";
            // board.appendChild(projectTitle);

        }else if(target.closest(".title-holder")){ //project List
            //if clicked project was current
            if(!target.closest(".project.current")){
                //remove previous current project
                const previousCurrentProjectLi = sidebar.querySelector(".project-list > .project.current");
                if(previousCurrentProjectLi){
                    const previousCurrentProjectLiIndex = previousCurrentProjectLi.getAttribute("index");
                    const previousProjectLi = createProjectLi(projects[previousCurrentProjectLiIndex]);
                    previousProjectLi.setAttribute("index", previousCurrentProjectLiIndex);
                    projectList.replaceChild(previousProjectLi, projectList.childNodes[previousCurrentProjectLiIndex]);
                }
                //append delete button
                const clickedProjectLi = target.closest(".project");
                const clickedProjectLiIndex = clickedProjectLi.getAttribute("index");
                const currenProjectLi = createCurrentProjectLi(clickedProjectLi);
                currenProjectLi.setAttribute("index", clickedProjectLiIndex);
                projectList.replaceChild(currenProjectLi, projectList.childNodes[clickedProjectLiIndex]);
            }
            
            //append project title on board
            // const projectIndex = target.closest("li.project").getAttribute("projectIndex");
            // const projectTitle = displayProjectTitle(projects[projectIndex],projectIndex);
            // const projectTodos = displayProjectTodos(projects[projectIndex].getTodos());
            // board.textContent = "";
            // board.append(projectTitle,projectTodos);

        }else if(target.matches(".manager > .project > .wrapper.clicked > .delete")){
            //delete a project
            // const projectIndex = target.closest("li.project").getAttribute("projectIndex");
            // manager.deleteProject(projects[projectIndex]);
            // updateProjectList(manager,sidebar);
        }
    });

    // board.addEventListener("click", (event) => {
    //     const target = event.target;
    //     console.log(target);
    //     const projects = manager.getProjects();

    //     if(target.matches(".board > .project > .rename")){
    //         //get current project obj
    //         const header = target.closest(".project");
    //         const currentProject = projects[header.getAttribute("projectIndex")];
    //         //create input 
    //         const input = document.createElement("input");
    //         input.type = "text";
    //         input.id = "projectTitle";
    //         input.value = currentProject.getTitle();
    //         header.replaceChild(input, header.childNodes[0]);
    //         //add submit button
    //         const okButton = createButton("submit", "ok");
    //         header.replaceChild(okButton,header.childNodes[1]);
    //     }else if(target.matches(".board > .project > .submit")){
    //         //get input value
    //         const header = target.closest(".project");
    //         const projectIndex = header.getAttribute("projectIndex");
    //         const currentProject = projects[projectIndex];
    //         const input = header.childNodes[0];
    //         //ser input value
    //         currentProject.setTitle(input.value);
    //         //update the title
    //         const projectTitle = displayProjectTitle(currentProject,projectIndex);
    //         board.textContent = "";
    //         const projectTodos = displayProjectTodos(currentProject.getTodos());
    //         board.append(projectTitle,projectTodos);
    //         //update title in sidebar
    //         const currentProjectLi = sidebar.childNodes[1].childNodes[projectIndex];
    //         const title = currentProjectLi.childNodes[0].childNodes[0].childNodes[0];
    //         title.textContent = input.value;
    //     }else if(target.closest(".board > .todo-list > .todo > .wrapper > .details")){
    //         //get todos
    //         const projectIndex = board.querySelector(".project").getAttribute("projectIndex");
    //         let todos;
    //         if(projectIndex === "all"){
    //             todos = manager.getAllTodos();
    //         }else {
    //             todos = projects[projectIndex].getTodos();
    //         }
            
    //         //reset the expanded details todo
    //         const expandedTodo = document.querySelector(".board > .todo-list > .todo.expand");
    //         if(expandedTodo){
    //             expandedTodo.classList.remove("expand");
    //             const expandedTodoIndex = expandedTodo.getAttribute("todoIndex");
    //             const detail = displayTodo(todos[expandedTodoIndex]);
    //             const expandedWrapper = expandedTodo.querySelector(".wrapper");
    //             expandedWrapper.replaceChild(detail, expandedWrapper.childNodes[0]);
    //         }
    //         // add expanded detail of todo
    //         if(target.closest(".todo")){
    //             target.closest(".todo").classList.add("expand");
    //             console.log(target.closest(".todo"));
    //             const todoIndex =  target.closest(".todo").getAttribute("todoIndex");
    //             const expandedDetail = displayExpandedTodo(todos[todoIndex]);
    //             const wrapper = target.closest(".board > .todo-list > .todo.expand > .wrapper");
    //             wrapper.replaceChild(expandedDetail, wrapper.childNodes[0]);
    //         }
    //     }else if(target.matches(".board > .todo-list > .todo > .wrapper > .edit")){
    //         const projectIndex = board.querySelector(".project").getAttribute("projectIndex");
    //         let  todos = projects[projectIndex].getTodos();
    //         const todoIndex =  target.closest(".todo").getAttribute("todoIndex");
    //         const todo = todos[todoIndex];
    //         const todoList = target.closest(".todo");
    //         if(todoList){
    //             todoList.classList.add("expand");
    //         }

    //         const detailsInput = editDetailsInput(todo);
    //         todoList.replaceChild(detailsInput,todoList.childNodes[0]);
    //     }else if(target.matches(".board > .todo-list > .todo > .wrapper > .submit")){
    //         const project = board.querySelector(".project");
    //         const projectIndex = project.getAttribute("projectIndex");
    //         let  todos = projects[projectIndex].getTodos();
    //         const todoIndex =  target.closest(".todo").getAttribute("todoIndex");
    //         const todo = todos[todoIndex];

    //         const todoList = target.closest(".todo");
    //         const wrapper = todoList.childNodes[0];
    //         const details = wrapper.childNodes[0];

    //         todo.setTitle(details.childNodes[0].value);
    //         todo.setDescription(details.childNodes[1].value);
    //         todo.setDueDate(details.childNodes[2].value);
    //         todo.setPriority(details.childNodes[3].value);

    //         const expandedDetail = displayExpandedTodo(todo);
    //         wrapper.replaceChild(expandedDetail,wrapper.childNodes[0]);
    //     }
    // });

}   

const sampleManagerCreator = () => {

    const sampleManager = createManager();

    const workProject = createProject("Work");
    const choreProject = createProject("Project");

    const todo1 = createTODO("Buy Groceries","Pick up fruits, vegetables, and bread", "2024-03-02", "Medium");
    const todo2 = createTODO("Plan Vacation", "Research destinations and book accommodations", "2024-06-25", "Medium");
    const todo3 = createTODO("Complete Report", "Finish the quarterly report for the team meeting", "2024-02-15", "High");
    const todo4 = createTODO("Call Mom", "Check in with Mom and wish her a happy birthday", "2024-04-18", "Low");

    choreProject.addTodo(todo1);
    choreProject.addTodo(todo4);
    workProject.addTodo(todo2);
    workProject.addTodo(todo3);

    sampleManager.addProject(workProject);
    sampleManager.addProject(choreProject);

    return sampleManager;
}

TodoList(sampleManagerCreator());

