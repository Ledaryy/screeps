
module.exports = {
    run: function (creep) {

        var creepCarryStorage = [];
        if (creep.carry.energy === creep.carryCapacity) {
            creepCarryStorage = 'full';
        } else if (creep.carry.energy === 0) {
            creepCarryStorage = 'empty';
        } else {

            creepCarryStorage = 'undefined'
        }

        var creepLocation = creep.room.name
        var creepHome = creep.memory.home
        var mainContainer = fParsingForContainer('W2N6', 24, 27)
        var link = fParsingForLink("W1N6", 17, 9, 0);
        var storage = fParsingModule(STRUCTURE_STORAGE, RESOURCE_ENERGY, 'less', 1000000)

if (creepLocation !== creepHome){
    fMoveToExit(creepHome)
} else {
    if (creepHome === 'W1N6') {

        switch (creepCarryStorage) {
            case 'full':
                fUpgradeController();
                break;
            case 'empty':

                fWithdrawEnergy(link);
                break;
            case 'undefined':
                fUpgradeController();
                break;
            default:


        }
    }

    if (creepHome === 'W2N6') {

        switch (creepCarryStorage) {
            case 'full':
                fUpgradeController();
                break;
            case 'empty':

                fWithdrawEnergy(storage);
                break;
            case 'undefined':
                fUpgradeController();
                break;
            default:


        }
    }

    if (creepHome === 'W1N7') {

        switch (creepCarryStorage) {
            case 'full':
                fUpgradeController();
                break;
            case 'empty':

                fWithdrawEnergy(storage);
                break;
            case 'undefined':
                fUpgradeController();
                break;
            default:


        }
    }
}
        function harvestResources() {
            var source = creep.pos.findClosestByPath(FIND_SOURCES);
            var harvestSource = creep.harvest(source);
            switch (harvestSource) {
                case 0:

                    break;
                case ERR_NOT_IN_RANGE:
                    creep.moveTo(source);
                    break;
                default:
                    creep.say("🚬");
                    break;

            }
        }

        function fMoveToExit(fTarget) {

            let exit = creep.room.findExitTo(fTarget);
            let exitPos = creep.pos.findClosestByPath(exit);

            creep.moveTo(exitPos);



        }

        function fParsingForContainer(roomName, xPosition, yPosition) {
            let cont = Game.rooms[roomName].lookForAt('structure', xPosition, yPosition)[0];
            return cont


        }

        function fUpgradeController() {

            var controller = creep.room.controller;
            var build = creep.upgradeController(controller);
            switch (build) {
                case 0:
                    break;
                case ERR_NOT_IN_RANGE:
                    creep.moveTo(controller);
                    break;
                default:
                    break;

            }
        }

        function fWithdrawEnergy(fStorage) {
            var withdrawing = creep.withdraw(fStorage, RESOURCE_ENERGY);
            switch (withdrawing) {
                case ERR_NOT_IN_RANGE:
                    creep.moveTo(fStorage);
                    break;
                default:

                    break;
            }
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
        
        function fDismantle() {
            let target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (s) => s.structureType === STRUCTURE_EXTENSION
            });
            if(target) {
                if(creep.dismantle(target) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
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

    }
}

