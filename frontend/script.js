const API_URL = "https://YOUR-BACKEND.vercel.app/number";

const numberInput = document.getElementById("numberInput");
const sendButton = document.getElementById("sendButton");

const statusElement = document.getElementById("status");
const responseElement = document.getElementById("response");

sendButton.addEventListener("click", async () => {
  const value = numberInput.value;

  // Make sure the user entered something
  if (value === "") {
    statusElement.textContent = "Please enter an integer.";

    statusElement.className = "status warning";

    return;
  }

  const number = Number(value);

  // Make sure it is actually an integer
  if (!Number.isInteger(number)) {
    statusElement.textContent = "Please enter a valid integer.";

    statusElement.className = "status warning";

    return;
  }

  // Disable button while request is running
  sendButton.disabled = true;

  statusElement.textContent = "Sending request...";

  statusElement.className = "status";

  try {
    const response = await fetch(API_URL, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        number: number,
      }),
    });

    const data = await response.json();

    // Display the raw backend response
    responseElement.textContent = JSON.stringify(data, null, 2);

    if (response.ok) {
      statusElement.textContent = "Request completed successfully.";

      statusElement.className = "status success";
    } else {
      statusElement.textContent = `Backend returned HTTP ${response.status}`;

      statusElement.className = "status warning";
    }
  } catch (error) {
    console.error(error);

    statusElement.textContent = "Could not connect to backend.";

    statusElement.className = "status error";

    responseElement.textContent = error.message;
  }

  sendButton.disabled = false;
});
