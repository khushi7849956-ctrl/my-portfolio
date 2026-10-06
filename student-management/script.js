// ===============================
// Student Management System
// ===============================


// Get existing students from localStorage

let students =
    JSON.parse(localStorage.getItem("students")) || [];


// ===============================
// DOM Elements
// ===============================

const form =
    document.getElementById("studentForm");

const table =
    document.getElementById("studentTable");

const searchInput =
    document.getElementById("searchInput");

const totalStudents =
    document.getElementById("totalStudents");

const totalCourses =
    document.getElementById("totalCourses");

const activeStudents =
    document.getElementById("activeStudents");

const submitBtn =
    document.getElementById("submitBtn");


// ===============================
// Display Students
// ===============================

function displayStudents(data = students) {

    table.innerHTML = "";

    if (data.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="8"
                    style="text-align:center;">
                    No students found.
                </td>
            </tr>
        `;

        return;
    }


    data.forEach((student, index) => {

        const row = document.createElement("tr");

        row.innerHTML = `

            <td>
                STU-${String(index + 1).padStart(3, "0")}
            </td>

            <td>
                <strong>${student.name}</strong>
            </td>

            <td>
                ${student.email}
            </td>

            <td>
                ${student.phone}
            </td>

            <td>
                ${student.course}
            </td>

            <td>
                ${student.semester}
            </td>

            <td>

                <span class="status ${student.status === "Active"
                ? "active"
                : "inactive"
            }">

                    ${student.status}

                </span>

            </td>

            <td>

                <button
                    class="action-btn edit-btn"
                    onclick="editStudent(${index})">

                    ✏️ Edit

                </button>

                <button
                    class="action-btn delete-btn"
                    onclick="deleteStudent(${index})">

                    🗑️ Delete

                </button>

            </td>
        `;


        table.appendChild(row);

    });

}


// ===============================
// Add / Update Student
// ===============================

form.addEventListener("submit", function (event) {

    event.preventDefault();


    const name =
        document.getElementById("studentName").value.trim();

    const email =
        document.getElementById("studentEmail").value.trim();

    const phone =
        document.getElementById("studentPhone").value.trim();

    const course =
        document.getElementById("studentCourse").value;

    const semester =
        document.getElementById("studentSemester").value;

    const status =
        document.getElementById("studentStatus").value;

    const editIndex =
        document.getElementById("editIndex").value;


    const student = {

        name,
        email,
        phone,
        course,
        semester,
        status

    };


    // Update existing student

    if (editIndex !== "") {

        students[editIndex] = student;

        alert("Student updated successfully!");


    } else {

        // Add new student

        students.push(student);

        alert("Student added successfully!");

    }


    // Save data

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );


    resetForm();

    displayStudents();

    updateDashboard();

});


// ===============================
// Edit Student
// ===============================

function editStudent(index) {

    const student =
        students[index];


    document.getElementById("studentName").value =
        student.name;

    document.getElementById("studentEmail").value =
        student.email;

    document.getElementById("studentPhone").value =
        student.phone;

    document.getElementById("studentCourse").value =
        student.course;

    document.getElementById("studentSemester").value =
        student.semester;

    document.getElementById("studentStatus").value =
        student.status;


    document.getElementById("editIndex").value =
        index;


    submitBtn.innerHTML =
        "✏️ Update Student";


    window.scrollTo({

        top: document.getElementById("add-student").offsetTop - 20,

        behavior: "smooth"

    });

}


// ===============================
// Delete Student
// ===============================

function deleteStudent(index) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this student?"
        );


    if (!confirmDelete) {

        return;

    }


    students.splice(index, 1);


    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );


    displayStudents();

    updateDashboard();

}


// ===============================
// Reset Form
// ===============================

function resetForm() {

    form.reset();


    document.getElementById("editIndex").value =
        "";


    submitBtn.innerHTML =
        "➕ Add Student";

}


// ===============================
// Search Student
// ===============================

searchInput.addEventListener(
    "input",
    function () {

        const search =
            this.value.toLowerCase();


        const filtered =
            students.filter(student =>

                student.name
                    .toLowerCase()
                    .includes(search)

                ||

                student.email
                    .toLowerCase()
                    .includes(search)

                ||

                student.course
                    .toLowerCase()
                    .includes(search)

                ||

                student.phone
                    .includes(search)

            );


        displayStudents(filtered);

    }
);


// ===============================
// Dashboard Statistics
// ===============================

function updateDashboard() {

    totalStudents.textContent =
        students.length;


    const courses =
        new Set(
            students.map(student =>
                student.course
            )
        );


    totalCourses.textContent =
        courses.size;


    const active =
        students.filter(
            student =>
                student.status === "Active"
        );


    activeStudents.textContent =
        active.length;

}


// ===============================
// Initial Load
// ===============================

displayStudents();

updateDashboard();