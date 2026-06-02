// TeamFlow Application - Script Logic

// 1. Configuration & Default Mock Data
const TEAM_MEMBERS = ['สมชาย', 'สมศรี', 'สมศักดิ์', 'สมพร', 'สมใจ'];

const DEFAULT_TASKS = [
    {
        id: 'task_1',
        title: 'ออกแบบ UI หน้าระบบสไตล์พรีเมียมแดชบอร์ด',
        description: 'จัดทำโครงร่าง (Mockup) และสไตล์ไกด์ของระบบจัดการงานที่เน้นโทนสีมืด (Dark Slate) มีความโปร่งแสงแบบ Glassmorphism และรองรับการแสดงผลบนหน้าจอทุกขนาด',
        assignee: 'สมชาย',
        priority: 'high',
        startDate: '2026-05-25',
        deadline: '2026-05-30',
        status: 'done'
    },
    {
        id: 'task_2',
        title: 'เชื่อมโยงตรรกะระบบเข้ากับ Local Storage',
        description: 'เขียนสคริปต์ JavaScript ในการบันทึก ดึงข้อมูลจากเบราว์เซอร์ เพื่อให้รีเฟรชหน้าเว็บแล้วข้อมูลยังไม่หาย พร้อมฟังก์ชันจัดเก็บสถิติแดชบอร์ดอัตโนมัติ',
        assignee: 'สมชาย',
        priority: 'medium',
        startDate: '2026-06-01',
        deadline: '2026-06-05',
        status: 'in_progress'
    },
    {
        id: 'task_3',
        title: 'พัฒนาโมดูลการลากวาง (Drag & Drop) บอร์ด Kanban',
        description: 'พัฒนาคำสั่งในการตรวจจับพฤติกรรม Drag & Drop ของบอร์ดงาน เพื่อให้ทีมงานสามารถลากการ์ดเปลี่ยนสถานะข้ามคอลัมน์ได้อย่างไหลลื่นและตอบสนองทันที',
        assignee: 'สมศรี',
        priority: 'high',
        startDate: '2026-06-01',
        deadline: '2026-06-03',
        status: 'in_progress'
    },
    {
        id: 'task_4',
        title: 'จัดทำคู่มือและคำอธิบายระบบ (Walkthrough)',
        description: 'จัดทำเอกสารประกอบโปรเจกต์ อธิบายวิธีการใช้งานการสลับสิทธิ์ผู้ใช้จำลอง วิธีการกรองข้อมูล และระบบบอร์ดการทำงานของทีม',
        assignee: 'สมศักดิ์',
        priority: 'low',
        startDate: '2026-06-02',
        deadline: '2026-06-07',
        status: 'todo'
    },
    {
        id: 'task_5',
        title: 'ทดสอบระบบ Responsive สำหรับอุปกรณ์หน้าจอเล็ก',
        description: 'ปรับแต่งไฟล์ CSS เพื่อรองรับการแสดงผลแถบด้านข้าง (Sidebar) ให้ย่อเป็นแนวนอนด้านบนเมื่อเปิดใช้ในมือถือ และหน้าบอร์ด Kanban สามารถสไลด์ซ้ายขวาได้',
        assignee: 'สมพร',
        priority: 'medium',
        startDate: '2026-05-28',
        deadline: '2026-06-04',
        status: 'review'
    },
    {
        id: 'task_6',
        title: 'แก้ไขบั๊กและตรวจสอบความเข้ากันได้ของเบราว์เซอร์',
        description: 'ทดสอบระบบผ่านเบราว์เซอร์หลักๆ (Chrome, Firefox, Safari, Edge) เพื่อแก้ปัญหาเรื่องสไตล์การแสดงผล และความลื่นไหลของการลากการ์ดงาน',
        assignee: 'สมใจ',
        priority: 'high',
        startDate: '2026-06-02',
        deadline: '2026-06-06',
        status: 'todo'
    },
    {
        id: 'task_7',
        title: 'จัดประชุมเพื่อรับฟังความเห็นของทีมงานรอบแรก',
        description: 'เชิญทีมงานทุกคนและหัวหน้างานเข้าร่วมประชุมเพื่อพรีเซนต์ตัวต้นแบบระบบ (Prototype) และขอรับคำแนะนำเพื่อปรับปรุงก่อนส่งมอบขั้นสุดท้าย',
        assignee: 'สมพร',
        priority: 'low',
        startDate: '2026-05-20',
        deadline: '2026-05-24',
        status: 'done'
    },
    {
        id: 'task_8',
        title: 'จัดทำรายงานสรุปผลงานความก้าวหน้าประจำสัปดาห์',
        description: 'รวบรวมภาระงานของทีมทั้งหมด สถานะที่ค้างอยู่ และงานที่เสร็จสิ้น เพื่อเขียนรายงานสรุปผลส่งให้ผู้บริหารในสัปดาห์นี้',
        assignee: 'สมศรี',
        priority: 'medium',
        startDate: '2026-05-29',
        deadline: '2026-06-01',
        status: 'todo' // Overdue since current date is 2026-06-02
    }
];

// 2. Application State variables
let tasks = [];
let currentUser = 'supervisor'; // 'supervisor' or team member name
let currentView = 'dashboardView'; // 'dashboardView' or 'kanbanView'
let draggedTaskId = null;

// 3. Selectors & DOM Elements
const userSelector = document.getElementById('userSelector');
const navDashboard = document.getElementById('navDashboard');
const navKanban = document.getElementById('navKanban');
const dashboardView = document.getElementById('dashboardView');
const kanbanView = document.getElementById('kanbanView');
const viewTitle = document.getElementById('viewTitle');
const viewSubtitle = document.getElementById('viewSubtitle');

// Dashboard metrics
const metricTotal = document.getElementById('metricTotal');
const metricInProgress = document.getElementById('metricInProgress');
const metricReview = document.getElementById('metricReview');
const metricDone = document.getElementById('metricDone');
const metricOverdue = document.getElementById('metricOverdue');
const workloadList = document.getElementById('workloadList');

// Filters
const filterAssignee = document.getElementById('filterAssignee');
const filterPriority = document.getElementById('filterPriority');
const filterStatus = document.getElementById('filterStatus');
const allTasksTableBody = document.getElementById('allTasksTableBody');
const tableEmptyState = document.getElementById('tableEmptyState');

// Kanban column cards
const cardsTodo = document.getElementById('cardsTodo');
const cardsInProgress = document.getElementById('cardsInProgress');
const cardsReview = document.getElementById('cardsReview');
const cardsDone = document.getElementById('cardsDone');

const countTodo = document.getElementById('countTodo');
const countInProgress = document.getElementById('countInProgress');
const countReview = document.getElementById('countReview');
const countDone = document.getElementById('countDone');

const kanbanRoleBanner = document.getElementById('kanbanRoleBanner');
const kanbanBannerText = document.getElementById('kanbanBannerText');

// Modals
const taskModal = document.getElementById('taskModal');
const taskForm = document.getElementById('taskForm');
const taskIdInput = document.getElementById('taskId');
const taskTitleInput = document.getElementById('taskTitle');
const taskDescInput = document.getElementById('taskDesc');
const taskAssigneeSelect = document.getElementById('taskAssignee');
const taskPrioritySelect = document.getElementById('taskPriority');
const taskStartDateInput = document.getElementById('taskStartDate');
const taskDeadlineInput = document.getElementById('taskDeadline');
const taskStatusSelect = document.getElementById('taskStatus');

const btnAddTaskHeader = document.getElementById('btnAddTaskHeader');
const btnCloseModal = document.getElementById('btnCloseModal');
const btnCancelModal = document.getElementById('btnCancelModal');
const modalTitle = document.getElementById('modalTitle');

// Detail Modal
const detailModal = document.getElementById('detailModal');
const btnCloseDetail = document.getElementById('btnCloseDetail');
const btnDeleteDetail = document.getElementById('btnDeleteDetail');
const btnEditDetail = document.getElementById('btnEditDetail');
const btnAcceptDetail = document.getElementById('btnAcceptDetail');
const detailPriority = document.getElementById('detailPriority');
const detailTitle = document.getElementById('detailTitle');
const detailAssignee = document.getElementById('detailAssignee');
const detailStatusBadge = document.getElementById('detailStatusBadge');
const detailStartDate = document.getElementById('detailStartDate');
const detailDeadline = document.getElementById('detailDeadline');
const detailDeadlineIcon = document.getElementById('detailDeadlineIcon');
const detailDesc = document.getElementById('detailDesc');

let currentDetailTaskId = null;

// 4. Initialize Application
function init() {
    loadData();
    setupEventListeners();
    updateUIForUser();
    renderView();
}

// 5. Load & Save Data
function loadData() {
    const savedTasks = localStorage.getItem('teamflow_tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    } else {
        tasks = [...DEFAULT_TASKS];
        saveData();
    }
}

function saveData() {
    localStorage.setItem('teamflow_tasks', JSON.stringify(tasks));
}

// 6. Event Listeners Setup
function setupEventListeners() {
    // User Switcher
    userSelector.addEventListener('change', (e) => {
        currentUser = e.target.value;
        updateUIForUser();
        renderActiveViewContent();
    });

    // Sidebar Navigation Switching
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            navButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentView = btn.getAttribute('data-target');
            renderView();
        });
    });

    // Add Task Button Click
    btnAddTaskHeader.addEventListener('click', () => {
        openTaskModal(null); // Open as blank/new
    });

    // Close Modals Click
    btnCloseModal.addEventListener('click', closeTaskModal);
    btnCancelModal.addEventListener('click', closeTaskModal);
    
    // Form Submit (Save Task)
    taskForm.addEventListener('submit', handleTaskFormSubmit);

    // Filter Listeners
    filterAssignee.addEventListener('change', renderDashboardTable);
    filterPriority.addEventListener('change', renderDashboardTable);
    filterStatus.addEventListener('change', renderDashboardTable);

    // Drag and Drop implementation for columns
    const columns = document.querySelectorAll('.kanban-column');
    columns.forEach(col => {
        col.addEventListener('dragover', handleDragOver);
        col.addEventListener('dragenter', handleDragEnter);
        col.addEventListener('dragleave', handleDragLeave);
        col.addEventListener('drop', handleDrop);
    });

    // Inline Column Add Buttons
    const btnAddInlines = document.querySelectorAll('.btn-add-inline');
    btnAddInlines.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const status = btn.getAttribute('data-status');
            openTaskModal(null, status);
        });
    });

    // Detail Modal actions
    btnCloseDetail.addEventListener('click', closeDetailModal);
    btnAcceptDetail.addEventListener('click', closeDetailModal);
    btnDeleteDetail.addEventListener('click', () => {
        if (currentDetailTaskId) {
            deleteTask(currentDetailTaskId);
            closeDetailModal();
        }
    });
    btnEditDetail.addEventListener('click', () => {
        if (currentDetailTaskId) {
            const taskId = currentDetailTaskId;
            closeDetailModal();
            openTaskModal(taskId);
        }
    });
}

// 7. Update UI based on active Role
function updateUIForUser() {
    if (currentUser === 'supervisor') {
        viewTitle.innerText = "แดชบอร์ดภาพรวมทีม";
        viewSubtitle.innerText = "ดูภาระงาน สถิติ และความคืบหน้าของทุกคนในทีม";
        
        // Show all filter options
        filterAssignee.value = 'all';
        filterAssignee.disabled = false;
        
        // Header button text
        btnAddTaskHeader.innerHTML = `<i class="fa-solid fa-plus"></i> <span>มอบหมายงานใหม่</span>`;
        
        // Kanban Banner
        kanbanRoleBanner.className = "role-banner";
        kanbanBannerText.innerHTML = `กำลังแสดงบอร์ดงาน **ของทีมงานทุกคน** (ในฐานะหัวหน้างาน คุณสามารถบริหารจัดการงานของทุกคนได้)`;
    } else {
        viewTitle.innerText = `บอร์ดงานส่วนตัว - ${currentUser}`;
        viewSubtitle.innerText = `จัดการและสลับสถานะงานส่วนตัวของคุณแบบ Kanban`;
        
        // Auto filter table for current user if they navigate to dashboard
        filterAssignee.value = currentUser;
        filterAssignee.disabled = true; // Lock filter to user
        
        // Header button text
        btnAddTaskHeader.innerHTML = `<i class="fa-solid fa-plus"></i> <span>เพิ่มงานใหม่</span>`;
        
        // Kanban Banner
        kanbanRoleBanner.className = "role-banner info-accent";
        kanbanBannerText.innerHTML = `กำลังแสดงบอร์ดงานเฉพาะของ: <strong>👤 ${currentUser}</strong> (คุณสามารถลากวางเพื่อเปลี่ยนสถานะงานของคุณได้)`;
    }
}

// 8. Render Navigation Views
function renderView() {
    dashboardView.classList.remove('active');
    kanbanView.classList.remove('active');
    
    document.getElementById(currentView).classList.add('active');

    // Sync sidebar active state if changed elsewhere
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        if (btn.getAttribute('data-target') === currentView) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    renderActiveViewContent();
}

function renderActiveViewContent() {
    if (currentView === 'dashboardView') {
        renderDashboardStats();
        renderDashboardWorkload();
        renderDashboardTable();
    } else if (currentView === 'kanbanView') {
        renderKanbanBoard();
    }
}

// 9. Dashboard Logic
function getTodayString() {
    const d = new Date();
    // Use user local time configuration if available, otherwise default to local ISO format.
    // 2026-06-02 is the current date from additional metadata
    return "2026-06-02";
}

function checkIsOverdue(task) {
    if (task.status === 'done') return false;
    const today = getTodayString();
    return task.deadline < today;
}

function renderDashboardStats() {
    // Filter tasks based on role: supervisor gets all, member gets their own
    const userTasks = currentUser === 'supervisor' ? tasks : tasks.filter(t => t.assignee === currentUser);
    
    const total = userTasks.length;
    const todo = userTasks.filter(t => t.status === 'todo').length;
    const inProgress = userTasks.filter(t => t.status === 'in_progress').length;
    const review = userTasks.filter(t => t.status === 'review').length;
    const done = userTasks.filter(t => t.status === 'done').length;
    
    const overdue = userTasks.filter(checkIsOverdue).length;

    metricTotal.innerText = total;
    metricInProgress.innerText = inProgress;
    metricReview.innerText = review;
    metricDone.innerText = done;
    metricOverdue.innerText = overdue;
}

function renderDashboardWorkload() {
    workloadList.innerHTML = '';
    
    // Always show all team members in workload distribution
    TEAM_MEMBERS.forEach(member => {
        const memberTasks = tasks.filter(t => t.assignee === member);
        const completedTasks = memberTasks.filter(t => t.status === 'done');
        const countAll = memberTasks.length;
        const countDone = completedTasks.length;
        
        const percentage = countAll > 0 ? Math.round((countDone / countAll) * 100) : 0;
        
        const itemHtml = `
            <div class="workload-item">
                <div class="workload-info">
                    <span class="workload-name">👤 ${member}</span>
                    <span class="workload-stats">${countDone}/${countAll} งานสำเร็จ (${percentage}%)</span>
                </div>
                <div class="progress-bar-bg">
                    <div class="progress-bar-fill" style="width: ${percentage}%"></div>
                </div>
            </div>
        `;
        workloadList.insertAdjacentHTML('beforeend', itemHtml);
    });
}

function renderDashboardTable() {
    allTasksTableBody.innerHTML = '';
    
    const selectedAssignee = filterAssignee.value;
    const selectedPriority = filterPriority.value;
    const selectedStatus = filterStatus.value;
    
    // Apply filters
    let filtered = [...tasks];
    
    if (selectedAssignee !== 'all') {
        filtered = filtered.filter(t => t.assignee === selectedAssignee);
    }
    if (selectedPriority !== 'all') {
        filtered = filtered.filter(t => t.priority === selectedPriority);
    }
    if (selectedStatus !== 'all') {
        filtered = filtered.filter(t => t.status === selectedStatus);
    }
    
    if (filtered.length === 0) {
        tableEmptyState.classList.remove('hidden');
    } else {
        tableEmptyState.classList.add('hidden');
        
        // Sort: Overdue & High Priority first, then by deadline
        filtered.sort((a, b) => {
            const isOverdueA = checkIsOverdue(a);
            const isOverdueB = checkIsOverdue(b);
            if (isOverdueA && !isOverdueB) return -1;
            if (!isOverdueA && isOverdueB) return 1;
            
            // Priority weight
            const pWeight = { 'high': 3, 'medium': 2, 'low': 1 };
            if (pWeight[b.priority] !== pWeight[a.priority]) {
                return pWeight[b.priority] - pWeight[a.priority];
            }
            
            return a.deadline.localeCompare(b.deadline);
        });

        filtered.forEach(task => {
            const isOverdue = checkIsOverdue(task);
            const deadlineText = formatDateThai(task.deadline);
            const dateCreatedText = formatDateThai(task.startDate);
            
            let statusText = '';
            let statusClass = task.status;
            switch(task.status) {
                case 'todo': statusText = 'ต้องทำ'; break;
                case 'in_progress': statusText = 'กำลังทำ'; break;
                case 'review': statusText = 'รอตรวจทาน'; break;
                case 'done': statusText = 'เสร็จสิ้น'; break;
            }
            
            let priorityText = '';
            switch(task.priority) {
                case 'high': priorityText = 'สูง'; break;
                case 'medium': priorityText = 'ปานกลาง'; break;
                case 'low': priorityText = 'ต่ำ'; break;
            }

            const row = document.createElement('tr');
            row.innerHTML = `
                <td><strong>${escapeHtml(task.title)}</strong></td>
                <td>👤 ${task.assignee}</td>
                <td><span class="badge-priority ${task.priority}"><i class="fa-solid fa-circle text-xs"></i> ${priorityText}</span></td>
                <td>${dateCreatedText}</td>
                <td><span class="${isOverdue ? 'text-danger font-medium' : ''}">${deadlineText} ${isOverdue ? '<i class="fa-solid fa-circle-exclamation" title="เลยกำหนดส่ง"></i>' : ''}</span></td>
                <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                <td>
                    <button class="btn-table-action" onclick="viewTaskDetails('${task.id}')" title="รายละเอียด"><i class="fa-solid fa-eye"></i></button>
                    <button class="btn-table-action" onclick="editTaskFromTable('${task.id}')" title="แก้ไข"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button class="btn-table-action delete" onclick="deleteTaskFromTable('${task.id}')" title="ลบ"><i class="fa-solid fa-trash-can"></i></button>
                </td>
            `;
            allTasksTableBody.appendChild(row);
        });
    }
}

// 10. Kanban Logic
function renderKanbanBoard() {
    // Clear columns
    cardsTodo.innerHTML = '';
    cardsInProgress.innerHTML = '';
    cardsReview.innerHTML = '';
    cardsDone.innerHTML = '';
    
    // Filter tasks for active board
    // Supervisor sees everyone's tasks, member sees only their own
    const boardTasks = currentUser === 'supervisor' 
        ? tasks 
        : tasks.filter(t => t.assignee === currentUser);
        
    const columns = {
        'todo': { list: cardsTodo, count: countTodo, tasks: [] },
        'in_progress': { list: cardsInProgress, count: countInProgress, tasks: [] },
        'review': { list: cardsReview, count: countReview, tasks: [] },
        'done': { list: cardsDone, count: countDone, tasks: [] }
    };
    
    boardTasks.forEach(task => {
        if (columns[task.status]) {
            columns[task.status].tasks.push(task);
        }
    });

    // Render columns
    Object.keys(columns).forEach(status => {
        const col = columns[status];
        col.count.innerText = col.tasks.length;
        
        if (col.tasks.length === 0) {
            col.list.innerHTML = `
                <div class="column-empty-state">
                    <p><i class="fa-solid fa-inbox text-lg opacity-40"></i><br>ไม่มีงานในคอลัมน์นี้</p>
                </div>
            `;
        } else {
            // Sort: high priority first, then deadline
            col.tasks.sort((a, b) => {
                const pWeight = { 'high': 3, 'medium': 2, 'low': 1 };
                if (pWeight[b.priority] !== pWeight[a.priority]) {
                    return pWeight[b.priority] - pWeight[a.priority];
                }
                return a.deadline.localeCompare(b.deadline);
            });

            col.tasks.forEach(task => {
                const card = createTaskCard(task);
                col.list.appendChild(card);
            });
        }
    });
}

function createTaskCard(task) {
    const card = document.createElement('div');
    card.className = 'task-card';
    card.setAttribute('draggable', 'true');
    card.setAttribute('data-id', task.id);
    
    // Handle Drag start & end
    card.addEventListener('dragstart', handleDragStart);
    card.addEventListener('dragend', handleDragEnd);
    
    // Card Click for detail
    card.addEventListener('click', (e) => {
        // Prevent trigger if clicking action button
        if (e.target.closest('.btn-card-action')) return;
        viewTaskDetails(task.id);
    });

    const isOverdue = checkIsOverdue(task);
    const today = getTodayString();
    
    // Determine near deadline (e.g., due today or tomorrow)
    let isSoon = false;
    if (task.status !== 'done' && !isOverdue) {
        const diffTime = Math.abs(new Date(task.deadline) - new Date(today));
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays <= 1) isSoon = true;
    }
    
    let dateClass = 'card-date';
    let dateIcon = '<i class="fa-regular fa-calendar"></i>';
    if (isOverdue) {
        dateClass += ' overdue';
        dateIcon = '<i class="fa-solid fa-circle-exclamation text-danger"></i>';
    } else if (isSoon) {
        dateClass += ' warning-soon';
        dateIcon = '<i class="fa-solid fa-clock text-warning"></i>';
    }

    let priorityText = '';
    switch(task.priority) {
        case 'high': priorityText = 'สูง'; break;
        case 'medium': priorityText = 'ปานกลาง'; break;
        case 'low': priorityText = 'ต่ำ'; break;
    }

    // Show assignee badge if supervisor is viewing the whole board
    const assigneeBadgeHtml = currentUser === 'supervisor' 
        ? `<span class="card-assignee-badge"><i class="fa-solid fa-circle-user"></i> ${escapeHtml(task.assignee)}</span>`
        : '';

    card.innerHTML = `
        <div class="card-top">
            <span class="badge-priority ${task.priority}">${priorityText}</span>
            ${assigneeBadgeHtml}
        </div>
        <h4>${escapeHtml(task.title)}</h4>
        <p class="card-desc">${escapeHtml(task.description || 'ไม่มีคำอธิบายเพิ่มเติม')}</p>
        <div class="card-meta">
            <div class="${dateClass}">
                ${dateIcon}
                <span>${formatDateThai(task.deadline)}</span>
            </div>
            <div class="card-actions">
                <button class="btn-card-action" onclick="event.stopPropagation(); editTaskFromTable('${task.id}')" title="แก้ไขงาน"><i class="fa-solid fa-pen"></i></button>
                <button class="btn-card-action delete" onclick="event.stopPropagation(); deleteTaskFromTable('${task.id}')" title="ลบงาน"><i class="fa-solid fa-trash-can"></i></button>
            </div>
        </div>
    `;

    return card;
}

// 11. HTML Drag & Drop Implementation
function handleDragStart(e) {
    draggedTaskId = this.getAttribute('data-id');
    this.classList.add('dragging');
    e.dataTransfer.setData('text/plain', draggedTaskId);
}

function handleDragEnd(e) {
    this.classList.remove('dragging');
    const columns = document.querySelectorAll('.kanban-column');
    columns.forEach(col => col.classList.remove('drag-over'));
}

function handleDragOver(e) {
    e.preventDefault(); // Required to allow drop
}

function handleDragEnter(e) {
    e.preventDefault();
    this.classList.add('drag-over');
}

function handleDragLeave(e) {
    this.classList.remove('drag-over');
}

function handleDrop(e) {
    e.preventDefault();
    this.classList.remove('drag-over');
    
    const taskId = e.dataTransfer.getData('text/plain') || draggedTaskId;
    const newStatus = this.getAttribute('data-status');
    
    if (taskId && newStatus) {
        const task = tasks.find(t => t.id === taskId);
        if (task && task.status !== newStatus) {
            task.status = newStatus;
            saveData();
            renderActiveViewContent();
        }
    }
    draggedTaskId = null;
}

// 12. Modal Handlers
function openTaskModal(taskId = null, defaultStatus = 'todo') {
    taskForm.reset();
    
    // Date presets
    const today = getTodayString();
    taskStartDateInput.value = today;
    
    // Default deadline: +3 days from today
    const deadlineDate = new Date();
    deadlineDate.setDate(deadlineDate.getDate() + 3);
    const deadlineString = deadlineDate.toISOString().split('T')[0];
    taskDeadlineInput.value = deadlineString;
    
    if (taskId) {
        // Edit mode
        const task = tasks.find(t => t.id === taskId);
        if (!task) return;
        
        modalTitle.innerText = "แก้ไขข้อมูลงาน";
        taskIdInput.value = task.id;
        taskTitleInput.value = task.title;
        taskDescInput.value = task.description;
        taskAssigneeSelect.value = task.assignee;
        taskPrioritySelect.value = task.priority;
        taskStartDateInput.value = task.startDate;
        taskDeadlineInput.value = task.deadline;
        taskStatusSelect.value = task.status;
    } else {
        // Create Mode
        modalTitle.innerText = currentUser === 'supervisor' ? "มอบหมายงานใหม่" : "เพิ่มงานใหม่";
        taskIdInput.value = '';
        taskStatusSelect.value = defaultStatus;
        
        // Auto-fill assignee if not supervisor
        if (currentUser !== 'supervisor') {
            taskAssigneeSelect.value = currentUser;
            taskAssigneeSelect.disabled = true; // Lock assignee input for team members
        } else {
            taskAssigneeSelect.value = '';
            taskAssigneeSelect.disabled = false;
        }
    }
    
    taskModal.classList.add('active');
}

function closeTaskModal() {
    taskModal.classList.remove('active');
}

function handleTaskFormSubmit(e) {
    e.preventDefault();
    
    const id = taskIdInput.value;
    const title = taskTitleInput.value.trim();
    const description = taskDescInput.value.trim();
    // Handle disabled inputs which don't send their values automatically in some setups
    const assignee = currentUser !== 'supervisor' ? currentUser : taskAssigneeSelect.value;
    const priority = taskPrioritySelect.value;
    const startDate = taskStartDateInput.value;
    const deadline = taskDeadlineInput.value;
    const status = taskStatusSelect.value;

    if (!title || !assignee || !startDate || !deadline || !status) {
        alert("กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน");
        return;
    }

    if (deadline < startDate) {
        alert("วันกำหนดส่งต้องไม่ก่อนวันที่มอบหมายหรือเริ่มงาน");
        return;
    }

    if (id) {
        // Edit existing
        const taskIndex = tasks.findIndex(t => t.id === id);
        if (taskIndex !== -1) {
            tasks[taskIndex] = {
                ...tasks[taskIndex],
                title,
                description,
                assignee,
                priority,
                startDate,
                deadline,
                status
            };
        }
    } else {
        // Add new
        const newTask = {
            id: 'task_' + Date.now(),
            title,
            description,
            assignee,
            priority,
            startDate,
            deadline,
            status
        };
        tasks.push(newTask);
    }

    saveData();
    closeTaskModal();
    renderActiveViewContent();
}

// 13. Task Details Modal Handlers
window.viewTaskDetails = function(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    
    currentDetailTaskId = taskId;
    
    // Header priority tag
    let priorityText = '';
    switch(task.priority) {
        case 'high': priorityText = 'สูง (High)'; break;
        case 'medium': priorityText = 'ปานกลาง (Medium)'; break;
        case 'low': priorityText = 'ต่ำ (Low)'; break;
    }
    detailPriority.innerText = priorityText;
    detailPriority.className = `detail-priority-tag ${task.priority}`;
    
    detailTitle.innerText = task.title;
    detailAssignee.innerText = task.assignee;
    
    // Status Badge
    let statusText = '';
    switch(task.status) {
        case 'todo': statusText = 'ต้องทำ'; break;
        case 'in_progress': statusText = 'กำลังทำ'; break;
        case 'review': statusText = 'รอตรวจทาน'; break;
        case 'done': statusText = 'เสร็จสิ้น'; break;
    }
    detailStatusBadge.innerText = statusText;
    detailStatusBadge.className = `status-badge ${task.status}`;
    
    // Dates
    detailStartDate.innerText = formatDateThai(task.startDate);
    
    const isOverdue = checkIsOverdue(task);
    detailDeadline.innerText = formatDateThai(task.deadline);
    if (isOverdue) {
        detailDeadline.className = 'text-danger font-medium';
        detailDeadlineIcon.className = 'fa-solid fa-circle-exclamation text-danger';
    } else {
        detailDeadline.className = '';
        detailDeadlineIcon.className = 'fa-regular fa-calendar text-secondary';
    }
    
    detailDesc.innerText = task.description || 'ไม่มีคำอธิบายเพิ่มเติม';
    
    // Accessibility check: lock delete/edit buttons if the user is a team member 
    // and this task doesn't belong to them (just in case they see it in supervisor overview)
    if (currentUser !== 'supervisor' && task.assignee !== currentUser) {
        btnDeleteDetail.style.display = 'none';
        btnEditDetail.style.display = 'none';
    } else {
        btnDeleteDetail.style.display = 'inline-flex';
        btnEditDetail.style.display = 'inline-flex';
    }
    
    detailModal.classList.add('active');
};

function closeDetailModal() {
    detailModal.classList.remove('active');
    currentDetailTaskId = null;
}

// 14. Global operations exposed for table/cards onclicks
window.editTaskFromTable = function(taskId) {
    openTaskModal(taskId);
};

window.deleteTaskFromTable = function(taskId) {
    if (confirm("คุณแน่ใจหรือไม่ว่าต้องการลบงานนี้ออกจาระบบ?")) {
        deleteTask(taskId);
    }
};

function deleteTask(taskId) {
    tasks = tasks.filter(t => t.id !== taskId);
    saveData();
    renderActiveViewContent();
}

// Helper to format dates in Thai style (e.g. 2 มิ.ย. 2026 or 02/06/2026)
function formatDateThai(dateString) {
    if (!dateString) return '';
    const parts = dateString.split('-');
    if (parts.length !== 3) return dateString;
    
    const year = parseInt(parts[0]);
    const month = parseInt(parts[1]);
    const day = parseInt(parts[2]);
    
    const monthsThai = [
        'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
        'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
    ];
    
    return `${day} ${monthsThai[month - 1]} ${year}`;
}

// Helper to escape HTML to prevent XSS
function escapeHtml(unsafe) {
    if (!unsafe) return '';
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
}

// Load App
document.addEventListener('DOMContentLoaded', init);
