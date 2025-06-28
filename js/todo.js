const tasks = [];
document.addEventListener("DOMContentLoaded",()=>{
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if(storedTasks){
        storedTasks.forEach(task => {tasks.push(task)});
        updateTaskList();
        updateStats();
    }
})


const saveTasks = ()=>{
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
const addTasks = ()=>{
    let task = document.getElementById("todo-input").value.trim();

    if(task){
        tasks.push({text:task,completed:false}); 
        updateTaskList();
        document.getElementById("todo-input").value = ""; 
    }
    else {
        console.log("Task input is empty, not adding.");
    }
    updateStats();
    saveTasks();
}
function editTask(index){
    let newTask =tasks[index].text;
    tasks.splice(index, 1);
    let input = document.getElementById("todo-input");
    input.value = newTask;
    updateTaskList();
    saveTasks();
}

function removeTask(index){
    tasks.splice(index, 1);
    updateTaskList();
    updateStats();
    saveTasks();
}
function toggleTaskCompletion(index){
    tasks[index].completed =!tasks[index].completed;
    updateTaskList();
    updateStats();
    saveTasks();
}
function updateStats(){
    let completedTasks = tasks.filter(task=>task.completed).length;
    if(completedTasks==0){
        document.getElementById("progressBar").style.width = "0%";
    }
    let totalTasks = tasks.length;
    let progrs = (completedTasks/totalTasks)*100;
    let progress_bar = document.getElementById("progressBar");
    progress_bar.style.width = `${progrs}%`;
    document.getElementById("numbers").innerText = `${completedTasks}/${totalTasks}`;

    if(tasks.length && completedTasks==totalTasks){
        blaskConfetti();
    }
}
function updateTaskList(){
    let tasksList = document.getElementById("todo-list");
    tasksList.innerHTML = ``;
    
    tasks.forEach((task,index)=>{
        let taskItem = document.createElement("li");
        taskItem.innerHTML = `
        <div class="task-item">
            <div class="task ${task.completed ? 'completed' : ''}">
                <input type="checkbox" class="task-checkbox" ${task.completed ? "checked" : ""} />
                <p>${task.text}</p>
            </div>    
            <div class="task-icons">
                <img src="/assets/edit.png" alt="Edit Task" onclick="editTask(${index})"/>
                <img src="/assets/delete.png" alt="Delete Task" onclick="removeTask(${index})"/>
            </div> 
        </div>`;
    
            taskItem.addEventListener('change',()=>{toggleTaskCompletion(index)});
            tasksList.appendChild(taskItem);
        });
}
document.getElementById("clear-all").addEventListener("click",(e)=>{
    e.preventDefault();
    tasks.length = 0;
    updateTaskList();
    updateStats();
    saveTasks();
})
document.getElementById("todo-form").addEventListener("submit", function(e){
    e.preventDefault();
    addTasks();
}); 

const blaskConfetti = ()=>{
    const count = 200,
    defaults = {
        origin: { y: 0.7 },
    };

    function fire(particleRatio, opts) {
    confetti(
        Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio),
        })
    );
    }

    fire(0.25, {
    spread: 26,
    startVelocity: 55,
    });

    fire(0.2, {
    spread: 60,
    });

    fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
    });

    fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
    });

    fire(0.1, {
    spread: 120,
    startVelocity: 45,
    });
}
