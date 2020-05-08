module.exports = {

    run: function (creep) {

        const creepHome = creep.memory.home;
        const creepPosition = creep.room.name;
        const roomTarget = creep.memory.roomTarget

        function fMoveToExit(fTarget) {

            let exit = creep.room.findExitTo(fTarget);
            let exitPos = creep.pos.findClosestByPath(exit);

            creep.moveTo(exitPos);



        }

        if (creepPosition !== roomTarget){
            fMoveToExit(roomTarget);
            Memory.scout.W2N7 = false
        }
        if (creepPosition === roomTarget){
            creep.moveTo(23, 30);
            Memory.scout.W2N7 = true
        }



        function fMoveToExit(fTarget) {

            let exit = creep.room.findExitTo(fTarget);
            let exitPos = creep.pos.findClosestByPath(exit);

            creep.moveTo(exitPos);



        }

    }

};












