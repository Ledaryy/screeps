
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

        var creepHome = creep.memory.home
        var mainContainer = fParsingForContainer('W2N6', 24, 27)
        var link = fParsingForLink("W1N6", 17, 9, 0);

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

                   fWithdrawEnergy(mainContainer);
                    break;
                case 'undefined':
                    fUpgradeController();
                    break;
                default:


            }
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
            let target = creep.pos.findClosestByRange(FIND_STRUCTURES,
                {filter: {structureType: STRUCTURE_WALL}});
            if(target) {
                if(creep.dismantle(target) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }

        }

    }
}
















/*



module.exports = {
    // a function to run the logic for this role
    run: function(creep) {
        // if creep is bringing energy to the controller but has no energy left
        if (creep.memory.working == true && creep.carry.energy == 0) {
            // switch state
            creep.memory.working = false;
        }
        // if creep is harvesting energy but is full
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            // switch state
            creep.memory.working = true;
        }

        // if creep is supposed to transfer energy to the controller
        if (creep.memory.working == true) {
            // instead of upgraderController we could also use:
            // if (creep.transfer(creep.room.controller, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {

            // try to upgrade the controller
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                // if not in range, move towards the controller
                creep.moveTo(creep.room.controller);
            }
        }
        // if creep is supposed to harvest energy from source
        else {
            // find closest source
            var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            // try to harvest energy, if the source is not in range
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                // move towards the source
                creep.moveTo(source);
            }
        }
    }
};

        *//**/