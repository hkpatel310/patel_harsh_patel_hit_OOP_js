(()=>{
	const form = document.querySelector("#driverForm");
    const feedBack = document.querySelector("#feedback");

    function regForm(event) {
        //console.log("called");
        event.preventDefault();
        // calling to the php file on the server. We can do this because HTML and JS, run client-side. This also works becasue we have enabled CORS in the PHP file. This allows any domain to access our php file. This is okay for testing but not for production.
        const url = "http://localhost:8888/2024_winter/ajax_form_remote/adduser.php";
        const thisform = event.currentTarget;
        //console.log(thisform.elements.lname.value);
        const formdata = 
        "fname=" + thisform.elements.fname.value +
        "&lname=" + thisform.elements.lname.value +
        "&email=" + thisform.elements.email.value +
        "&city=" + thisform.elements.city.value;
        console.log(formdata);

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: formdata
        })
        .then(response => response.json())
        .then(responseText => {
            console.log(responseText);
            feedBack.innerHTML = "";

            if(responseText.errors) {
                responseText.errors.forEach(error => {
                    const errorElement = document.createElement("p");
                    errorElement.textContent = error;
                    feedBack.appendChild(errorElement);
                })
            } else {
                form.reset();
                const messageElement = document.createElement("p");
                messageElement.textContent = responseText.message;
                feedBack.appendChild(messageElement);
            }
        })
        .catch(error => {
            console.log(error);
            feedBack.innerHTML = "";
            const messageElement = document.createElement("p");
            messageElement.textContent = "Oops something went wrong. Maybe you're using an older browser, or not connected to the internet. Sorry for the inconvenience."
            feedBack.appendChild(messageElement);
        })
    }
    form.addEventListener("submit", regForm);
})();