// import './fGlobals'

module.exports = {

    run: function (creep) {


        var creepCarryStorage = [];


        if (creep.carry.energy === creep.carryCapacity) {
            creepCarryStorage = 'full';
        } else if (creep.carry.energy === 0) {
            creepCarryStorage = 'empty';
        } else if (creep.carry.energy > 0 && creep.carry.energy < creep.carryCapacity) {
            creepCarryStorage = 'not full'
        }

        var spawn = fParsingModule(STRUCTURE_SPAWN, RESOURCE_ENERGY, "less", 300);
        var extension = fParsingModule(STRUCTURE_EXTENSION, RESOURCE_ENERGY, "less", 100);
        var tower = fParsingModule(STRUCTURE_TOWER, RESOURCE_ENERGY, "less", 1000);
        var storage = fParsingModule(STRUCTURE_STORAGE, RESOURCE_ENERGY, "less", 1000000);
        var container = fParsingModule(STRUCTURE_CONTAINER, RESOURCE_ENERGY, "more", 10);
        var droppedResource = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
        var currentTask = [];



        switch (true) {
             case creepCarryStorage === "empty" && (tower !== 0 || extension !== 0 || spawn !== 0):
            currentTask = "Withdraw energy";
            fWithdrawEnergy(storage);
            break;

            case (creepCarryStorage === 'full' || creepCarryStorage === 'not full') && spawn !== 0:
                currentTask = "Move e spawn";
                fTransferEnergy(spawn);
                break;

            case (creepCarryStorage === 'full' || creepCarryStorage === 'not full') && extension !== 0:
                currentTask = "Move e e2xt";
                fTransferEnergy(extension);
                break;

            case (creepCarryStorage === 'full' || creepCarryStorage === 'not full') && tower !== 0:
                currentTask = "Move e tower";
                fTransferEnergy(tower);
                break;

         // case creepCarryStorage === 'not full' && tower !== 0 && extension !== 0 && spawn !== 0:
         //     fWithdrawEnergy(storage);
         //     break; // withdrawing energy from storage while have no job

        /*  case droppedResource !== null && creepCarryStorage === "full":
              currentTask = "Move e storage";
              fTransferEnergy(storage);
              break;

          case droppedResource !== null && (creepCarryStorage === "empty" || creepCarryStorage === "not full"):
              currentTask = "pick up shit";
              fPickupResource(droppedResource);
              break;
*/ // PickUp Module for freighter
            default:
                creep.say("🚬");
                break;

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












