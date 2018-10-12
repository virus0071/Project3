$(document).ready(function () {
    var taskList = $(".taskList")
    var todos
    showTask();
    $('#new-task-form').on("click", "#addTasks", function () {
        event.preventDefault();
        var todo = $("#new-task").val().trim();
        saveTask({
            task: todo
        });
    })
    $(document).on("click", "button.delete", deleteItem);
    $(document).on("click", "button.check", deleteItem);;


    function saveTask(task) {
        $.post("/api/todos", task)
            .then(function () {
                showTask()
            });
    }

    function showTask() {
        $.get("/api/todos", function (data) {
            var task = [];
            todos = data;
            for (var i = 0; i < data.length; i++) {
                task.push(displayTask(todos[i]));
            }
            taskList.append(task);
        })
    }

    function displayTask(input) {
        taskList.empty();
        var newItem = $("<div>");
        newItem.addClass("card");
        var newBtns = $("<div>");
        newBtns.addClass("card-header");
        var deleteBtn = $("<button>");
        deleteBtn.text("x");
        deleteBtn.addClass("delete btn btn-danger");
        var completeBtn = $("<button>");
        completeBtn.text("✓");
        completeBtn.addClass("check btn btn-info");
        var newTask = $("<div>");
        newTask.addClass("card-body");
        var newPostBody = $("<h3>");
        newPostBody.text(input.task);
        newBtns.append(deleteBtn);
        newBtns.append(completeBtn);
        newBtns.css({
            float: "right"
        })
        newTask.append(newPostBody);
        newItem.append(newBtns);
        newItem.append(newTask);
        newItem.data("task", input);
        return newItem;
    }

    function deleteTask(id) {
        $.ajax({
          method: "DELETE",
          url: "/api/todos/" + id
        })
          .then(function() {
            showTask(taskList.val());
          });
      }
    

    function deleteItem() {
        var task = $(this).parent().parent().data("task");
        deleteTask(task.id);
      }

    //   function completeItem(task) {
    //     $.ajax({
    //         method: "PUT",
    //         url: "/api/todos",
    //         data: task
    //       }).then(showTask);      
    //   }

    //   function completion(){
    //     var updateTask = $(this).parent().parent().data("task");
    //     updateTask.completion = !updateTask.completion;
    //     completeItem(updateTask);
    //   }
    
});