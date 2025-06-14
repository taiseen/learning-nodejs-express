const defaultImgUrl =
    "https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar-thumbnail.png";


const baseUrl = "http://localhost:3000";
const apiUrl = `${baseUrl}/api/student`;
const imgUrl = `${baseUrl}/uploads/`;


// for pagination...
let limit = 3;
let currentPage = 1;
let currentSearch = '';


const searchInput = document.querySelector("#searchInput");
const addStudentForm = document.querySelector("#addStudentForm");
const addStudentModal = document.querySelector("#addStudentModal");
const editStudentForm = document.querySelector("#editStudentForm");
const editStudentModal = document.querySelector("#editStudentModal");


function checkAuth() {
    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "index.html";
    }

    return {
        'Authorization': `Bearer ${token}`
    }
}

const headers = checkAuth();


// View All Students
// 🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐
// 🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐
// 🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐
async function fetchStudents(search = "", pageNumber = 1) {
    currentPage = pageNumber;
    currentSearch = search;

    try {
        const res = await fetch(
            `${apiUrl}?search=${encodeURIComponent(search)}&page=${pageNumber}&limit=${limit}`,
            { headers }
            // if this header - token match with server, then we can access this api endpoint...
            // otherwise we cant get access this data... its one kind of key-lock || security...
        );

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Failed to fetch students');
        }

        const data = await res.json();

        const tbody = document.querySelector("#studentTableBody");
        tbody.innerHTML = "";

        // display data at browser
        data?.studentsData?.forEach((student) => {
            const imgUrlPath = student.profile_pic
                ? imgUrl + student.profile_pic
                : defaultImgUrl;

            tbody.innerHTML += `
              <tr>
                <td>
                  <img
                    src="${imgUrlPath}"
                    class="rounded-circle"
                    height="50"
                    width="50"
                  />
                </td>
                <td>${student.first_name}</td>
                <td>${student.last_name}</td>
                <td>${student.email}</td>
                <td>${student.phone}</td>
                <td>${student.gender}</td>
                <td>
                  <button class="btn btn-info btn-sm" onclick="viewStudent('${student._id}')">
                    View
                  </button>

                  <button class="btn btn-warning btn-sm" onclick="editStudent('${student._id}')">
                    Edit
                  </button>

                  <button class="btn btn-danger btn-sm" onclick="deleteStudent('${student._id}')">
                    Delete
                  </button>
                </td>
              </tr>
            `;
        });

        renderPagination(data.totalPage);

    } catch (error) {
        console.error('🔴 Error fetching students:', error);
        alert(`Error: ${error.message}`);
        logout();
    }
}

fetchStudents(); // Call fetchStudents() when page load first time


// View Single Student Record
// 🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐
// 🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐
// 🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐
async function viewStudent(id) {
    const viewName = document.querySelector("#viewName");
    const viewEmail = document.querySelector("#viewEmail");
    const viewPhone = document.querySelector("#viewPhone");
    const viewGender = document.querySelector("#viewGender");
    const viewProfilePic = document.querySelector("#viewProfilePic");
    const viewStudentModal = document.querySelector("#viewStudentModal");

    const res = await fetch(`${apiUrl}/${id}`, { headers });
    const student = await res.json();

    const imgUrlPath = student.profile_pic
        ? imgUrl + student.profile_pic
        : defaultImgUrl;

    viewName.textContent = `${student.first_name} ${student.last_name}`;
    viewEmail.textContent = student.email;
    viewPhone.textContent = student.phone;
    viewGender.textContent = student.gender;
    viewProfilePic.src = imgUrlPath;

    new bootstrap.Modal(viewStudentModal).show();
}


// Search Student
// 🟰🟰🟰🟰🟰🟰🟰🟰🟰🟰🟰🟰🟰🟰🟰🟰🟰🟰🟰🟰🟰🟰🟰🟰🟰🟰🟰
// 🟰🟰🟰🟰🟰🟰🟰🟰🟰🟰🟰🟰🟰🟰🟰🟰🟰🟰🟰🟰🟰🟰🟰🟰🟰🟰🟰
// 🟰🟰🟰🟰🟰🟰🟰🟰🟰🟰🟰🟰🟰🟰🟰🟰🟰🟰🟰🟰🟰🟰🟰🟰🟰🟰🟰
searchInput.addEventListener("input", (e) => {
    e.stopPropagation();

    currentPage = 1;
    fetchStudents(searchInput.value, currentPage);
});


// Add New Student
// ✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
// ✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
// ✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
async function addNewStudent(e) {
    e.preventDefault();

    const formData = new FormData(this);

    try {
        const res = await fetch(apiUrl, {
            method: "POST",
            body: formData,
            headers,
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Failed to create student');
        }

        // Success case
        this.reset();
        const fileInput = this.querySelector('input[type="file"]');
        if (fileInput) fileInput.value = '';

        // mole auto close
        bootstrap.Modal.getInstance(addStudentModal).hide();
        fetchStudents(); // refetch new data...

    } catch (error) {
        console.error('🔴 Error:', error);
        alert(error.message || 'An error occurred while creating student');
    }
}

addStudentForm.addEventListener("submit", addNewStudent);


// Update Student Modal Box - Get Student By ID
// 🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐
// 🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐
// 🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐
async function editStudent(id) {
    const res = await fetch(`${apiUrl}/${id}`, { headers });
    const student = await res.json();

    document.querySelector("#editStudentId").value = student._id;
    document.querySelector("#editFirstName").value = student.first_name;
    document.querySelector("#editLastName").value = student.last_name;
    document.querySelector("#editEmail").value = student.email;
    document.querySelector("#editPhone").value = student.phone;
    document.querySelector("#editGender").value = student.gender;

    new bootstrap.Modal(editStudentModal).show();
}


// Update Student Record
// ❇️❇️❇️❇️❇️❇️❇️❇️❇️❇️❇️❇️❇️❇️❇️❇️❇️❇️❇️❇️❇️❇️❇️❇️❇️❇️❇️
// ❇️❇️❇️❇️❇️❇️❇️❇️❇️❇️❇️❇️❇️❇️❇️❇️❇️❇️❇️❇️❇️❇️❇️❇️❇️❇️❇️
// ❇️❇️❇️❇️❇️❇️❇️❇️❇️❇️❇️❇️❇️❇️❇️❇️❇️❇️❇️❇️❇️❇️❇️❇️❇️❇️❇️
async function updateStudentInfo(e) {
    e.preventDefault();

    const id = document.querySelector("#editStudentId").value;

    const formData = new FormData(this);

    const res = await fetch(`${apiUrl}/${id}`, {
        method: "PUT",
        body: formData,
        headers,
    });

    if (res.ok) {
        bootstrap.Modal.getInstance(editStudentModal).hide();
        fetchStudents();
    } else {
        alert("Error updating student.");
    }
}

editStudentForm.addEventListener("submit", updateStudentInfo);


// Delete Student
// 💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥
// 💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥
// 💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥
async function deleteStudent(id) {
    if (confirm("Are you sure to delete this student ?")) {
        await fetch(`${apiUrl}/${id}`, { method: "DELETE", headers });
        fetchStudents();
    }
}


// Pagination Function
// ⬅️⬅️⬅️⬅️⬅️⬅️⬅️⬅️⬅️⬅️⬅️⬅️⬅️⬅️⬅️⬅️⬅️⬅️⬅️⬅️⬅️⬅️⬅️⬅️⬅️⬅️⬅️
// 1️⃣2️⃣3️⃣1️⃣2️⃣3️⃣1️⃣2️⃣3️⃣1️⃣2️⃣3️⃣1️⃣2️⃣3️⃣1️⃣2️⃣3️⃣1️⃣2️⃣3️⃣1️⃣2️⃣3️⃣1️⃣2️⃣3️⃣
// ➡️➡️➡️➡️➡️➡️➡️➡️➡️➡️➡️➡️➡️➡️➡️➡️➡️➡️➡️➡️➡️➡️➡️➡️➡️➡️➡️
function renderPagination(totalPages) {

    const container = document.querySelector("#pagination");
    container.innerHTML = '';


    // ⬅️⬅️⬅️ Previous Button
    const prevLi = document.createElement('li');
    prevLi.className = 'page-item' + (currentPage === 1 ? ' disabled' : '');
    prevLi.innerHTML = `<a class="page-link" href="#">Previous</a>`;

    if (currentPage > 1) {
        prevLi.addEventListener("click", (e) => {
            e.preventDefault();
            fetchStudents(currentSearch, currentPage - 1);
        });
    }
    container.appendChild(prevLi);



    // 1️⃣2️⃣3️⃣ Numbered Pagination
    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement('li');
        li.className = 'page-item' + (i === currentPage ? ' active' : '');
        li.innerHTML = `<a class="page-link" href="#">${i}</a>`;

        li.addEventListener("click", (e) => {
            e.preventDefault()
            fetchStudents(currentSearch, i)
        });

        container.appendChild(li);
    }



    // ➡️➡️➡️ Next Button
    const nextLi = document.createElement('li');
    nextLi.className = 'page-item' + (currentPage === totalPages ? ' disabled' : '');
    nextLi.innerHTML = `<a class="page-link" href="#">Next</a>`;

    if (currentPage < totalPages) {
        nextLi.addEventListener("click", (e) => {
            e.preventDefault();

            fetchStudents(currentSearch, currentPage + 1);
        });
    }
    container.appendChild(nextLi);
}



// Reset form when modal closes
addStudentModal.addEventListener('hidden.bs.modal', function () {
    // Reset the form
    addStudentForm.reset();

    // Reset file input
    const fileInput = addStudentForm.querySelector('input[type="file"]');
    if (fileInput) {
        fileInput.value = '';
    }
});




function logout() {
    localStorage.removeItem("token")
    window.location.href = "index.html"
}