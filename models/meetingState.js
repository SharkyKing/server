module.exports = (sequelize, DataTypes) => {
    const MeetingState = sequelize.define("MeetingState", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
            }
        }
    });

    MeetingState.afterSync(async (options) => {
        const states = [
            { name: 'Upcoming' },
            { name: 'Cancelled' },
            { name: 'Done' }
        ];
    
        await Promise.all(states.map(state => {
            return MeetingState.findOrCreate({
                where: { name: state.name },
                defaults: state
            });
        }));
    });
    
    

    return MeetingState;
};
