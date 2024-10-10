document.addEventListener('DOMContentLoaded', () => {
    let dragSrcEl = null;

    // Load saved tasks from localStorage
    function loadTasks() {
        const projectColumns = document.querySelectorAll('.project-column');
        projectColumns.forEach((column, index) => {
            const savedTasks = JSON.parse(localStorage.getItem(column-${index}));
            if (savedTasks) {
                const taskContainer = column.querySelector('.task-container');
                taskContainer.innerHTML = ''; // Clear existing tasks
                savedTasks.forEach(taskHtml => {
                    const taskElement = document.createElement('div');
                    taskElement.classList.add('task');
                    taskElement.setAttribute('draggable', 'true');
                    taskElement.innerHTML = taskHtml;
                    taskContainer.appendChild(taskElement);
                });
            }
        });
        addDragAndDropListeners(); // Reapply listeners after loading tasks
    }

    // Save current tasks to localStorage
    function saveTasks() {
        const projectColumns = document.querySelectorAll('.project-column');
        projectColumns.forEach((column, index) => {
            const tasks = column.querySelectorAll('.task-container .task');
            const taskData = Array.from(tasks).map(task => task.innerHTML);
            localStorage.setItem(column-${index}, JSON.stringify(taskData));
        });
    }

    function handleDragStart(e) {
        dragSrcEl = this;
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.outerHTML);
        this.classList.add('dragging');
    }

    function handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        return false;
    }

    function handleDrop(e) {
        e.preventDefault();
        if (dragSrcEl !== this) {
            dragSrcEl.parentNode.removeChild(dragSrcEl);
            const dropZone = this.querySelector('.task-container');
            const droppedTaskHtml = e.dataTransfer.getData('text/html');
            dropZone.insertAdjacentHTML('beforeend', droppedTaskHtml);
            saveTasks();
            addDragAndDropListeners(); // Reapply listeners to new tasks
        }
        return false;
    }

    function handleDragEnd() {
        this.classList.remove('dragging');
    }

    // Attach event listeners to tasks and columns
    function addDragAndDropListeners() {
        const tasks = document.querySelectorAll('.task');
        tasks.forEach(task => {
            task.addEventListener('dragstart', handleDragStart, false);
            task.addEventListener('dragend', handleDragEnd, false);
        });

        const columns = document.querySelectorAll('.project-column');
        columns.forEach(column => {
            column.addEventListener('dragover', handleDragOver, false);
            column.addEventListener('drop', handleDrop, false);
        });
    }

    loadTasks(); // Load tasks when the page loads
    addDragAndDropListeners(); // Add listeners to all tasks and columns
});