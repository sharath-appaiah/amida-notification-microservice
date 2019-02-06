const logger = require('../../config/winston');

const info = {
    revision: 2,
    name: '201901311643-orange-1029-revoke-device',
    created: '2019-01-31T21:43:14.984Z',
    comment: '',
};

module.exports = {
    up: async (queryInterface, Sequelize) => {
        logger.info('1: Removing column `Devices.isArchived`...');
        await queryInterface.removeColumn('Devices', 'isArchived');

        logger.info('2: Adding paranoid delete column named `disabled`...');
        await queryInterface.addColumn('Devices', 'disabled', {
            type: Sequelize.DATE,
        });

        logger.info('3: Adding unique constraint to `Devices` columns `token` and `UserId`');
        await queryInterface.addConstraint('Devices', ['token', 'UserId'], {
            type: 'unique',
            name: 'Devices_token_UserId_key',
        });
    },
    info,
};
