module.exports = {

    run: function (creep) {

        let currentCreepPosition = creep.room.name;
        const targetPosition = creep.memory.roomTarget;
        const controller = creep.room.controller;

        switch (true) {
            case currentCreepPosition !== targetPosition:

                fMoveToExit(targetPosition);
                break;

            case currentCreepPosition === targetPosition:
                fClaimController(controller);
                break;

            default:
                break;
        }


        function fMoveToExit(fTarget) {

            let exit = creep.room.findExitTo(fTarget);
          let exitPos = creep.pos.findClosestByRange(exit);
            creep.moveTo(exitPos);



        }

        function fClaimController(fController) {
            let claimController = creep.claimController(fController);

            switch (claimController) {
                case ERR_NOT_IN_RANGE:
                    creep.moveTo(fController);
                    break;
                default:
                    break;

            }

        }


















    }
};