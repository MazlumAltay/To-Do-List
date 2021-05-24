//Elementler seçildi
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();

function eventListeners(){ //Tüm eventleri listeler
     form.addEventListener("submit",addTodo);

     document.addEventListener("DOMContentLoaded",loadAllTodosToUI);

     secondCardBody.addEventListener("click",deleteTodo);

     clearButton.addEventListener("click",clearAllTodos);

}

function clearAllTodos(e){
    
    if(confirm("Tümünü silmek istediğinize emin misiniz ?")){
        //arayüzden todoları temizlemet
        //todoList.innerHTML = ""; //yavaş

        while(todoList.firstElementChild != null){
            todoList.removeChild(todoList.firstElementChild);
        }
        localStorage.removeItem("todos");

    }


}

function deleteTodo(e){
    if(e.target.className === "fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);

        showAlert("succsess","Todo başarıyla silindi...");
    }



}

function deleteTodoFromStorage(deletetodo){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo,index){
        if(todo === deletetodo){
            todos.splice(index,1); //Arraydan değeri silebiliriz.
        }
    });

    localStorage.setItem("todos",JSON.stringify(todos));
}

function loadAllTodosToUI(){

    let todos = getTodosFromStorage();

    todos.forEach(function(todo){
        addTodoToUI(todo);
    })

}

function addTodo(e){
    const newTodo = todoInput.value.trim(); //"trim" textlerde başta ve sonda bırakılan başlıkları engeller.


    if(newTodo === ""){       
        showAlert("danger","lütfen bir todo giriniz...");
    }
    else{
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);

        showAlert("success","Todo başarıyla eklendi...")
    }
    


    e.preventDefault();
}

function getTodosFromStorage(){  //Storageden Todoları alma
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;

}

function addTodoToStorage(newTodo){
    let todos = getTodosFromStorage();

    todos.push(newTodo);

    localStorage.setItem("todos",JSON.stringify(todos));

}

function showAlert(type,message){
    const alert = document.createElement("div");

    alert.className = `alert alert-${type}`;

    alert.textContent = message;

    firstCardBody.appendChild(alert);

    //setTimeOut

    setTimeout(function(){
        alert.remove();
    },1000);




}

function addTodoToUI(newTodo){//string dedğerini list item olarak UI'ya ekleyecek
    /*
    <li class="list-group-item d-flex justify-content-between">
                            Todo 1
                            <a href = "#" class ="delete-item">
                                <i class = "fa fa-remove"></i>
                            </a>

                        </li>
                        */
    //List Item oluşturma                   
    const listItem = document.createElement("li");
    // Link oluşturma
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class = 'fa fa-remove'></i>"
    
    listItem.className = "list-group-item d-flex justify-content-between";

    //Text Node Ekleme

    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    //Todo List'e List Item'ı ekleme

    todoList.appendChild(listItem);
    todoInput.value = "";
}