const newsId = new URLSearchParams(window.location.search).get('id');

newsId && fetch(`https://btu-exam-cb6c3fdf3b9d.herokuapp.com/news/${newsId}`)
    .then(response => response.json())
    .then(data => {
        ['typeInTitle', 'typeInDesc', 'categorySelection', 'editorFirstName', 'editorLastName']
            .forEach(id => document.getElementById(id).value = data[id.replace('typeIn', '').toLowerCase()]);
    });

document.getElementById('NewsUpdate').addEventListener('submit', event => {
    event.preventDefault();

    const getData = id => document.getElementById(id).value;
    const formData = {
        title: getData('typeInTitle'),
        description: getData('typeInDesc'),
        category: getData('categorySelection'),
        editorFirstName: getData('editorFirstName'),
        editorLastName: getData('editorLastName')
    };

    Object.values(formData).some(val => !val) 
        ? alert('Please fill out all fields.')
        : updateNews(formData);
});

const updateNews = data => {
    fetch(`https://btu-exam-cb6c3fdf3b9d.herokuapp.com/news/${newsId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        window.history.back();
    })
    .catch(error => console.error('Error:', error));
};