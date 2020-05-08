module.exports = {

    run: function (creep) {

        const mainTargetRoom = creep.memory.targetRoom
        const creepPosition = creep.room.name

        if (mainTargetRoom === 'empty') {fMoveToWaitingPos()}
        if (mainTargetRoom !== 'empty') {
            if (creepPosition === mainTargetRoom){
                fAttackEnemy()
            } else {
                fMoveToRoom(mainTargetRoom)
            }

        }







        function fMoveToWaitingPos() {
            let x = 31;
            let y = 8;
            creep.moveTo(x,y)
        }

        function fMoveToRoom(fTarget) {

            let exit = creep.room.findExitTo(fTarget);
            let exitPos = creep.pos.findClosestByPath(exit);

            creep.moveTo(exitPos);



        }

        function fAttackEnemy() {
            let hostile = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES, {
                filter: (h) => h.structureType === STRUCTURE_RAMPART
            });
            const hostileDoor = Game.rooms['W1N7'].lookForAt('structure', 24,27 )[0];
            switch (creep.attack(hostileDoor)) {
                case OK:
                    creep.say('⛏️')
                    break;
                case ERR_NOT_IN_RANGE:
                    creep.moveTo(hostileDoor)
                    break;
                default:
                    creep.say('Error')
                    break;


            }


        }


    }
};












