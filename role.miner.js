
module.exports = {

    run: function (creep) {

        const creepHome = creep.memory.home
        const creepPosition = creep.room.name;
        const container = fParsingModule(STRUCTURE_CONTAINER, RESOURCE_ENERGY, "more", -1);


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
                        harvestResources()
                        break;

                    case creepPosition === 'W1N6' && creep.memory.carryStorage === 'full':
                        fMoveEnergyToLink()
                        break;

                    case creepPosition === 'W2N6' && creep.memory.carryStorage === 'full':
                        fMoveEnergyToLink()
                        break;

                    case creepPosition === 'W2N6' && creep.memory.carryStorage === 'empty':
                        harvestResources()
                        break

                    case creepPosition === 'W1N7' && creep.memory.carryStorage === 'full':
                        fTransferEnergy(container)
                        break;

                    case creepPosition === 'W1N7' && creep.memory.carryStorage === 'empty':
                        harvestResources()
                        break



                    default:
                        break;
                } // when creep at home
                break;

            case creepPosition !== creepHome:
                fMoveToExit(creepHome);
                break;

            default:
                break;
        } // Main Logic

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

        function fUpgradeController() {

            let controller = creep.room.controller;
            let build = creep.upgradeController(controller);
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

        function harvestResources() {
            var source = creep.pos.findClosestByPath(FIND_SOURCES);
            var harvestSource = creep.harvest(source);
            switch (harvestSource) {
                case 0:

                    break;
                case ERR_NOT_IN_RANGE:
                    fMoveToByCreepRole();
                    break;
                default:
                    creep.say("🚬");
                    break;

            }
        }

        function fMoveToByCreepRole() {
            let room = creep.memory.home;
            let position = creep.memory.position;

            switch (true) {
                case room === 'W1N6' && position === 'first':
                    creep.moveTo(44,27); // 44,27
                    break;

                case room === 'W1N6' && position === 'second':
                    creep.moveTo(39,39);
                    break;

                case room === 'W2N6' && position === 'first':
                    creep.moveTo(45,29);
                    break;

                case room === 'W2N6' && position === 'second':
                    creep.moveTo(5,13);
                    break;

                case room === 'W1N7' && position === 'first':
                    creep.moveTo(25,10);
                    break;

                case room === 'W1N7' && position === 'second':
                    creep.moveTo(34,34);
                    break;



                default:
                    break;
            }


        }

        function fMoveEnergyToLink() {
            var link = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: s => s.structureType === STRUCTURE_LINK
            });
            var moveEnergyToLink = creep.transfer(link, RESOURCE_ENERGY);
            switch (moveEnergyToLink) {
                case 0:

                    break;
                case ERR_NOT_IN_RANGE:
                    creep.moveTo(link);
                    break;
                case ERR_INVALID_TARGET:

                    break;
                case ERR_FULL:

                    break;
                default:

                    console.log("Err in fMoveEnergyToLink in harvest module!");
                    break;
            }
        }

        function fMoveToExit(fTarget) {

            let exit = creep.room.findExitTo(fTarget);
            let exitPos = creep.pos.findClosestByRange(exit);

            creep.moveTo(exitPos);



        }


    }
};