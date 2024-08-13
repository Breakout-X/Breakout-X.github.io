function encryptText() {
    const inputText = document.getElementById('inputText').value;
    const encodedText = btoa(inputText);
    document.getElementById('outputText').value = encodedText;
}

function decryptText() {
    const inputText = document.getElementById('inputText').value;
    try {
        const decodedText = atob(inputText);
        document.getElementById('outputText').value = decodedText;
    } catch (e) {
        document.getElementById('outputText').value = 'Error: The encoding is not Base64. It may be Mcrypt, SHA256, or just plain garbage.';
    }
}
