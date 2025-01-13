document.getElementById('send-btn').addEventListener('click',function(){
    let inputChat=document.getElementById('chat-message')
    let message=inputChat.value.trim()
    
    // to prevent empty messages
    if(message==''){return}

    //will contain the text and action buttons
    let sentMessage=document.createElement('div')
    sentMessage.className='message sent'

    //div created to store text
    let textMessage=document.createElement('div')
    textMessage.className="message sent"
    textMessage.innerText=message

    //displaying the messages 
    let chatDisplay=document.getElementById('chat-display')
    
    // to add scrollbar
    chatDisplay.scrollTop = chatDisplay.scrollHeight;

   
    //creating buttons to edit and delete
    let messageActions=document.createElement('div')
    messageActions.className='message-actions'



    //edit button
    let editButton=document.createElement('button')
    editButton.className='edit-button'
    editButton.innerHTML = "✏️";
    editButton.onclick=()=>{
        const newText = prompt("Edit your message:", textMessage.innerText);
        if (newText !== null && newText.trim() !== "") {
            textMessage.innerText = newText; 
        }
    }
    // delete button 
    let deleteButton=document.createElement('button')
    deleteButton.className='delete-button'
    deleteButton.innerHTML="🗑️";
    deleteButton.onclick=()=>{
        sentMessage.remove()
    }

    
    messageActions.appendChild(editButton);
    messageActions.appendChild(deleteButton)
    sentMessage.appendChild(messageActions)
    sentMessage.appendChild(textMessage)
    chatDisplay.appendChild(sentMessage)
    
    inputChat.value="";    
})