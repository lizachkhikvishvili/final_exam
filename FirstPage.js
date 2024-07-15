document.addEventListener('DOMContentLoaded', () => fetchNews());

const fetchNews = () => {
    fetch('https://btu-exam-cb6c3fdf3b9d.herokuapp.com/news')
        .then(response => response.json())
        .then(data => {
            const html = data.map(item => `
                <div class="fetchedDiv">
                    <span class="id">${item.id}</span>
                    <span class="title">${item.title}</span>
                    <span class="category">${item.category}</span>
                    <span class="likes">${item.likes}</span>
                    <span class="dateUpdated">${item.dateUpdated}</span>
                    <span class="dateCreated">${item.dateCreated}</span>
                    <button class="DeletionButton" onclick="deleteItem(${item.id})">Delete</button>
                    <button class="UpdateButton" onclick="location.href='update.html?id=${item.id}'">Update</button>
                </div>
                <hr class="line1">
            `).join('');
            document.getElementById('news-list').innerHTML = html;
        });
};

const deleteItem = itemId => {
    fetch(`https://btu-exam-cb6c3fdf3b9d.herokuapp.com/news/${itemId}`, { method: 'DELETE' })
        .then(response => response.ok ? fetchNews() : console.error('Failed to delete item'))
        .catch(error => console.error('Error deleting item:', error));
};