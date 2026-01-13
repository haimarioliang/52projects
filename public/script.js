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

let currentProject = null;

function openProjectDetails(project) {
    currentProject = project;
    const modal = document.getElementById('modal');
    const titleInput = document.getElementById('edit-title');
    const descInput = document.getElementById('edit-description');
    const weekTitle = document.getElementById('modal-week-title');

    weekTitle.innerText = `Week ${project.week}`;
    titleInput.value = project.title || '';
    descInput.value = project.description || '';

    modal.classList.remove('hidden');
}

async function saveProject() {
    if (!currentProject) return;

    const title = document.getElementById('edit-title').value;
    const description = document.getElementById('edit-description').value;

    try {
        const response = await fetch(`/api/projects/${currentProject.week}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description })
        });
        
        if (response.ok) {
            closeModal();
            fetchProjects(); 
        }
    } catch (error) {
        console.error('Error saving project:', error);
    }
}

function closeModal() {
    document.getElementById('modal').classList.add('hidden');
    currentProject = null;
}

// Initial fetch
document.addEventListener('DOMContentLoaded', () => {
    fetchProjects();

    document.querySelector('.close-btn').onclick = closeModal;
    document.getElementById('save-project').onclick = saveProject;
    
    window.onclick = (event) => {
        const modal = document.getElementById('modal');
        if (event.target === modal) {
            closeModal();
        }
    };
});
