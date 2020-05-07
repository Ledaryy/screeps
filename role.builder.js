
module.exports = {
    run: function (creep) {

        const creepHome = creep.memory.home;
        const creepPosition = creep.room.name;
        const creepCargo = creep.memory.carryStorage;

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

        const storage = fParsingModule(STRUCTURE_STORAGE, RESOURCE_ENERGY, "more", 300);
        let constructionSitesW1N6 = [];
        let constructionSitesW1N7 = [];
        let constructionSitesW2N6 = [];

        let homePosSites = taskManager(creepHome, 'target')
        let nearPosSites = taskManager('empty', 'all')

        if ( homePosSites !== null){
            if (creepPosition === creepHome) { // check is creep at home
                switch (creepCargo) { // main
                    case "empty":
                        if (storage !== null) {
                            fWithdrawEnergy(storage)
                        } else {
                            harvestResources()
                        } // if creep cant find the storage, he will mine nearest source
                        break;
                    case "full":
                        fBuildStructure(constructionSitesW1N6)
                        break;

                    default:
                        break;
                }
            } else { fMoveToExit(creepHome) } // move to home
        } else {

            if (creepPosition != nearPosSites) { fMoveToExit(nearPosSites) }
            if (creepPosition == nearPosSites) {
                switch (creepCargo) { // main
                    case "empty":
                        if (storage !== null) {
                            fWithdrawEnergy(storage)
                        } else {
                            harvestResources()
                        } // if creep cant find the storage, he will mine nearest source
                        break;
                    case "full":
                        fBuildStructure(constructionSitesW1N6)
                        break;

                    default:
                        break;
                }
            }
        }



        function taskManager(creepRoom, fSwitch) {

            if (fSwitch === 'target') {
                constructionSitesW1N6 = fFindSites(creepRoom);
                constructionSitesW1N7 = fFindSites(creepRoom);
                constructionSitesW2N6 = fFindSites(creepRoom);
            }

            if (fSwitch === 'all') {
                constructionSitesW1N6 = fFindSites('W1N6');
                constructionSitesW1N7 = fFindSites('W1N7');
                constructionSitesW2N6 = fFindSites('W2N6');
            }

           if (constructionSitesW1N6 !== null) {
               return constructionSitesW1N6.room.name
           }
           if (constructionSitesW1N7 !== null) {
               return constructionSitesW1N7.room.name
           }
           if (constructionSitesW2N6 !== null) {
               return constructionSitesW2N6.room.name
           }
           return null
        }

        function fBuildStructure() {

            var constractionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            var build = creep.build(constractionSite);
            switch (build) {
                case 0:
                    break;
                case ERR_NOT_IN_RANGE:
                    creep.moveTo(constractionSite);
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
                    creep.moveTo(source)
                    break;
                default:
                    creep.say("🚬");
                    break;

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

                    return null;

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

                    return null;

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

                    return null;

                default:
                    console.log("Wrong math type!!!");
                    break;
            }
        } // v 1.2

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

        function fMoveToExit(fTarget) {

            let exit = creep.room.findExitTo(fTarget);
            let exitPos = creep.pos.findClosestByPath(exit);

            creep.moveTo(exitPos);



        }

        function fFindSites(fRoom) {
            var constructionSitesInRoom = Game.rooms[fRoom].find(FIND_CONSTRUCTION_SITES);
            if (constructionSitesInRoom.length > 0) {
                if (constructionSitesInRoom !== null) {

                    return constructionSitesInRoom[0];
                }
            }
            return null
        }

    }
};