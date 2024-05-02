document.getElementById("goahead-button").addEventListener("click", function() {
    var language = document.getElementById("language-select").value;
    document.getElementById("language-label").textContent = language.toUpperCase();
    document.getElementById("language-selection").style.display = "none";
    document.getElementById("code-editor").style.display = "flex"; // Change from "block" to "flex" for correct display
});

document.getElementById("execute-button").addEventListener("click", run);

function run() {
    let code = document.getElementById("code-input").value;
    let output = document.getElementById("output");
    let language = document.getElementById("language-select").value;

    // Clear previous output
    output.value = '';

    // Send code to the server for execution
    fetch('http://localhost:5000/execute', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, language }),
    })
    .then(response => response.json())
    .then(data => {
        // Display the result in the output textarea
        output.value = data.result;
    })
    .catch(error => {
        console.error('Error:', error);
        output.value = 'Error occurred during code execution.';
    });
}
