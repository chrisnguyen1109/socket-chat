const $ = document.querySelector.bind(document);

const form = $('#form');

form.addEventListener('submit', async e => {
    try {
        e.preventDefault();
        const user = e.target.elements.user.value;
        const room = e.target.elements.room.value;
        const response = await fetch('/api/v1/users/check-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user }),
        });
        const data = await response.json();

        if (data.status === 'success') {
            location.href = `/?user=${user}&room=${room}`;
        } else {
            $('.msg-error').classList.add('active');
        }
    } catch (err) {
        console.error(err);
    }
});
