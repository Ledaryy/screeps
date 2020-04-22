

module.exports = {

    run: function (creep) {

        var creepCarryStorage = [];


        if (creep.carry.energy == creep.carryCapacity) {
            creepCarryStorage = 'full';
        } else {
            creepCarryStorage = 'empty';
        }


        switch (creepCarryStorage) {
            case 'empty':
                harvestResources();
                break;
            case 'full':
                fMoveEnergyToLink()
                break;


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


        }
    }
};