let onlineUsers = []; //list of online users socket id and email

// add online user
function addSocketUser(email,socketId){
    if(!onlineUsers.includes({email,socketId})){
        onlineUsers.push({email,socketId});
    }
}

// remove user
function removeSocketUser(socketId){
    onlineUsers = onlineUsers.filter((user)=> user.socketId!==socketId);
}

//get user 
function getSocketUser(email){
    return onlineUsers.find((user)=>user.email===email);
}

module.exports = {addSocketUser,removeSocketUser,getSocketUser};