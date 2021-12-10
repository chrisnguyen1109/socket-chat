const users = new Array();

module.exports = {
    addUser(data) {
        const user = users.find(el => el.user === data.user.trim().toLowerCase());

        if (user) {
            return false;
        }

        users.push(data);
        return true;
    },

    checkUser(userCheck) {
        const user = users.find(el => el.user === userCheck.trim().toLowerCase());
        if (user) {
            return false;
        }
        return true;
    },

    getUser(id) {
        return users.find(el => el.id === id);
    },

    getUsersRoom(room) {
        return users.filter(el => el.room === room).map(el => el.user);
    },

    removeUser(id) {
        const userIndex = users.findIndex(el => el.id === id);
        if (userIndex !== -1) return users.splice(userIndex, 1)[0];
    },
};
