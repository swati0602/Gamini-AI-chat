//! API key 
//* AIzaSyB87kHS4tJW12TDoLI0Fy_Uto_fn7sEErs
//! URL
//* "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyB87kHS4tJW12TDoLI0Fy_Uto_fn7sEErs" \

document.addEventListener("DOMContentLoaded",()=>{
    const chatForm = document.getElementById("chatForm");
    const userInput = document.getElementById("userInput");
    const chatMassages = document.getElementById("chatMessages");
    const sendButton = document.getElementById("sendButton");

    // auto resize the textarea
    userInput.addEventListener("input",()=>{
        userInput.style.height = "auto"
        userInput.style.height = userInput.scrollHeight +"px"
    })

    chatForm.addEventListener("submit",async (e)=>{
        // prevent the browser default
        e.preventDefault()
        const massages = userInput.value.trim()
        if(!massages) return;
        //Todo: add user massage to chat
       addMessage(massages, true)
        // clear the input
        userInput.value=''
        userInput.style.height="auto"
        sendButton.disabled = true;

        //Todo: show typing
       const TypingIndicator= showTypingIndicator()
        try {
            //Todo : generate the responds-function
            const response = await generateResponse(massages)
            TypingIndicator.remove()

            // add AI response
            addMessage(response , false)
        } catch (error) {
            TypingIndicator.remove()
            addErrorMessage(error.message)
        } finally {
            sendButton.disabled = false
        }
    })

    // generate response function

async function generateResponse(prompt) {
    const response = await fetch(
           `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyB87kHS4tJW12TDoLI0Fy_Uto_fn7sEErs`,{
           method:"POST",
           headers:{
               'Content-Type':'application/json',
           },
           body: JSON.stringify({
               contents:[{
                   parts:[{
                       text:prompt,
                   }]
               }]
           })
           }
       );
       if (!response.ok){
           throw new Error("Failed to generate the response")
       }
       const data = await response.json();
   
       return data.candidates[0].content.parts[0].text
   
       
   }
   
   // add user massage to chat
   function addMessage(text, isUser){
       const message = document.createElement("div")
       message.className =`message ${isUser ? 'user-message':''}`
       message.innerHTML = `
       <div class="avatar ${isUser ? 'user-avatar':''}">
       ${isUser ? 'U':'AI'}
       </div>
       <div class="message-content">${text}</div>
       `;
   chatMassages.appendChild(message)
   chatMassages.scrollTop = chatMassages.scrollHeight
   }

//    show indicator
function showTypingIndicator(){
    const indicator = document.createElement('div')
    indicator.className = 'message'
    indicator.innerHTML= `
    <div class="avatar">AI</div>
     <div class="typing-indicator">
     <div class="dot">
     <div class="dot">
     <div class="dot">
     </div>
     </div>
    `;
    chatMassages.appendChild(indicator)
    chatMassages.scrollTop = chatMassages.scrollHeight
    return indicator
}

// Error message function

function addErrorMessage(text){
    const message = document.createElement("div");
    message.className = "message"
    message.innerHTML = `
   <div class="avatar">AI</div>
     <div class="message-content" style="color:red">
    Error: ${text}
     </div>
    `
}
})

