var roleRepairer = require('role.repairer')
module.exports = {
    run: function (creep) {

        let creepCurrentPosition = creep.room.name;
        const homePosition = 'W1N6';


        var creepCarryStorage = [];

        if (creep.carry.energy === creep.carryCapacity) {
            creepCarryStorage = 'full';
        } else if (creep.carry.energy === 0) {
            creepCarryStorage = 'empty';
        } else if (creep.carry.energy > 0 && creep.carry.energy < creep.carryCapacity) {
            creepCarryStorage = 'not full'
        }


        var storage = fParsingModule(STRUCTURE_STORAGE, RESOURCE_ENERGY, "less", 1000000);
        let constructionSitesHome = fFindSites(homePosition);
        let constructionSitesW2N6 = fFindSites('W2N6');


        var currentTask = [];




        switch (true) {

            case creepCarryStorage === 'empty' && creepCurrentPosition === homePosition:
                fWithdrawEnergy(storage);
                break;

            case creepCarryStorage === 'empty' && creepCurrentPosition !== homePosition:
                fMoveToExit(homePosition);
                break;

            case (creepCarryStorage === 'full' || creepCarryStorage === 'not full') &&
            creepCurrentPosition === homePosition && constructionSitesHome !== 0:
                fBuildStructure(constructionSitesHome);
                break;

            case (creepCarryStorage === 'full' || creepCarryStorage === 'not full') &&
            creepCurrentPosition !== homePosition && constructionSitesHome !== 0:
                fMoveToExit(homePosition);
                break;

            case (creepCarryStorage === 'full' || creepCarryStorage === 'not full') &&
            creepCurrentPosition === homePosition && constructionSitesW2N6 !== 0:
                fMoveToExit('W2N6');
                break;

            case (creepCarryStorage === 'full' || creepCarryStorage === 'not full') &&
            creepCurrentPosition === 'W2N6' && constructionSitesW2N6 !== 0:
                fBuildStructure(constructionSitesW2N6);
                break;


            default:

                break;

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
                    roleRepairer.run(creep);
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
            let exitPos = creep.pos.findClosestByRange(exit);

            creep.moveTo(exitPos);



        }

        function fFindSites(fRoom) {
            var constructionSitesInRoom = Game.rooms[fRoom].find(FIND_CONSTRUCTION_SITES);
            if (constructionSitesInRoom.length > 0) {
                if (constructionSitesInRoom !== null) {

                    return constructionSitesInRoom;
                }
            }
            return 0
        }

    }
};