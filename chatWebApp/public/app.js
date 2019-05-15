const messagelist = document.querySelector("#message-list")
const form = document.querySelector("#add-message-form")

// create element and render cafe
function renderMessage(doc){
    
    let li = document.createElement('li');
    let name = document.createElement('span');
    let message = document.createElement('span');

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    message.textContent = doc.data().message;

    li.appendChild(name);
    li.appendChild(message);

    messagelist.appendChild(li);

}

db.collection('chatMessages').orderBy('created', 'desc').get().then((snapshot) => {
    
    snapshot.docs.forEach(doc => {
        renderCafe(doc);
    });
})

//adding messages
form.addEventListener('submit',(e) => {
    e.preventDefault();
    db.collection('chatMessages').add({
        name : form.name.value,
        message : form.message.value,
        created: Date.now() 
    }).then(db.collection('chatMessages').orderBy('created', 'desc').get().then((snapshot) => {
        messagelist.innerHTML = "";
        snapshot.docs.forEach(doc => {
            renderCafe(doc);
        });
    }));
    form.name.value = '';
    form.message.value = '';
})