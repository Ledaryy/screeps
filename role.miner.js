require('prototype.creep')

module.exports = {

    run: function (creep) {

        const creepHome = creep.memory.home
        const creepPosition = creep.room.name;

        switch (true) {
            case creep.carry.energy === creep.carryCapacity:
                creep.memory.carryStorage = 'full';
                break;

            case creep.carry.energy === 0:
                creep.memory.carryStorage = 'empty';
                break;

            default:
                break;

        } // Memory carryStorage


        switch (true) {

            case creepPosition === creepHome:
                switch (true) {
                    case creepPosition === 'W1N6' && creep.memory.carryStorage === 'empty':
                        creep.harvestSource()
                        break;

                    case creepPosition === 'W1N6' && creep.memory.carryStorage === 'full':
                        creep.transferToLink()
                        break;

                    case creepPosition === 'W2N6' && creep.memory.carryStorage === 'full':
                        creep.transferToLink()
                        break;

                    case creepPosition === 'W2N6' && creep.memory.carryStorage === 'empty':
                        creep.harvestSource()
                        break

                    case creepPosition === 'W1N7' && creep.memory.carryStorage === 'full':
                        creep.transferToLink()
                        break;

                    case creepPosition === 'W1N7' && creep.memory.carryStorage === 'empty':
                        creep.harvestSource()
                        break

                    default:
                        break;
                } // when creep at home
                break;

            case creepPosition !== creepHome:
                creep.moveToExit(creepHome);
                break;

            default:
                break;
        } // Main Logic




    }
};