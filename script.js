const ALL_TASKS = [
    {id: 1, name: "Finalize IMS566 Documentation", status:"Pending", due: "2025-05-18", category: "Project"},
    {id: 2, name: "Integrate Chart.js on Dashboard", status: "Pending", due: "2025-05-17", category: "Technical"},
    {id: 3, name: "Review Notes for next subject", status: "Completed", due: "2025-05-15", category: "Academic"},
    {id: 4, name: "Test Mobile Responsiveness", status: "Pending", due: "2025-05-17", category: "Technical"},
    {id: 5, name: "Commit project to Github", status: "Completed", due: "2025-05-10", category: "Project"},
    {id: 6, name: "Grocery Shopping", status: "Completed", due: "2025-05-11", category: "Personal" },

    ];

    //---Dashboard Logic
    function updateDashboardCounts(){
        const total = ALL_TASKS. length;
        const completed = ALL_TASKS.filter(t => t.status === "Completed").length;
        const pending = total - completed;

        //If we have the dashboard elements previously: 
        if (document.getElementById('total-tasks-count')) {
            document.getElementById('total-tasks-count').textContent = total;
            document.getElementById('completed-tasks-count').textContent = completed;
            document.getElementById('pending-tasks-count').textContent = pending;
        }

        //Returning counts that are needed for our chart
        return { completed, pending};
    }

    function renderTaskStatusChart() {
        const counts = updateDashboardCounts();

        const ctx = document.getElementById('taskStatusChart');
        if (!ctx) return;

        new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: ['Completed Tasks', 'Pending Tasks'],
            datasets: [{
                label:'# of Tasks',
                data: [counts.completed, counts.pending],
                backgroundColor:[
                    'rgba(49, 179, 49, 0.9)' ,// for Completed
                    'rgba(223, 23, 23, 0.9)' // for Pending
                ],
                hoverOffset:5
            }]
          },
          options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title:{
                    display: true,
                    text: 'Current Task Status Breakdown'
                }
            }
        }  
    });
}

function renderTasksTable(tasks, tableBodyId) {
    const tableBody = document.getElementById(tableBodyId);
    if (!tableBody) return;

    tableBody.innerHTML = '';

    tasks.forEach(task => {
        const row = tableBody.insertRow();

        let statusclass = 'bg-secondary';
        if (task.status === 'Completed') {
            statusClass = 'bg-success';
        } else  if (task.status === 'Pending') {
            statusClass = 'bg-warning text-dark';
        }

        row.innerHTML = `
            <th scope="row">${task.id}</th>
            <td>${task.name}</td>
            <td><span class="badge ${task.status}">${task.status}</span></td>
            <td>${task.due}</td>
        `;
    });
}
    
document.addEventListener('DOMContentLoaded',() => {
    
    const LoginForm = document.getElementById('login-form');
    const LoginAlert = document.getElementById('login-alert');
    const usernameInput = document.getElementById('username');
    const PasswordInput = document.getElementById('password');

    const VALID_USERNAME = 'student';
    const VALID_PASSWORD = 'abcde';

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();

            if (username === VALID_USERNAME && password === VALID_PASSWORD) {
                // SUCCESS: Redirect to Dashboard}
                window.location.href = 'dashboard.html';
            } else {
                // FAILURE: Show clear error feedback
                LoginAlert.classList.remove('d-none');
                setTimeout(() => {
                    LoginAlert.classList.add('d-none');
                }, 3000);
            }
        });
    }
    if (document.getElementById('taskStatusChart')) {
        updateDashboardCounts();
        renderTaskStatusChart();
    }
});


