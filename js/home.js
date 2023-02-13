document.querySelector('.username').innerHTML = "Welcome " + JSON.parse(localStorage.getItem('name'));

document.querySelector('.logout').addEventListener('click', function(){
    window.location.href = "index.html";
    localStorage.removeItem('name');
});