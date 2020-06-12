export class Correction {
    constructor(
        public points: number,
        public maximumPoints: number,
        public markdown: string,
        public name: string,
        public presentTask: number | null
    ) {}
}
