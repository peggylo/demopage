// 模擬用戶數據
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

// 顯示用戶數據
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
                <button class="edit-button" title="編輯"><i class="fa-solid fa-pen"></i></button>
                <button class="refresh-user-button" title="刷新"><i class="fa-solid fa-rotate"></i></button>
                <button class="delete-button" title="刪除"><i class="fa-solid fa-trash"></i></button>
            </td>
        `;
        
        // 為編輯按鈕添加事件監聽器
        const editButton = row.querySelector('.edit-button');
        editButton.addEventListener('click', () => openEditModal(user));
        
        tableBody.appendChild(row);
    });

    // 添加狀態徽章樣式
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

// 打開編輯用戶彈窗
function openEditModal(user) {
    const modal = document.getElementById('editModal');
    const form = document.getElementById('editUserForm');
    
    // 填充表單數據
    document.getElementById('editOrg').value = user.org;
    document.getElementById('editUsername').value = user.username;
    document.getElementById('editEmail').value = user.email;
    
    // 處理日期和時間
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
    
    // 顯示彈窗
    modal.style.display = 'flex';
    
    // 添加關閉彈窗的事件
    const cancelButton = modal.querySelector('.cancel-button');
    const closeButton = modal.querySelector('.close-button');
    
    cancelButton.addEventListener('click', closeEditModal);
    closeButton.addEventListener('click', closeEditModal);
    
    // 添加表單提交事件
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        // 在實際應用中，這裡會處理表單數據並更新用戶信息
        closeEditModal();
    });
}

// 關閉編輯用戶彈窗
function closeEditModal() {
    const modal = document.getElementById('editModal');
    modal.style.display = 'none';
}

// 搜尋功能
function setupSearch() {
    const orgInput = document.getElementById('orgSearch');
    const usernameInput = document.getElementById('usernameSearch');
    
    // Org搜尋
    orgInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const filteredUsers = userData.filter(user => 
            user.org.toLowerCase().includes(searchTerm)
        );
        displayUsers(filteredUsers);
    });
    
    // Username/Email搜尋
    usernameInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const filteredUsers = userData.filter(user => 
            user.username.toLowerCase().includes(searchTerm) || 
            user.email.toLowerCase().includes(searchTerm)
        );
        displayUsers(filteredUsers);
    });
}

// 密碼顯示/隱藏切換
function setupPasswordToggle() {
    const toggleButton = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('editPassword');
    
    toggleButton.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // 切換圖標
        this.innerHTML = type === 'password' ? 
            '<i class="fa-solid fa-eye-slash"></i>' : 
            '<i class="fa-solid fa-eye"></i>';
    });
}

// 點擊其他區域關閉彈窗
function setupModalOutsideClick() {
    const modal = document.getElementById('editModal');
    const modalContent = modal.querySelector('.modal-content');
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeEditModal();
        }
    });
    
    // 防止點擊模態框內容時關閉
    modalContent.addEventListener('click', function(event) {
        event.stopPropagation();
    });
}

// 初始化主題切換
function setupThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.addEventListener('click', function() {
        // 這裡只是切換圖標，實際應用中會切換深色/淺色主題
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

// 初始化應用
function init() {
    displayUsers();
    setupSearch();
    setupPasswordToggle();
    setupModalOutsideClick();
    setupThemeToggle();
    
    // 添加創建用戶按鈕事件
    const createButton = document.querySelector('.btn-primary');
    createButton.addEventListener('click', function() {
        // 創建空白用戶對象
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

// 當文檔加載完成後初始化應用
document.addEventListener('DOMContentLoaded', init); 