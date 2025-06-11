const defaultImgUrl =
    "https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar-thumbnail.png";


const baseUrl = "http://localhost:3000";
const apiUrl = `${baseUrl}/api/students`;
const imgUrl = `${baseUrl}/uploads/`;


const searchInput = document.querySelector("#searchInput");
const addStudentForm = document.querySelector("#addStudentForm");
const addStudentModal = document.querySelector("#addStudentModal");
const editStudentForm = document.querySelector("#editStudentForm");
const editStudentModal = document.querySelector("#editStudentModal");


// View All Students
// 🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐
// 🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐
// 🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐
async function fetchStudents(search = "") {

    const res = await fetch(
        `${apiUrl}?search=${encodeURIComponent(search)}`
    );
    const data = await res.json();

    const tbody = document.querySelector("#studentTableBody");
    tbody.innerHTML = "";

    // display data at browser
    data.forEach((student) => {
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

    const res = await fetch(`${apiUrl}/${id}`);
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
    fetchStudents(searchInput.value)
});


// Add New Student
// ✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
// ✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
// ✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
async function addNewStudent(e) {
    e.preventDefault();

    const formData = new FormData(this);

    const res = await fetch(apiUrl, {
        method: "POST",
        body: formData,
    });

    if (res.ok) {
        this.reset();
        bootstrap.Modal.getInstance(addStudentModal).hide();
        fetchStudents();
    } else {
        alert("Error creating student.");
    }
}

addStudentForm.addEventListener("submit", addNewStudent);


// Update Student Modal Box - Get Student By ID
// 🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐
// 🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐
// 🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐🌐
async function editStudent(id) {
    const res = await fetch(`${apiUrl}/${id}`);
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
        await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
        fetchStudents();
    }
}