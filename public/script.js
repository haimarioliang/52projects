async function fetchProjects() {
    try {
        const response = await fetch('/api/projects');
        const projects = await response.json();
        renderProjects(projects);
        updateOverallProgress(projects);
    } catch (error) {
        console.error('Error fetching projects:', error);
    }
}

function renderProjects(projects) {
    const list = document.getElementById('project-list');
    list.innerHTML = '';
    
    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <div class="week-num">Week ${project.week}</div>
            <h3>${project.title || `Project ${project.week}`}</h3>
            <div class="status-badge status-${project.status.toLowerCase().replace(/ /g, '-')}">${project.status}</div>
        `;
        
        const badge = card.querySelector('.status-badge');
        badge.onclick = (e) => {
            e.stopPropagation();
            toggleStatus(project);
        };

        card.onclick = () => openProjectDetails(project);
        list.appendChild(card);
    });
}

async function toggleStatus(project) {
    const statuses = ['Not Started', 'In Progress', 'Done'];
    const currentIndex = statuses.indexOf(project.status);
    const nextStatus = statuses[(currentIndex + 1) % statuses.length];

    try {
        const response = await fetch(`/api/projects/${project.week}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: nextStatus })
        });
        
        if (response.ok) {
            const updatedProject = await response.json();
            // Find and update the project in the local list or just refetch
            fetchProjects(); 
        }
    } catch (error) {
        console.error('Error toggling status:', error);
    }
}

function updateOverallProgress(projects) {
    const doneCount = projects.filter(p => p.status === 'Done').length;
    const progressPercent = (doneCount / 52) * 100;
    
    document.getElementById('progress-bar').style.width = `${progressPercent}%`;
    document.getElementById('progress-text').innerText = `${doneCount}/52 completed`;
}

function openProjectDetails(project) {
    // Placeholder for next phase
    console.log('Opening details for:', project);
    alert(`Project: ${project.title}\nStatus: ${project.status}`);
}

// Initial fetch
document.addEventListener('DOMContentLoaded', fetchProjects);
