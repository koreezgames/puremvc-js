export class PureMVC {
    public static debug: boolean = true;

    public static logCommand(consoleArgs: string[], notificationName: string, commandName: string): void {
        consoleArgs[0] = `%c %c %c ${notificationName} =>  ${commandName} %c %c `;
        console.log.apply(console, consoleArgs);
    }

    public static logNotification(consoleArgs: string[], notificationName: string, ...args: any[]): void {
        consoleArgs[0] = `%c %c %c ${notificationName}: args [ ${args} ] %c %c `;
        console.log.apply(console, consoleArgs);
    }

    public static logMediator(consoleArgs: string[], name: string, action: string): void {
        consoleArgs[0] = `%c %c %c ${name}: ${action} %c %c `;
        console.log.apply(console, consoleArgs);
    }

    public static logProxy(consoleArgs: string[], name: string, action: string): void {
        consoleArgs[0] = `%c %c %c ${name}: ${action} %c %c `;
        console.log.apply(console, consoleArgs);
    }

    public static logNone(consoleArgs: string[], ...args: any[]): void {}
}
