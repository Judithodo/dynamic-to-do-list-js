// document.addEventListener("DOMContentLoaded", function() {
  
//     const addButton = document.getElementById("add-task-btn"); 
//     const taskInput = document.getElementById("task-input"); 
//     const taskList = document.getElementById("task-list"); 

    
//     function addTask() {
//         const taskText = taskInput.value.trim();

//         if (taskText === "") {
        
//             alert("Please enter a task.");
//             return; 
//         }

      
//         const taskItem = document.createElement("li");

      
//         taskItem.textContent = taskText;

  
//         const removeButton = document.createElement("button");
//         removeButton.textContent = "Remove";
//         removeButton.classList.add("remove-btn");

       
//         removeButton.onclick = function() {
//             taskList.removeChild(taskItem); 
//         };

        
//         taskItem.appendChild(removeButton);

       
//         taskList.appendChild(taskItem);

//         taskInput.value = "";
//     }

 
//     addButton.addEventListener("click", addTask);

  
//     taskInput.addEventListener("keypress", function(event) {
//         if (event.key === "Enter") {
//             addTask(); 
//         }
//     });
// });


document.addEventListener("DOMContentLoaded", function() {
    // Select DOM Elements
    const addButton = document.getElementById("add-task"); // "Add Task" button
    const taskInput = document.getElementById("task-input"); // Input field for task
    const taskList = document.getElementById("task-list"); // Unordered list to display tasks

    // Initialize tasks array
    let tasks = [];

    // Load tasks from Local Storage if available
    function loadTasks() {
        const storedTasks = localStorage.getItem("tasks"); // Get tasks from Local Storage
        if (storedTasks) {
            tasks = JSON.parse(storedTasks); // Parse JSON into array
            tasks.forEach(task => createTaskElement(task)); // Create task elements in DOM
        }
    }

    // Create a task element and append it to the task list
    function createTaskElement(taskText) {
        const taskItem = document.createElement("li");
        taskItem.textContent = taskText;

        // Create a remove button for this task
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove"; // Set button text
        removeButton.classList.add("remove-btn"); // Add a class for styling

        // Assign an onclick event to the remove button
        removeButton.onclick = function() {
            removeTask(taskText, taskItem); // Remove the task from tasks array and DOM
        };

        // Append the remove button to the task <li>
        taskItem.appendChild(removeButton);

        // Append the task <li> to the task list
        taskList.appendChild(taskItem);
    }

    // Function to add a task
    function addTask() {
        const taskText = taskInput.value.trim(); // Get and trim the input value

        if (taskText === "") {
            // If taskText is empty, alert the user to enter a task
            alert("Please enter a task.");
            return; // Exit the function early
        }

        // Add the new task to the tasks array
        tasks.push(taskText);

        // Create the task element and append it to the DOM
        createTaskElement(taskText);

        // Clear the input field
        taskInput.value = "";

        // Save the updated tasks array to Local Storage
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Function to remove a task
    function removeTask(taskText, taskItem) {
        // Remove the task from the tasks array
        tasks = tasks.filter(task => task !== taskText);

        // Remove the task from the DOM
        taskList.removeChild(taskItem);

        // Update Local Storage with the new tasks array
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Add event listener to the "Add Task" button
    addButton.addEventListener("click", addTask);

    // Optionally, add functionality to press Enter to add a task
    taskInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            addTask(); // Trigger addTask when Enter is pressed
        }
    });

    // Load tasks from Local Storage when the page loads
    loadTasks();
});
