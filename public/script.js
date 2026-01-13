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
        card.onclick = () => openProjectDetails(project);
        list.appendChild(card);
    });
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
