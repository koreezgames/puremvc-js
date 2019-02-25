// ------------------------------------------------------------------------------
//  Copyright (c) 2018 Koreez LLC. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { assert } from "chai";
import { Facade, Mediator, Proxy } from "../../../../src";
import "../../../entry";

describe("puremvc", () => {
    it("Faced", done => {
        const config = {
            create
        };

        function create() {
            const facade = Facade.getInstance("faced");
            assert.instanceOf(facade, Facade);
            done();
        }

        (window as any).game = new Phaser.Game(800, 600, Phaser.CANVAS, null, config);
    });

    it("Command", done => {
        const config = {
            create
        };

        function create() {
            const facade = Facade.getInstance("faced");
            facade.registerCommand("notification", (mk: string, name: string) => {
                assert.equal("notification", name);
                done();
            });
            facade.sendNotification("notification");
        }

        (window as any).game = new Phaser.Game(800, 600, Phaser.CANVAS, null, config);
    });

    it("Proxy", done => {
        class TestData {}

        class TestProxy extends Proxy<TestData> {}

        const config = {
            create
        };

        function create() {
            const facade = Facade.getInstance("faced");
            facade.registerProxy(new TestProxy("TestProxy", new TestData()));
            facade.registerCommand("notification", (mk: string, name: string) => {
                const testProxy = facade.retrieveProxy("TestProxy");
                assert.instanceOf(testProxy, TestProxy);
                assert.instanceOf(testProxy.getData(), TestData);
                done();
            });
            facade.sendNotification("notification");
        }

        (window as any).game = new Phaser.Game(800, 600, Phaser.CANVAS, null, config);
    });

    it("Mediator", done => {
        class TestMediator extends Mediator<Phaser.World> {
            public handledNotifications: number = 0;

            constructor(vc: Phaser.World) {
                super("TestMediator", vc);
                this.subscribeNotification("notification");
            }

            public handleNotification(notificationName: string): void {
                assert.equal("notification", notificationName);
                assert.instanceOf(this.viewComponent, Phaser.World);
                ++this.handledNotifications;
            }

            public removeHandler(): void {
                this.unsubscribeNotification("notification");
            }

            public addHandler(): void {
                this.subscribeNotification("notification");
            }
        }

        const config = {
            create
        };

        function create() {
            const facade = Facade.getInstance("faced");
            const testMediator = new TestMediator(this.game.world);
            facade.registerMediator(testMediator);
            let handledNotifications = 0;
            facade.sendNotification("notification");
            ++handledNotifications;
            testMediator.removeHandler();
            facade.sendNotification("notification");
            facade.sendNotification("notification");
            facade.sendNotification("notification");
            testMediator.addHandler();
            setTimeout(() => {
                facade.sendNotification("notification");
                ++handledNotifications;
                facade.sendNotification("notification");
                ++handledNotifications;
                facade.sendNotification("notification");
                ++handledNotifications;
                testMediator.removeHandler();
                setTimeout(() => {
                    facade.sendNotification("notification");
                    facade.sendNotification("notification");
                    facade.sendNotification("notification");
                    testMediator.addHandler();
                    setTimeout(() => {
                        facade.sendNotification("notification");
                        ++handledNotifications;
                        facade.sendNotification("notification");
                        ++handledNotifications;
                        assert.equal(handledNotifications, testMediator.handledNotifications);
                        done();
                    }, 200);
                }, 200);
            }, 200);
        }

        (window as any).game = new Phaser.Game(800, 600, Phaser.CANVAS, null, config);
    });
});
