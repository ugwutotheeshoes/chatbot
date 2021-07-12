const inputValue = document.getElementById("input");
let finalResult;
let reply;
const messagesContainer = document.getElementById("messages");
  

document.addEventListener("DOMContentLoaded", () => {
    inputValue.addEventListener("keydown", (e) => {
      if (e.code === "Enter") {
        let input = inputValue.value;
        inputValue.value = "";
        output(input);
      }
    });
  });
  
  function output(input) {
  
    // Regex remove non word/space chars
    // Trim trailing whitespce
    // Remove digits - not sure if this is best
  
    let text = input.toLowerCase().replace(/[^\w\s]/gi, "").replace(/[\d]/gi, "").trim();
    
    text = text
      .replace(/ a /g, " ")   // replaces 'tell me a story' to 'tell me story'
      .replace(/i feel /g, "")
      .replace(/whats/g, "what is") // replaces "whats" to "what is"
      .replace(/please /g, "")
      .replace(/ please/g, "")
      .replace(/r u/g, "are you"); //replaces "r u" to "are you"
  
    if (compare(userTexts, botReplies, text)) { 
      // search for exact match in `userTexts`
      finalResult = compare(userTexts, botReplies, text);
    } else {
      // if everything else fails, bot produces a random alternative reply
      finalResult = alternative[Math.floor(Math.random() * alternative.length)];
    }
  
    // to update our HTML DOM element 
    addToChat(input, finalResult);
  }

  // function to match the bot's reply to a user's text
  function compare(userTexts, botReplies, text) { 
    for (let x = 0; x < userTexts.length; x++) {
      for (let y = 0; y < botReplies.length; y++){
        if (userTexts[x][y] == text) {
          let replies = botReplies[x];
          console.log(botReplies[x][y])
          reply = replies[Math.floor(Math.random() * replies.length)];
        }
      }
    }
    return reply;
  }
  
  function addToChat(input, finalResult) {
    let userDiv = document.createElement("div");
    userDiv.id = "user";
    userDiv.className = "response";
    userDiv.innerHTML = `<span>${input}</span><img src="https://res.cloudinary.com/ugwutotheeshoes/image/upload/v1625055846/Movie%20booth/download_cwsons.png" alt="Robot cartoon" height="20px" width="20px">`;
    messagesContainer.appendChild(userDiv);
  
    let botDiv = document.createElement("div");
    let botImg = document.createElement("img");
    let botText = document.createElement("span");
    botDiv.id = "bot";
    botImg.src = "https://res.cloudinary.com/ugwutotheeshoes/image/upload/v1625055846/Movie%20booth/unnamed_yyh2zq.jpg";
    botImg.className = "avatar";
    botDiv.className = "bot response";
    botText.innerText = "Typing...";
    botDiv.appendChild(botImg);
    botDiv.appendChild(botText);
    messagesContainer.appendChild(botDiv);
    // Keep messages at most recent
    messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.clientHeight;
  
    // Fake delay to seem "real"
    setTimeout(() => {
      botText.innerText = `${finalResult}`;
    }, 2000
    )
  
  }