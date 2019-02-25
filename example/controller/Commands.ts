import { Facade } from "../../src";
import BoardProxy from "../model/BoardProxy";
import BoardView from "../view/component/BoardView";
import GameMediator from "../view/GameMediator";

const _consoleArgs: string[] = [
    "",
    `background: ${"#3F234E"}`,
    `background: ${"#6E2994"}`,
    `color: ${"#D4BFE0"}; background: ${"#8724BD"};`,
    `background: ${"#6E2994"}`,
    `background: ${"#3F234E"}`
];

export function startupCommand(multitonKey: string, notificationName: string) {
    _consoleArgs[0] = `%c %c %c ${notificationName} =>  startupCommand %c %c `;
    console.log.apply(console, _consoleArgs);
    Facade.getInstance(multitonKey).registerProxy(new BoardProxy());
    Facade.getInstance(multitonKey).registerMediator(new GameMediator());
}

export function dataCommand(multitonKey: string, notificationName: string) {
    _consoleArgs[0] = `%c %c %c ${notificationName} =>  dataCommand %c %c `;
    console.log.apply(console, _consoleArgs);
    switch (notificationName) {
        case BoardView.DATA_GET:
            getProxy(multitonKey, BoardProxy.NAME).jsonDataGet();
            break;
    }
}

export function boardCommand(multitonKey: string, notificationName: string, ...args: any[]) {
    _consoleArgs[0] = `%c %c %c ${notificationName} =>  boardCommand %c %c `;
    console.log.apply(console, _consoleArgs);
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
