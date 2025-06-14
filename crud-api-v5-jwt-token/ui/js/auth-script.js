const baseUrl = "http://localhost:3000";
const apiUrl = `${baseUrl}/api/user`;


const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");


if (registerForm) {

    const registerUser = async (e) => {
        e.preventDefault();

        const username = document.querySelector("#registerUser").value;
        const email = document.querySelector("#registerEmail").value;
        const password = document.querySelector("#registerPassword").value;

        const postData = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password })
        };

        try {
            const res = await fetch(`${apiUrl}/register`, postData);
            const data = await res.json();

            if (res.ok) {
                alert("Registration successful. You can now login.");
                window.location.href = "index.html"; // url redirect...
            } else {
                alert(data.message || "Registration failed.");
            }
        } catch (error) {
            console.log(error);
        }
    };

    registerForm.addEventListener("submit", registerUser);
};





if (loginForm) {

    const userLogin = async (e) => {
        e.preventDefault();

        const username = document.querySelector("#loginUser").value;
        const password = document.querySelector("#loginPassword").value;

        const postData = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        };

        try {
            const res = await fetch(`${apiUrl}/login`, postData);
            const data = await res.json()

            if (res.ok) {
                localStorage.setItem("token", data.token);
                window.location.href = "students.html"; // url redirect...
            } else {
                alert(data.message || "Login failed.");
            }
        } catch (error) {
            console.log(error);
        }
    };

    loginForm.addEventListener("submit", userLogin);
}

