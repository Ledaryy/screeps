// import './fGlobals'

module.exports = {

    run: function (creep) {


        var creepCarryStorage = [];
        var creepHome = creep.memory.home
        var creepPosition = creep.room.name

        if (creep.carry.energy === creep.carryCapacity) {
            creepCarryStorage = 'full';
        } else if (creep.carry.energy === 0) {
            creepCarryStorage = 'empty';
        } else if (creep.carry.energy > 0 && creep.carry.energy < creep.carryCapacity) {
            creepCarryStorage = 'not full'
        }

        var spawn = fParsingModule(STRUCTURE_SPAWN, RESOURCE_ENERGY, "less", 300);
        var extension = fParsingModule(STRUCTURE_EXTENSION, RESOURCE_ENERGY, "less", 100);
        var extension1 = fParsingModule(STRUCTURE_EXTENSION, RESOURCE_ENERGY, "less", 50);
        var tower = fParsingModule(STRUCTURE_TOWER, RESOURCE_ENERGY, "less", 600);
        var storage = fParsingModule(STRUCTURE_STORAGE, RESOURCE_ENERGY, "less", 1000000);
        var container = fParsingModule(STRUCTURE_CONTAINER, RESOURCE_ENERGY, "more", 10);
        var droppedResource = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
        var currentTask = [];

switch (true) {
    case creepPosition === creepHome:
        if (creepHome === 'W1N6') {

            switch (true) {
                case creepCarryStorage === "empty" && (tower !== 0 || extension !== 0 || spawn !== 0):
                    currentTask = "Withdraw energy";
                    fWithdrawEnergy(storage);
                    break;

                case (creepCarryStorage === 'full' || creepCarryStorage === 'not full') && tower !== 0:

                    fTransferEnergy(tower);
                    break;

                case (creepCarryStorage === 'full' || creepCarryStorage === 'not full') && spawn !== 0:
                    currentTask = "Move e spawn";
                    fTransferEnergy(spawn);
                    break;

                case (creepCarryStorage === 'full' || creepCarryStorage === 'not full') && extension !== 0:
                    currentTask = "Move e e2xt";
                    fTransferEnergy(extension);
                    break;


                default:
                    creep.moveTo(21,16);
                    fTransferEnergy(storage);
                    creep.say("🚬");
                    break;

            }

        }

        if (creepHome === 'W2N6') {

            switch (true) {
                case creepCarryStorage === "empty" && (tower !== 0 || extension !== 0 || spawn !== 0):

                    fWithdrawEnergy(storage);
                    break;

                case (creepCarryStorage === 'full' || creepCarryStorage === 'not full') && tower !== 0:

                    fTransferEnergy(tower);
                    break;

                case (creepCarryStorage === 'full' || creepCarryStorage === 'not full') && spawn !== 0:

                    fTransferEnergy(spawn);
                    break;

                case (creepCarryStorage === 'full' || creepCarryStorage === 'not full') && extension1 !== 0:

                    fTransferEnergy(extension1);
                    break;



                default:
                    creep.moveTo(24,26);
                    fTransferEnergy(storage);
                    creep.say("🚬");
                    break;

            }

        }

        if (creepHome === 'W1N7') {

            switch (true) {
                case creepCarryStorage === "empty" && (tower !== 0 || extension !== 0 || spawn !== 0):

                    fWithdrawEnergy(storage);
                    break;

                case (creepCarryStorage === 'full' || creepCarryStorage === 'not full') && tower !== 0:

                    fTransferEnergy(tower);
                    break;

                case (creepCarryStorage === 'full' || creepCarryStorage === 'not full') && spawn !== 0:

                    fTransferEnergy(spawn);
                    break;

                case (creepCarryStorage === 'full' || creepCarryStorage === 'not full') && extension1 !== 0:

                    fTransferEnergy(extension1);
                    break;


                default:
                    creep.moveTo(25,20);
                    fTransferEnergy(storage);
                    creep.say("🚬");
                    break;

            }

        }
        break;

    default:
        fMoveToExit(creepHome)
        break;
}





        function fMoveToExit(fTarget) {

            let exit = creep.room.findExitTo(fTarget);
            let exitPos = creep.pos.findClosestByRange(exit);

            creep.moveTo(exitPos);



        }

        function fParsingModule(structureType, energyType, math, neededValue ) { // math can be "more" "less" "equal"
            var foundedStructures = creep.room.find(FIND_STRUCTURES, {
                filter: (s) => s.structureType == structureType
            });
            var foundedCorrectStructures = [];
            var bestPath = [];

            switch (math) {
                case "more":
                    if (foundedStructures.length > 0) {
                        for (let structure of foundedStructures ){
                            var energyOfStructure = structure.store[energyType];
                            if (energyOfStructure > neededValue) {
                                foundedCorrectStructures.push(structure)

                            } // We looking fo structure which have > than neededValue
                        } // import wants a array of structures
                        bestPath = creep.pos.findClosestByPath(foundedCorrectStructures);
                        if (bestPath !== null){
                            return bestPath;
                        }

                    }

                    return 0;
                    break;
                case "less":
                    if (foundedStructures.length > 0) {
                        for (let structure of foundedStructures ){
                            var energyOfStructure = structure.store[energyType];
                            if (energyOfStructure < neededValue) {
                                foundedCorrectStructures.push(structure)
                            } // We looking fo structure which have > than neededValue
                        } // import wants a array of structures
                        bestPath = creep.pos.findClosestByPath(foundedCorrectStructures);
                        if (bestPath !== null){
                            return bestPath;
                        }
                    }

                    return 0;
                    break;
                case "equal":
                    if (foundedStructures.length > 0) {
                        for (let structure of foundedStructures ){
                            var energyOfStructure = structure.store[energyType];
                            if (energyOfStructure === neededValue) {
                                foundedCorrectStructures.push(structure)

                            } // We looking fo structure which have > than neededValue
                        } // import wants a array of structures
                        bestPath = creep.pos.findClosestByPath(foundedCorrectStructures);
                        if (bestPath !== null){
                            return bestPath;
                        }
                    }

                    return 0;
                    break;
                default:
                    console.log("Wrong math type!!!");
                    break;
            }
        } // v 1.1


        function fPickupResource(fResource) {
            var pickUp = creep.pickup(fResource);
            switch (pickUp) {
                case ERR_NOT_IN_RANGE:
                    creep.moveTo(fResource, {visualizePathStyle: {stroke: '#00ff0b'}});
                    break;

                default:

                    break;
            }


        }


        function fTransferEnergy(fStructure) {
            var transferring = creep.transfer(fStructure, RESOURCE_ENERGY);
            switch (transferring) {
                case ERR_NOT_IN_RANGE:
                    creep.moveTo(fStructure, {visualizePathStyle: {stroke: '#ff0100'}});
                    break;

                default:

                    break;
            }
        }


        function fWithdrawEnergy(fStorage) {
            var withdrawing = creep.withdraw(fStorage, RESOURCE_ENERGY);
            switch (withdrawing) {
                case ERR_NOT_IN_RANGE:
                    creep.moveTo(fStorage, {visualizePathStyle: {stroke: '#fffcf3'}});
                    break;

                default:

                    break;
            }
        }









    }

};












