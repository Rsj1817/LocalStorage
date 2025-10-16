const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function render() {
    taskList.innerHTML = tasks.map((task, i) => `
        <li class="${task.completed ? 'completed' : ''}" data-index="${i}">
            ${task.text}
            <button onclick="deleteTask(${i})">Eliminar</button>
        </li>`
    ).join('');
    
    document.querySelectorAll('li').forEach(li => {
        li.onclick = (e) => {
            if (e.target.tagName !== 'BUTTON') {
                const i = li.dataset.index;
                tasks[i].completed = !tasks[i].completed;
                save();
                render();
            }
        };
    });
}

function save() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
    const text = taskInput.value.trim();
    if (text) {
        tasks.push({ text, completed: false });
        taskInput.value = '';
        save();
        render();
    }
}

function deleteTask(i) {
    tasks.splice(i, 1);
    save();
    render();
}

document.getElementById('addTask').onclick = addTask;
taskInput.onkeypress = e => e.key === 'Enter' && addTask();
render();