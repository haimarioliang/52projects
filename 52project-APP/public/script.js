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
    const statuses = ['Not Started', 'In Progress', 'Done', 'Failed', 'Skipped'];
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

function updateOverallProgress(projects) {
    const completedCount = projects.filter(p => 
        ['Done', 'Failed', 'Skipped'].includes(p.status)
    ).length;
    
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    
    if (progressText) {
        progressText.innerText = `${completedCount}/52 completed`;
    }

    if (progressBar) {
        const percentage = (completedCount / 52) * 100;
        progressBar.style.width = `${percentage}%`;
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

async function fetchStats() {
    try {
        const response = await fetch('/api/projects');
        const projects = await response.json();
        renderStats(projects);
        updateOverallProgress(projects);
    } catch (error) {
        console.error('Error fetching stats:', error);
    }
}

function renderStats(projects) {
    const grid = document.getElementById('stats-grid');
    if (!grid) return;
    grid.innerHTML = '';
    
    projects.forEach((project, index) => {
        // Inject Q label at start of each row (every 13 items)
        if (index % 13 === 0) {
            const label = document.createElement('div');
            label.className = 'quarter-label';
            label.innerText = `Q${Math.floor(index / 13) + 1}`;
            grid.appendChild(label);
        }

        const dot = document.createElement('div');
        dot.className = `dot status-${project.status.toLowerCase().replace(/ /g, '-')}`;
        dot.title = `Week ${project.week}: ${project.status}${project.title ? ` - ${project.title}` : ''}`;
        grid.appendChild(dot);
    });
}

function closeModal() {
    const modal = document.getElementById('modal');
    if (modal) modal.classList.add('hidden');
    currentProject = null;
}

function toggleMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const navOverlay = document.getElementById('nav-overlay');
    if (!menuToggle || !navOverlay) return;

    menuToggle.classList.toggle('open');
    navOverlay.classList.toggle('hidden');
    
    if (menuToggle.classList.contains('open')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

let lastSavedContent = '';
let isSaving = false;

async function fetchGlobalNotes() {
    try {
        const response = await fetch('/api/global-notes');
        const data = await response.json();
        const textarea = document.getElementById('global-notes-area');
        if (textarea) {
            textarea.value = data.content || '';
            lastSavedContent = textarea.value;
        }
    } catch (error) {
        console.error('Error fetching global notes:', error);
    }
}

let saveTimeout = null;
async function saveGlobalNotes() {
    const textarea = document.getElementById('global-notes-area');
    if (!textarea || isSaving) return;
    const content = textarea.value;
    
    // Prevent redundant saves if content hasn't changed
    if (content === lastSavedContent) return;

    isSaving = true;
    const saveStatus = document.getElementById('save-status');
    if (saveStatus) saveStatus.innerText = 'Saving...';

    try {
        const response = await fetch('/api/global-notes', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content })
        });
        
        if (response.ok) {
            lastSavedContent = content;
            if (saveStatus) {
                saveStatus.innerText = 'Saved.';
                setTimeout(() => {
                    if (saveStatus.innerText === 'Saved.') saveStatus.innerText = '';
                }, 2000);
            }
        }
    } catch (error) {
        console.error('Error saving global notes:', error);
        if (saveStatus) saveStatus.innerText = 'Error saving.';
    } finally {
        isSaving = false;
        // Check if content changed while we were saving
        if (textarea.value !== lastSavedContent) {
            handleGlobalNotesInput();
        }
    }
}

function handleGlobalNotesInput() {
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(saveGlobalNotes, 1000);
}

function openGlobalNotes() {
    const modal = document.getElementById('global-notes-modal');
    if (modal) {
        fetchGlobalNotes();
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function closeGlobalNotes() {
    const modal = document.getElementById('global-notes-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

// Initial fetch
document.addEventListener('DOMContentLoaded', () => {
    const isStatsPage = !!document.getElementById('stats-grid');
    
    // Hamburger Menu Logic
    const menuToggle = document.getElementById('menu-toggle');
    if (menuToggle) menuToggle.onclick = toggleMenu;

    // Global Notes Logic
    const openNotesBtn = document.getElementById('open-dumb-ideas');
    if (openNotesBtn) openNotesBtn.onclick = (e) => {
        e.preventDefault();
        toggleMenu(); // Close menu
        openGlobalNotes();
    };

    const closeNotesBtn = document.getElementById('close-global-notes');
    if (closeNotesBtn) closeNotesBtn.onclick = closeGlobalNotes;

    const notesArea = document.getElementById('global-notes-area');
    if (notesArea) notesArea.oninput = handleGlobalNotesInput;

    if (isStatsPage) {
        fetchStats();
    } else {
        fetchProjects();

        const closeBtn = document.querySelector('.close-btn');
        if (closeBtn) closeBtn.onclick = closeModal;
        
        const saveBtn = document.getElementById('save-project');
        if (saveBtn) saveBtn.onclick = saveProject;
        
        window.onclick = (event) => {
            const modal = document.getElementById('modal');
            const navOverlay = document.getElementById('nav-overlay');
            const globalNotesModal = document.getElementById('global-notes-modal');
            if (event.target === modal) {
                closeModal();
            }
            if (event.target === navOverlay) {
                toggleMenu();
            }
            if (event.target === globalNotesModal) {
                closeGlobalNotes();
            }
        };
    }
});
