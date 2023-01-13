const todoForm = document.querySelector('#todo-form');
let todoList = [];
const todoWrapper = document.querySelector('#todo-wrapper');
const cancelButton = document.querySelector('.cancel-btn');
const titleInput = document.querySelector('#title');
const descriptionInput = document.querySelector('#description');
const today = new Date();

// daje dataid svakom elementu
function idGen(){
    const idArray = todoList.map(todoObject => todoObject.id);
    let newId;
    if (idArray.length===0) {
            newId=1;
    } else {
            newId=Math.max(...idArray)+1;
    }
    return newId;
}

todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const priorityInput = document.querySelector('input[name="priority"]:checked');

    if (titleInput.value.length === 0 || descriptionInput.value.length === 0 || document.querySelectorAll('input[name="priority"]:checked').length === 0) {
        alert("Please write a title, description and choose priority");
        return;
        } else {
            const todoItem = document.createElement('div');
            const uniqueID = idGen();
            
            const todo = {
                title: titleInput.value,
                description: descriptionInput.value,
                date: today.getDate() + '.' + today.getMonth() + 1 + '.' + today.getUTCFullYear(),
                priority: priorityInput.value,
                id: uniqueID
            };
            
            const todol = `
                <p class="date">Created: ${todo.date}</p>
                <h3 class="title">${todo.title}</h3>
                <p class="description">${todo.description}</p>
                <button class="delete-btn"><img class="delete-img" src="images/.png" alt=""></button>
                <input class="chkbx" type="checkbox">
            `;
            
            todoItem.dataset.id = uniqueID;
            todoItem.classList.add("todo-item", todo.priority);
            todoItem.innerHTML = todol;
            todoWrapper.prepend(todoItem);
            
            todoList.push(todo);
            console.log(todoList);
        }
    titleInput.value = "";
    descriptionInput.value = "";
    priorityInput.checked = false;
});

cancelButton.addEventListener('click', (e) => {
    e.preventDefault();
    titleInput.value = "";
    descriptionInput.value = "";
    document.querySelector('input[name="priority"]:checked').checked = false;
});


// event delegation

// briše element sa određenim dataid iz arraya i iz DOM-a
document.addEventListener('click', (e) => {
    const clickedElement = e.target.closest('.todo-item');

    if (e.target.className == "delete-img") {
        const todoItemId = clickedElement.dataset.id;

        todoList = todoList.filter(todoItem => todoItem.id != todoItemId);

        clickedElement.remove();
        console.log(todoList);
    }
})

// postavlja text decoration kad se klikne na completed button
document.addEventListener('change', (e) => {
    if(e.target.type === 'checkbox') {
        const referentTodoId = e.target.closest('.todo-item').dataset.id;
        const referentTodoItem = document.querySelector(`[data-id='${referentTodoId}']`);

        // stylize done todo
        if(e.target.checked === true) {
            referentTodoItem.classList.add('todo-done');
        }
        else {
            referentTodoItem.classList.remove('todo-done');
        }

        // change property value in todo array
        todoList = todoList.map((todoItem) => {
            if(todoItem.id == referentTodoId) {
                return {...todoItem, isDone: e.target.checked}
            }

            return todoItem;
        })
    }
})

