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
        }


        const spawn = creep.findStructure(STRUCTURE_SPAWN, RESOURCE_ENERGY, "less", 300);
        const extension = creep.findStructure(STRUCTURE_EXTENSION, RESOURCE_ENERGY, "less", 100);
        const extensionLowPower = creep.findStructure(STRUCTURE_EXTENSION, RESOURCE_ENERGY, "less", 50);
        const tower = creep.findStructure(STRUCTURE_TOWER, RESOURCE_ENERGY, "less", 600);
        const storage = creep.findStructure(STRUCTURE_STORAGE, RESOURCE_ENERGY, "less", 1000000);
        const droppedResource = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);




switch (true) {
    case creepPosition === creepHome:
        if (creepHome === 'W1N6') {

            switch (true) {
                case creep.memory.carryStorage === "empty" && (tower !== 'full' || extension !== 'full' || spawn !== 'full'):
                    creep.withdrawFrom(storage, RESOURCE_ENERGY)
                    break;

                case creep.memory.carryStorage === "full" && tower !== 'full':
                    creep.transferTo(tower, RESOURCE_ENERGY)
                    break;

                case creep.memory.carryStorage === "full" && spawn !== 'full':
                    creep.transferTo(spawn, RESOURCE_ENERGY)
                    break;

                case creep.memory.carryStorage === "full" && extension !== 'full':
                    creep.transferTo(extension, RESOURCE_ENERGY)
                    break;


                default:
                    creep.moveTo(21,16);
                    creep.transferTo(storage, RESOURCE_ENERGY)
                    creep.say("🚬");
                    break;

            }

        }

        if (creepHome === 'W2N6') {

            switch (true) {
                case creep.memory.carryStorage === "empty" && (tower !== 'full' || extensionLowPower !== 'full' || spawn !== 'full'):
                    creep.withdrawFrom(storage, RESOURCE_ENERGY)
                    break;

                case creep.memory.carryStorage === "full" && tower !== 'full':
                    creep.transferTo(tower, RESOURCE_ENERGY)
                    break;

                case creep.memory.carryStorage === "full" && spawn !== 'full':
                    creep.transferTo(spawn, RESOURCE_ENERGY)
                    break;

                case creep.memory.carryStorage === "full" && extensionLowPower !== 'full':
                    creep.transferTo(extensionLowPower, RESOURCE_ENERGY)
                    break;


                default:
                    creep.moveTo(24,26);
                    creep.transferTo(storage, RESOURCE_ENERGY)
                    creep.say("🚬");
                    break;

            }

        }

        if (creepHome === 'W1N7') {

            switch (true) {
                case creep.memory.carryStorage === "empty" && (tower !== 'full' || extensionLowPower !== 'full' || spawn !== 'full'):
                    creep.withdrawFrom(storage, RESOURCE_ENERGY)
                    break;

                case creep.memory.carryStorage === "full" && tower !== 'full':
                    creep.transferTo(tower, RESOURCE_ENERGY)
                    break;

                case creep.memory.carryStorage === "full" && spawn !== 'full':
                    creep.transferTo(spawn, RESOURCE_ENERGY)
                    break;

                case creep.memory.carryStorage === "full" && extensionLowPower !== 'full':
                    creep.transferTo(extensionLowPower, RESOURCE_ENERGY)
                    break;


                default:
                    creep.moveTo(25,20);
                    creep.transferTo(storage, RESOURCE_ENERGY)
                    creep.say("🚬");
                    break;

            }

        }
        break;

    default:
        creep.moveToExit(creepHome)
        break;
}


    }

};












