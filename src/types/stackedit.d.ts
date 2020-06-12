declare module "stackedit-js" {
    export default class Stackedit {
        constructor();
        openFile(
            options: { name: string; content: { text: string } },
            silent?: boolean
        ): void;
        on(event: "fileChange" | "close", handler: (file: any) => void): void;
        close(): void;
    }
}
