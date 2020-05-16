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

        const data = creep.dataPack()

switch (true) {
    case creepPosition === creepHome:
        if (creepHome === 'W1N6') {

            switch (true) {
                case creep.memory.carryStorage === "empty" && (data.tower !== 'full' || data.extension !== 'full' || data.spawn !== 'full'):
                    creep.withdrawFrom(data.storage, RESOURCE_ENERGY)
                    break;

                case creep.memory.carryStorage === "full" && data.tower !== 'full':
                    creep.transferTo(data.tower, RESOURCE_ENERGY)
                    break;

                case creep.memory.carryStorage === "full" && data.spawn !== 'full':
                    creep.transferTo(data.spawn, RESOURCE_ENERGY)
                    break;

                case creep.memory.carryStorage === "full" && data.extension !== 'full':
                    creep.transferTo(data.extension, RESOURCE_ENERGY)
                    break;


                default:
                    creep.moveTo(21,16);
                    creep.transferTo(data.storage, RESOURCE_ENERGY)
                    creep.say("🚬");
                    break;

            }

        }

        if (creepHome === 'W2N6') {

            switch (true) {
                case creep.memory.carryStorage === "empty" && (data.tower !== 'full' || data.extensionLowPower !== 'full' || data.spawn !== 'full'):
                    creep.withdrawFrom(data.storage, RESOURCE_ENERGY)
                    break;

                case creep.memory.carryStorage === "full" && data.tower !== 'full':
                    creep.transferTo(data.tower, RESOURCE_ENERGY)
                    break;

                case creep.memory.carryStorage === "full" && data.spawn !== 'full':
                    creep.transferTo(data.spawn, RESOURCE_ENERGY)
                    break;

                case creep.memory.carryStorage === "full" && data.extensionLowPower !== 'full':
                    creep.transferTo(data.extensionLowPower, RESOURCE_ENERGY)
                    break;


                default:
                    creep.moveTo(24,26);
                    creep.transferTo(data.storage, RESOURCE_ENERGY)
                    creep.say("🚬");
                    break;

            }

        }

        if (creepHome === 'W1N7') {

            switch (true) {
                case creep.memory.carryStorage === "empty" && (data.tower !== 'full' || data.extensionLowPower !== 'full' || data.spawn !== 'full'):
                    creep.withdrawFrom(data.storage, RESOURCE_ENERGY)
                    break;

                case creep.memory.carryStorage === "full" && data.tower !== 'full':
                    creep.transferTo(data.tower, RESOURCE_ENERGY)
                    break;

                case creep.memory.carryStorage === "full" && data.spawn !== 'full':
                    creep.transferTo(data.spawn, RESOURCE_ENERGY)
                    break;

                case creep.memory.carryStorage === "full" && data.extensionLowPower !== 'full':
                    creep.transferTo(data.extensionLowPower, RESOURCE_ENERGY)
                    break;


                default:
                    creep.moveTo(25,20);
                    creep.transferTo(data.storage, RESOURCE_ENERGY)
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












