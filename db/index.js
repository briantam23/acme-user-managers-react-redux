const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme-user-managers-react-redux', { logging: false });

const User = conn.define('user', {
    name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
})

User.belongsTo(User, { as: 'Manager' });

const syncAndSeed = () => {
    let Moe, Larry, Curly, Shep, Brian;
    conn.sync({ force: true })
        .then(() => { return Promise.all([
                User.create({ name: 'Moe'}),
                User.create({ name: 'Larry' }),
                User.create({ name: 'Curly'}),
                User.create({ name: 'Shep' }),
                User.create({ name: 'Brian' })
            ])
        })
        .then(users => {
            [Moe, Larry, Curly, Shep, Brian] = users;
            return Promise.all([
                Moe.setManager(Curly),
                Larry.setManager(Curly),
                Curly.setManager(Shep)
            ])
        }) 
}


module.exports = {
    models: {
        User
    },
    syncAndSeed
}