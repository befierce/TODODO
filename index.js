window.addEventListener("DOMContentLoaded", () => {
    fetchToDoData();
});


var form = document.getElementById("todoform");
form.addEventListener('submit', submitData);

function submitData(e){
    e.preventDefault();
    var taskk = document.getElementById('Todotask').value;
    var detail = document.getElementById('Details').value;
    var objData = {
        taskk: taskk,
        detail: detail
    };
    axios
    .post("https://crudcrud.com/api/546b62827fc6435190a56f00a1af4844/TodoData",objData)
    .then((response)=>{
       // console.log(response.data);
        displayData(response.data);
    })
    .catch((error)=>{
        console.log(error);
    })
form.reset();
}

function deleteToDo(e){
    var li = e.target.parentElement;
    var ID = li.getAttribute('data-user-id');
    //console.log(ID);
    axios.delete(`https://crudcrud.com/api/546b62827fc6435190a56f00a1af4844/TodoData/${ID}`)
       .then(()=>{
            li.remove();
        })
        .catch((error) => {
            console.log(error);
        })
}
    
    
function displayData(objct){
    //console.log(objct)
    var li = document.createElement('li');
    li.className = 'list-group-item';
    var task= objct.taskk;
    var detail= objct.detail;
    var taskID= objct._id;

    li.setAttribute('data-user-id', taskID);

    var liname = document.createTextNode(task)
    li.appendChild(liname);
    li.appendChild(document.createElement('br'));
    li.appendChild(document.createTextNode(detail));

    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'delete';
    deleteButton.addEventListener('click',deleteToDo);
    li.appendChild(deleteButton);

    var userList = document.getElementById('tasks');
    userList.appendChild(li);
}  

function fetchToDoData() {
    axios.get("https://crudcrud.com/api/546b62827fc6435190a56f00a1af4844/TodoData")
        .then((response) => {
            for (var i = 0; i < response.data.length; i++) {
                displayData(response.data[i]);
            }
        })
        .catch((error) => {
            console.log(error);
        });
}