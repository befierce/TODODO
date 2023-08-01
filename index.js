var form = document.getElementById("todoform");
form.addEventListener('submit', submitDetails);

function submitDetails(e) {
    e.preventDefault();
    var task = document.getElementById('Todotask').value;
    var details = document.getElementById('Details').value;

    var dataOfTodo = {
        task: task,
        details: details
    };

    axios.post("https://crudcrud.com/api/b196a8de9016465985029dd78a5e236d/todoData", dataOfTodo)
        .then((response) => {
            console.log(response);
            displayData(response.data);
        })
        .catch(err => console.log(err));
}

function deletetodo(event) {
    var li = event.target.parentElement;
    var ID = li.getAttribute('list-item-id');

    // Making axios request to delete details from server
    axios.delete(`https://crudcrud.com/api/b196a8de9016465985029dd78a5e236d/todoData/${ID}`)
        .then(() => {
            li.remove();
        })
        .catch((error) => {
            console.log(error);
        });
}

function displayData(object) {
    var li = document.createElement('li');
    li.className = 'list-item';
    
    var task = object.task;
    var details = object.details;
    var id = object._id;

    
    li.setAttribute('list-item-id', id);

    li.appendChild(document.createTextNode(task));
    li.appendChild(document.createElement('br'));
    li.appendChild(document.createTextNode(details));

    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'remove';
    deleteButton.addEventListener('click', deletetodo);
    li.appendChild(deleteButton);

    var List = document.getElementById('tasks');
    List.appendChild(li);
}
