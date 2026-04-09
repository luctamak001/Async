const API_BASE = "https://jsonplaceholder.typicode.com";

document
    .querySelector("#warmup-btn")
    .addEventListener("click", () => {
        fetch(`${API_BASE}/users`)
            .then(res => res.json())
            .then(users => {
                let html = "";
                users.forEach((user) => {
                    html +=
                        `<div class="card">
                            <div class="name">${user.name}</div> 
                            <div class="email">${user.email}</div>
                        </div>`
                });
                document.querySelector("#warmup-grid").innerHTML = html;
                document.querySelector("#warmup-status").textContent =
                    `Loaded ${users.length} users`;
                document.querySelector("#warmup-status").className = "status success";
            });
    });

document
    .querySelector("#async-btn")
    .addEventListener("click", async () => {
        document.querySelector("#async-status").textContent = "Loading...";
        document.querySelector("#async-grid").className = "status loading";
        document.querySelector("#async-status").innerHTML = "";

        try {
            const response = await fetch(`${API_BASE}/users`);
            const users = await response.json();
            let html = "";
            users.forEach((user) => {
                html +=
                    `<div class="card">
                    <div class="name">${user.name}</div> 
                    <div class="email">${user.email}</div>
                </div>`
            });
            document.querySelector("#async-grid").innerHTML = html;
            document.querySelector("#async-status").textContent = `Loaded ${users.length} users`;
            document.querySelector("#async-status").textContent = "status success";

        } catch (error) {
            document.querySelector("#async-status").textContent = `Error: ${error.message}`;
            document.querySelector("#async-status").className = "status error";
        }
        
    });


document
    .querySelector("#error-test-btn")
    .addEventListener("click", async () => {
        document.querySelector("#async-status").textContent = "Loading...";
        document.querySelector("#async-grid").className = "status loading";
        document.querySelector("#async-status").innerHTML = "";

        try {
            const response = await fetch(`${API_BASE}/BADURL`);
            const users = await response.json();
            let html = "";
            users.forEach((user) => {
                html +=
                    `<div class="card">
                    <div class="name">${user.name}</div> 
                    <div class="email">${user.email}</div>
                </div>`
            });
            document.querySelector("#async-grid").innerHTML = html;
            document.querySelector("#async-status").textContent = `Loaded ${users.length} users`;
            document.querySelector("#async-status").textContent = "status success";

        } catch (error) {
            document.querySelector("#async-status").textContent = `Error: ${error.message}`;
            document.querySelector("#async-status").className = "status error";
        }

    });

document
    .querySelector("#post-btn")
    .addEventListener("click", async () => {

        const title = document.querySelector("#post-title").value;
        const body = document.querySelector("#post-body").value;
        const postData = {title: title, body: body, userId: 1};

        const statusElement = document.querySelector("#post-status");
        const responseElement = document.querySelector("#post-response");
        const postButton = document.querySelector("#post-btn");

        postButton.disabled = true;

        statusElement.textContent = "Sending...";
        statusElement.className = "status loading";

        try {
            const response = await fetch(`${API_BASE}/posts`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(postData)
            });
            const data = await response.json();
            responseElement.textContent = JSON.stringify(data, null, 2);
            responseElement.classList.add("visible");
            statusElement.textContent = `Post created! ID: ${data.id}`;
            statusElement.className = "status success";
            document.querySelector("#post-title").value = "";
            document.querySelector("#post-body").value = "";
            postButton.disabled = false;
        } catch (error) {
            statusElement.textContent = `Error: ${error.message}`;
            statusElement.className = "status error";
            postButton.disabled = false;
        }
    });

document.querySelector("#clear-btn")
    .addEventListener("click", () => {
        document.querySelector("#post-title").value = "";
        document.querySelector("#post-body").value = "";
        document.querySelector("#post-response").classList.remove("visible");
        document.querySelector("#post-status").textContent = "";
        document.querySelector("#post-status").className = "status";
    });