// 模拟用户数据
const userData = [
    {
        org: "school",
        username: "pqr@SCHOOL.ORG",
        email: "pqr@school.org",
        roles: "default",
        status: "Active",
        expiration: "2025/12/31 08:00:00"
    },
    {
        org: "school",
        username: "abcdef@SCHOOL.ORG",
        email: "abcdef@school.org",
        roles: "default",
        status: "Active",
        expiration: "2025/12/31 08:00:00"
    },
    {
        org: "school",
        username: "mnopq@SCHOOL.ORG",
        email: "mnopq@school.org",
        roles: "default",
        status: "Active",
        expiration: "2025/12/31 08:00:00"
    },
    {
        org: "school",
        username: "xyz@SCHOOL.ORG",
        email: "xyz@school.org",
        roles: "default",
        status: "Active",
        expiration: "2025/12/31 08:00:00"
    },
    {
        org: "school",
        username: "lmn@SCHOOL.ORG",
        email: "lmn@school.org",
        roles: "default",
        status: "Active",
        expiration: "2025/12/31 08:00:00"
    },
    {
        org: "school",
        username: "abcde@SCHOOL.ORG",
        email: "abcde@school.org",
        roles: "default",
        status: "Active",
        expiration: "2025/12/31 08:00:00"
    },
    {
        org: "school",
        username: "qwerty@SCHOOL.ORG",
        email: "qwerty@school.org",
        roles: "default",
        status: "Active",
        expiration: "2025/12/31 08:00:00"
    },
    {
        org: "school",
        username: "asdf@SCHOOL.ORG",
        email: "asdf@school.org",
        roles: "default",
        status: "Active",
        expiration: "2025/12/31 08:00:00"
    },
    {
        org: "school",
        username: "zxcvb@SCHOOL.ORG",
        email: "zxcvb@school.org",
        roles: "default",
        status: "Active",
        expiration: "2025/12/31 08:00:00"
    },
    {
        org: "school",
        username: "rtyu@SCHOOL.ORG",
        email: "rtyu@school.org",
        roles: "default",
        status: "Active",
        expiration: "2025/12/31 00:00:00"
    }
];

// 显示用户数据
function displayUsers(users = userData) {
    const tableBody = document.querySelector('#userTable tbody');
    tableBody.innerHTML = '';

    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.org}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.roles}</td>
            <td><span class="status-badge ${user.status.toLowerCase()}">${user.status}</span></td>
            <td>${user.expiration}</td>
            <td class="action-cell">
                <button class="edit-button" title="编辑"><i class="fa-solid fa-pen"></i></button>
                <button class="refresh-user-button" title="刷新"><i class="fa-solid fa-rotate"></i></button>
                <button class="delete-button" title="删除"><i class="fa-solid fa-trash"></i></button>
            </td>
        `;
        
        // 为编辑按钮添加事件监听器
        const editButton = row.querySelector('.edit-button');
        editButton.addEventListener('click', () => openEditModal(user));
        
        tableBody.appendChild(row);
    });

    // 添加状态徽章样式
    const style = document.createElement('style');
    style.textContent = `
        .status-badge {
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 500;
        }
        .status-badge.active {
            background-color: rgba(46, 204, 113, 0.15);
            color: #2ecc71;
        }
        .status-badge.inactive {
            background-color: rgba(231, 76, 60, 0.15);
            color: #e74c3c;
        }
    `;
    document.head.appendChild(style);
}

// 打开编辑用户弹窗
function openEditModal(user) {
    const modal = document.getElementById('editModal');
    const form = document.getElementById('editUserForm');
    
    // 填充表单数据
    document.getElementById('editOrg').value = user.org;
    document.getElementById('editUsername').value = user.username;
    document.getElementById('editEmail').value = user.email;
    
    // 处理日期和时间
    const [date, time] = user.expiration.split(' ');
    const [year, month, day] = date.split('/');
    document.getElementById('editDate').value = `${year}-${month}-${day}`;
    
    if (time) {
        const [hours, minutes, seconds] = time.split(':');
        document.getElementById('editHours').value = hours;
        document.getElementById('editMinutes').value = minutes;
        document.getElementById('editSeconds').value = seconds;
    }
    
    document.getElementById('editStatus').value = user.status;
    document.getElementById('editRoles').value = user.roles;
    
    // 显示弹窗
    modal.style.display = 'flex';
    
    // 添加关闭弹窗的事件
    const cancelButton = modal.querySelector('.cancel-button');
    const closeButton = modal.querySelector('.close-button');
    
    cancelButton.addEventListener('click', closeEditModal);
    closeButton.addEventListener('click', closeEditModal);
    
    // 添加表单提交事件
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        // 在实际应用中，这里会处理表单数据并更新用户信息
        closeEditModal();
    });
}

// 关闭编辑用户弹窗
function closeEditModal() {
    const modal = document.getElementById('editModal');
    modal.style.display = 'none';
}

// 搜索功能
function setupSearch() {
    const orgInput = document.getElementById('orgSearch');
    const usernameInput = document.getElementById('usernameSearch');
    
    // Org搜索
    orgInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const filteredUsers = userData.filter(user => 
            user.org.toLowerCase().includes(searchTerm)
        );
        displayUsers(filteredUsers);
    });
    
    // Username/Email搜索
    usernameInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const filteredUsers = userData.filter(user => 
            user.username.toLowerCase().includes(searchTerm) || 
            user.email.toLowerCase().includes(searchTerm)
        );
        displayUsers(filteredUsers);
    });
}

// 密码显示/隐藏切换
function setupPasswordToggle() {
    const toggleButton = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('editPassword');
    
    toggleButton.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // 切换图标
        this.innerHTML = type === 'password' ? 
            '<i class="fa-solid fa-eye-slash"></i>' : 
            '<i class="fa-solid fa-eye"></i>';
    });
}

// 点击其他区域关闭弹窗
function setupModalOutsideClick() {
    const modal = document.getElementById('editModal');
    const modalContent = modal.querySelector('.modal-content');
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeEditModal();
        }
    });
    
    // 防止点击模态框内容时关闭
    modalContent.addEventListener('click', function(event) {
        event.stopPropagation();
    });
}

// 初始化主题切换
function setupThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.addEventListener('click', function() {
        // 这里只是切换图标，实际应用中会切换深色/浅色主题
        const icon = this.querySelector('i');
        if (icon.classList.contains('fa-moon')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });
}

// 初始化应用
function init() {
    displayUsers();
    setupSearch();
    setupPasswordToggle();
    setupModalOutsideClick();
    setupThemeToggle();
    
    // 添加创建用户按钮事件
    const createButton = document.querySelector('.btn-primary');
    createButton.addEventListener('click', function() {
        // 创建空白用户对象
        const newUser = {
            org: "school",
            username: "",
            email: "",
            roles: "default",
            status: "Active",
            expiration: new Date().toISOString().split('T')[0].replace(/-/g, '/') + " 00:00:00"
        };
        openEditModal(newUser);
    });
}

// 当文档加载完成后初始化应用
document.addEventListener('DOMContentLoaded', init); 