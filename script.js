
function getUserInput() {
    var userPrompt = document.getElementById("user-prompt").value;
    var userGoal = document.getElementById("user-goal").value;
    var newPrompt = document.getElementById("rewritten-prompt").value;

    callGPT(userPrompt, userGoal).then((rewritten) => {
        document.getElementById("rewritten-prompt").innerHTML = rewritten;
    });
}

async function callGPT(userPrompt, userGoal) {
  console.log("test");
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo-0125",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: (`Please reword my prompt to improve ${userGoal}: ${userPrompt}`)}
        ]
      })
    });
  
    const data = await response.json();
    return (data.choices[0].message.content);
  }
  