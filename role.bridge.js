module.exports = {

    run: function (creep) {


        var creepCarryStorage = [];
        var creepHome = creep.memory.home;
        var creepPosition = creep.room.name;

        if (creep.carry.energy === creep.carryCapacity) {
            creepCarryStorage = 'full';
        } else if (creep.carry.energy === 0) {
            creepCarryStorage = 'empty';
        } else if (creep.carry.energy > 0 && creep.carry.energy < creep.carryCapacity) {
            creepCarryStorage = 'not full'
        }

        var container = fParsingModule(STRUCTURE_CONTAINER, RESOURCE_ENERGY, "more", 800);
        var storage = fParsingModule(STRUCTURE_STORAGE, RESOURCE_ENERGY, "less", 1000000);
        var link = fParsingForLink("W1N6", 21, 17, 1);
        const linkW2N6 = fParsingForLink("W2N6", 25, 29, 1);
        var droppedResource = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
        var mainContainer = fParsingForContainer('W2N6', 24, 27)

        var ruins = creep.room.find(FIND_RUINS, {
            filter: function(r)
            {
                if (r.store[RESOURCE_ENERGY] > 0) { return r.store[RESOURCE_ENERGY] > 0}
                return null
            }

        });


switch (true) {
    case creepPosition === creepHome:
        if (creepHome === 'W1N6') {

            switch (true) {
                case creepCarryStorage === "full":
                    fTransferEnergy(storage);
                    break;
                case (creepCarryStorage === "empty" || creepCarryStorage === "not full") && link !== 0:
                    fWithdrawEnergy(link)
                    break;
                case creepCarryStorage === "not full" && link === 0:
                    fTransferEnergy(storage);
                    break;
                default:
                    creep.moveTo(20, 16);
                    break;

            }
        }

        if (creepHome === 'W2N6') {

            switch (true) {
                case creepCarryStorage === "full":
                    fTransferEnergy(storage);
                    break;
                case (creepCarryStorage === "empty" || creepCarryStorage === "not full") && linkW2N6 !== 0:
                    fWithdrawEnergy(linkW2N6)
                    break;
                case creepCarryStorage === "not full" && link === 0:
                    fTransferEnergy(storage);
                    break;
                default:
                    creep.moveTo(25, 28);
                    break;

            }
        }

        if (creepHome === 'W1N7') {

            switch (true) {
                case creepCarryStorage === "full":
                    fTransferEnergy(storage);
                    break;
                case (creepCarryStorage === "empty" || creepCarryStorage === "not full") && container !== 0:
                    fWithdrawEnergy(container)
                    break;
                case creepCarryStorage === "not full":
                    fTransferEnergy(storage);
                    break;
                default:
                    switch (true) {
                        case creepCarryStorage === "full":
                            fTransferEnergy(storage);
                            break;
                        case (creepCarryStorage === "empty" || creepCarryStorage === "not full") && ruins !== null:
                            fPickupResource(droppedResource);
                            fWithdrawEnergy(ruins[0])

                            break;
                        case creepCarryStorage === "not full":
                            fTransferEnergy(storage);
                            break;
                        default:

                            creep.moveTo(22, 20);
                            break;
                    }
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

        function fParsingForContainer(roomName, xPosition, yPosition) {
            let cont = Game.rooms[roomName].lookForAt('structure', xPosition, yPosition)[0];
                return cont


        }

        function fParsingForLink(roomName, xPosition, yPosition, neededValue) {
             var link = Game.rooms[roomName].lookForAt('structure', xPosition, yPosition)[0];
            var energyStoredInLink = link.store[RESOURCE_ENERGY];
            if (energyStoredInLink > neededValue) {
                return link
            } else {
                return 0
            }

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
                    creep.moveTo(fResource)
                    break;
                default:
                    console.log("Error in fPickUpResources in heavy freighter module!");
                    break;
            }


        }


        function fTransferEnergy(fStructure) {
            var transferring = creep.transfer(fStructure, RESOURCE_ENERGY);
            switch (transferring) {
                case ERR_NOT_IN_RANGE:
                    creep.moveTo(fStructure);
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












