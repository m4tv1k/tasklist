const addTaskBtn = document.getElementById('add-task-btn');
const TaskInput = document.getElementById('description-task');
const outTodoCase = document.querySelector('.out-todo-case');
let tasks;
!localStorage.tasks ? tasks = [] :tasks = JSON.parse(localStorage.getItem('tasks'));

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
                    <input class="box-ready" type="checkbox" value="READY" ${task.completed ? 'checked' : ''}>
                    <!--<button class="btn-ready" >READY</button>-->
                    <button class="btn-delete">DELETE</button>
                    
                </div>
            </div>
            <div class="mark" id="mark"></div>
        </div>            
    `
}
const fillHtmlList = () => {
    outTodoCase.innerHTML = "";
    if(tasks.length > 0) {
        tasks.forEach((item, index) => {
            outTodoCase.innerHTML += createTemplate(item, index);
        })
    }
}

fillHtmlList();

const updLocal = () =>{
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

addTaskBtn.addEventListener('click', () => {
    tasks.push(new Task(TaskInput.value));
    updLocal();
    fillHtmlList();
    TaskInput.value = '';
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