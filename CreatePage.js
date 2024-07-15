const newsForm = document.getElementById('NewsCreation');

newsForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const getFormValue = (id) => document.getElementById(id).value;
    
    const formData = {
        title: getFormValue('typeInTitle'),
        description: getFormValue('typeInDesc'),
        category: getFormValue('categorySelection'),
        editorFirstName: getFormValue('editorFirstName'),
        editorLastName: getFormValue('editorLastName')
    };

    if (Object.values(formData).some(field => !field)) {
        alert('Please, fill in all the fields.');
        return;
    }

    const sendNewsData = (data) => {
        fetch('https://btu-exam-cb6c3fdf3b9d.herokuapp.com/news', {
            method: 'POST',
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

    sendNewsData(formData);
});