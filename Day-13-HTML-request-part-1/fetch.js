// LOAD ALL USERS

const btn = document.getElementById("btn");
btn.addEventListener("click", getUsers);

function getUsers(e) {
    e.preventDefault();

    fetch("https://sik-leanix.github.io/100-days-of-javascript/Day-13-HTML-request-part-1/users.json")
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            // console.log(data);
            let output = "";
            data.forEach(function(user) {
                output += `
                    <hr>
                    <ul>
                        <li>ID: ${user.id}</li>
                        <li>Name: ${user.name}</li>
                        <li>Age: ${user.age}</li>
                        <li>Email: ${user.email}</li>
                    </ul>
                `;

            })
            document.getElementById("users").innerHTML = output;
        })
}