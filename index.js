let postList = document.getElementById('post-list');
let postContainer = document.getElementById('post-detail');
let postForm = document.getElementById('newPost');

function addPostListener() {
    postForm.addEventListener('submit',e => {
        e.preventDefault();
        const title = postForm.title.value;
        const name = postForm.name.value;
        const content = postForm.content.value;
        const post = {
            title: title,
            author: name,
            content: content
        }
        fetch('http://localhost:3000/Posts', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(post)
        })
        .then(resp => resp.json())
        .then(postObject =>{
            postList.innerHTML = `<li onclick="handlePostClick(${postObject.id})">${postObject.title}</li>` + postList.innerHTML
        })
    }); 
};

function handlePostClick(postID) {
    fetch(`http://localhost:3000/Posts/${postID}`)
    .then(resp => resp.json())
    .then(post => {
        postContainer.innerHTML = `
        <p>${post.title}</p>
        <p>${post.author}</p>
        <p>${post.content}</p>
        `
    });
};

function displayPosts() {
    fetch('http://localhost:3000/Posts')
        .then(res => res.json())
        .then(posts => {
        posts.forEach((post) => {
                postList.innerHTML += `<li onclick="handlePostClick(${post.id})">${post.title}</li>`
            });
        });
};

function main() {
    displayPosts();
    addPostListener();
}
main();