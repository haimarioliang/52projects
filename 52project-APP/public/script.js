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
    
    const quarters = {
        1: 'Quarter 1 (Jan - Mar)',
        14: 'Quarter 2 (Apr - Jun)',
        27: 'Quarter 3 (Jul - Sep)',
        40: 'Quarter 4 (Oct - Dec)'
    };

    projects.forEach(project => {
        if (quarters[project.week]) {
            const divider = document.createElement('div');
            divider.className = 'quarter-divider';
            divider.innerText = quarters[project.week];
            list.appendChild(divider);
        }

        const card = document.createElement('div');
        card.className = 'project-card';
        
        const dateRange = getWeekRange(project.week, new Date().getFullYear());
        const tags = project.tags ? JSON.parse(project.tags) : [];
        const tagsHtml = tags.map(tag => `<span class="tag-badge">${tag}</span>`).join('');

        card.innerHTML = `
            <div class="card-header">
                <div class="week-num">Week ${project.week}</div>
                <div class="date-range">${dateRange}</div>
            </div>
            <h3>${project.title || `Project ${project.week}`}</h3>
            <div class="tags-container">${tagsHtml}</div>
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
    const statuses = ['Not Started', 'In Progress', 'Done', 'Done (No Ship)', 'Failed'];
    const currentIndex = statuses.indexOf(project.status);
    const nextStatus = statuses[(currentIndex + 1) % statuses.length];

    try {
        const response = await fetch(`/api/projects/${project.week}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: nextStatus })
        });
        
        if (response.ok) {
            fetchProjects(); 
        }
    } catch (error) {
        console.error('Error toggling status:', error);
    }
}

let currentProject = null;

function openProjectDetails(project) {
    currentProject = project;
    const modal = document.getElementById('modal');
    const titleInput = document.getElementById('edit-title');
    const statusSelect = document.getElementById('edit-status');
    const tagsInput = document.getElementById('edit-tags');
    const descInput = document.getElementById('edit-description');
    const weekTitle = document.getElementById('modal-week-title');

    weekTitle.innerText = `Week ${project.week}`;
    titleInput.value = project.title || '';
    statusSelect.value = project.status;
    
    const tags = project.tags ? JSON.parse(project.tags) : [];
    tagsInput.value = tags.join(', ');
    
    descInput.value = project.description || '';

    modal.classList.remove('hidden');
}

async function saveProject() {
    if (!currentProject) return;

    const title = document.getElementById('edit-title').value;
    const status = document.getElementById('edit-status').value;
    const tagsRaw = document.getElementById('edit-tags').value;
    const tags = JSON.stringify(tagsRaw.split(',').map(t => t.trim()).filter(t => t !== ''));
    const description = document.getElementById('edit-description').value;

    try {
        const response = await fetch(`/api/projects/${currentProject.week}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, status, tags, description })
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
