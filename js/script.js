let names = [];

document.getElementById("load-button").addEventListener("click", () => {
    const fileInput = document.getElementById("file-input");
    if (!fileInput.files.length) {
        alert("لطفاً فایل CSV را انتخاب کنید.");
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const content = e.target.result;
        names = content
            .split(/\r?\n/) // Split by line breaks
            .flatMap(row => row.split(",")) // Split each line by commas
            .map(name => name.trim()) // Trim whitespace
            .filter(name => name); // Remove empty names
        
        if (names.length) {
            // alert(`${names.length} نام با موفقیت بارگذاری شد!`);
            document.getElementById("pick-button").disabled = false;
            document.getElementById("load-button").style.display = none;
            document.getElementById("file-input").style.display = none;

        } else {
            alert("هیچ نامی در فایل پیدا نشد!");
        }
    };

    reader.onerror = function () {
        alert("بارگذاری فایل ناموفق بود. لطفاً دوباره امتحان کنید.");
    };

    reader.readAsText(file, "utf-8");
});

document.getElementById("load-button").addEventListener("click", () => {
    document.getElementById("load-button").style.scale = 0;
    document.getElementById("file-input").style.scale = 0;
    document.querySelector("h1").style.magrinBottom = `-250 "px"`;
});


document.getElementById("pick-button").addEventListener("click", () => {
    if (!names.length) {
        // alert("هیچ نامی برای انتخاب موجود نیست.");
        return;
    }

    document.getElementById("pick-button").disabled = true;
    setTimeout ( () => {document.getElementById("pick-button").disabled = false;} , 1000);

    const selectedName = names[Math.floor(Math.random() * names.length)];
    const animatedNameDiv = document.getElementById("animated-name");

    // Clear previous text
    animatedNameDiv.textContent = "";

    // Animate the name
    let currentText = "";
    let i = 0;
    const interval = setInterval(() => {
        currentText += selectedName[i];
        animatedNameDiv.textContent = currentText;
        i++;
        if (i >= selectedName.length) {
            clearInterval(interval);
        }
    }, 100);
});