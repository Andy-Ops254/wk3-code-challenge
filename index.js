let postList = document.getElementById('post-list');

function handlePostClick(postID) {
    fetch(`http://localhost:3000/Posts/${postID}`)
    .then(resp => resp.json())
    .then(post => {
        console.log(post);
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

displayPosts();

