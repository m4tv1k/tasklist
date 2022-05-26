const addTaskBtn = document.getElementById('add-task-btn');
const TaskInput = document.getElementById('description-task');
const outTodoCase = document.querySelector('.out-todo-case');
let tasks;
!localStorage.tasks ? tasks = [] :tasks = JSON.parse(localStorage.getItem('tasks'));

let  todoItemElem = [];

function Task(description) {
    this.description = description;
    this.completed = false;
}
const createTemplate = (task, index) => {
    return `
        <div class="todo-list underline">
            <div class="todo-item ${task.completed ? 'checked' : ''} "> 
                <div class="description">${task.description}</div>
                <div class="item-btns">
                    <!--<input onclick="completeTask(${index})" class="box-ready" type="checkbox" value="READY" ${task.completed ? 'checked' : ''}>-->
                    <button class="btn-ready" onclick="completeTask(${index})" >
                        <span class="ready ${task.completed ? 'checked' : ''}"> READY</span>
                        <span class="unready ${task.completed ? 'checked' : ''}"> UNREADY</span>
                    </button>
                    <button class="btn-delete" onclick="deleteTask(${index})">DELETE</button>
                    
                </div>
            </div>
            <div class="mark ${task.completed ? 'checked' : ''}" id="mark"></div>
        </div>            
    `
}


function fillHtmlList() {
    outTodoCase.innerHTML = "";
    if (tasks.length > 0) {
        tasks.forEach((item, index) => {
            outTodoCase.innerHTML += createTemplate(item, index);
        });
        todoItemElem = document.querySelectorAll('.todo-item');
    }
}

fillHtmlList();

// обновление хранилища на странице
const updLocal = () =>{
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// отметка выполненной задачи
const completeTask = index => {
    tasks[index].completed = !tasks[index].completed;
    if(tasks[index].completed){
        todoItemElem[index].classList.add('checked');
    } else{
        todoItemElem[index].classList.remove('checked');
    }
    updLocal();
    fillHtmlList();
}


const completeAll = document.getElementById('ready-all');
completeAll.addEventListener('click', (tasks) => {
    tasks.completed = !tasks.completed;
    if(tasks.completed){
        todoItemElem[index].classList.add('checked');
    }
    updLocal();
    fillHtmlList();
})



// completeAll.addEventListener('click', () => {
//     tasks.completed = !tasks.completed;
//     if(tasks.completed){
//         todoItemElem[].classList.add('checked');
//     }
//     updLocal();
//     fillHtmlList();
// })

// кнопка добавления
addTaskBtn.addEventListener('click', () => {
    tasks.push(new Task(TaskInput.value));
    updLocal();
    fillHtmlList();
    TaskInput.value = '';
})

// удаление одного элемента
const deleteTask = index => {  
    todoItemElem[index].classList.add('animation')
    setTimeout(() =>{
        tasks.splice(index, 1);
        updLocal();
        fillHtmlList();
    },500)
}


// удаление всего списка
const deleteAllBtn = document.getElementById('remove-all');

deleteAllBtn.addEventListener("click", () =>{
    tasks.splice(0, tasks.length);
    // localStorage.setItem("tasks", JSON.stringify(tasks));
    updLocal();
    fillHtmlList();
})


// типы кнопок
// <button class="btn-ready" >READY</button>
//  <input class="box-ready" type="checkbox" value="READY" ${task.completed ? 'checked' : ''}>
//  <input class="btn-ready" type="submit" value="READY"> 


// var readyBtn = document.getElementById('btn-ready');
// readyBtn.onclick = function(){
//     document.mark.classList.toggle('swap');
// }

// $('.btn-ready').on('click', function(){
//     $('.mark').toggleClass('swap');
// })