module.exports = {

    run: function (creep) {



        const data = creep.dataPack()

        const creepHome = creep.memory.home
        const creepPosition = creep.room.name;

        switch (true) {
            case creep.carry.energy === creep.carryCapacity:
                creep.memory.carryStorage = 'full';
                break;

            case creep.carry.energy === 0:
                creep.memory.carryStorage = 'empty';
                break;

            case creep.carry.energy > 0 && creep.carry.energy < creep.carryCapacity:
                creep.memory.carryStorage = "full";
                break;

            default:
                // creep.memory.carryStorage = 'empty'; // temporary
                break;
        }

        /*  var ruins = creep.room.find(FIND_RUINS, {
                filter: function(r)
                {
                    if (r.store[RESOURCE_ENERGY] > 0) { return r.store[RESOURCE_ENERGY] > 0}
                    return null
                }

            });
    */

        switch (true) {
            case creepPosition === creepHome:
                if (creepHome === 'W1N6') {

                    switch (true) {
                        case creep.memory.carryStorage === "full" && data.storage.store[RESOURCE_ENERGY] !== data.storage.storeCapacity:
                            creep.transferTo(data.storage, RESOURCE_ENERGY);
                            break;
                        case creep.memory.carryStorage === "empty" && data.linkW1N6 !== "empty":
                            creep.withdrawFrom(data.linkW1N6, RESOURCE_ENERGY)
                            break;
                        case creep.memory.carryStorage === "full" && data.storage.store[RESOURCE_ENERGY] === data.storage.storeCapacity:
                            creep.transferTo(data.terminal, RESOURCE_ENERGY)
                            break;
                        default:
                            creep.moveTo(20, 16);
                            break;

                    }
                }

                if (creepHome === 'W2N6') {

                    switch (true) {
                        case creep.memory.carryStorage === "full":
                            creep.transferTo(data.storage, RESOURCE_ENERGY);
                            break;
                        case creep.memory.carryStorage === "empty" && data.linkW2N6 !== "empty":
                            creep.withdrawFrom(data.linkW2N6, RESOURCE_ENERGY)
                            break;
                        default:
                            creep.moveTo(25, 28);
                            break;

                    }
                }

                if (creepHome === 'W1N7') {

                    switch (true) {
                        case creep.memory.carryStorage === "full":
                            creep.transferTo(data.storage, RESOURCE_ENERGY);
                            break;
                        case creep.memory.carryStorage === "empty" && data.linkW1N7 !== "empty":
                            creep.withdrawFrom(data.linkW1N7, RESOURCE_ENERGY)
                            break;
                        default:
                            creep.moveTo(24, 22);
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












