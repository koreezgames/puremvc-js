import { Facade } from "../../src";
import BoardProxy from "../model/BoardProxy";
import BoardView from "../view/component/BoardView";
import GameMediator from "../view/GameMediator";

export function startupCommand(multitonKey: string, notificationName: string) {
    Facade.getInstance(multitonKey).registerProxy(new BoardProxy());
    Facade.getInstance(multitonKey).registerMediator(new GameMediator());
}

export function dataCommand(multitonKey: string, notificationName: string) {
    switch (notificationName) {
        case BoardView.DATA_GET:
            getProxy(multitonKey, BoardProxy.NAME).jsonDataGet();
            break;
    }
}

export function boardCommand(multitonKey: string, notificationName: string, ...args: any[]) {
    switch (notificationName) {
        case BoardView.CELL_CLICK:
            getProxy(multitonKey, BoardProxy.NAME).selectCell(args[0]);
            break;
        case BoardView.PLAYER_SELECT:
            getProxy(multitonKey, BoardProxy.NAME).detectPossibleMoves();
            break;
    }
}

function getProxy(multitonKey: string, name: string): BoardProxy {
    return getFacade(multitonKey).retrieveProxy(name);
}

function getFacade(multitonKey: string): Facade {
    return Facade.getInstance(multitonKey);
}
