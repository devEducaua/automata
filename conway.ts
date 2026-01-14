type State = "live" | "dead";

const length = 40;
let table: State[][] = Array.from({ length: length }, () => Array.from({ length: length }, () => "dead"));

const printTable = (table: State[][]) => {
    console.clear();
    for (const row of table) {
        let line = "";
        for (const cell of row) {
            line += cell == "live" ? "̣̉0" : " ";
        }
        console.log(line);
    }
}

const verifyCell = (x: number, y: number) => {
    if (x < 0 || y < 0 || x >= length || y >= length) {
        return "dead";
    } 

    return table[x][y];
}

const nextGen = () => {

    const newTable: State[][] = Array.from({ length: length }, () => Array.from({ length: length }, () => "dead"));
    let neighbours = [];

    for (let x = 0; x < length; x++) {
        
        for (let y = 0; y < length; y++) {
            neighbours = [
                verifyCell(x+1, y+1),
                verifyCell(x, y+1),
                verifyCell(x-1, y+1),
                verifyCell(x+1, y),
                verifyCell(x-1, y),
                verifyCell(x+1, y-1),
                verifyCell(x, y-1),
                verifyCell(x-1, y-1),
            ]

            const liveCount = neighbours.filter(n => n == "live").length;

            if (table[x][y] == "live") {
                if (liveCount === 2 || liveCount === 3) newTable[x][y] = "live";
            }
            else if (table[x][y] == "dead") {
                if (liveCount === 3) newTable[x][y] = "live";
            }
        }
    }

    table = newTable;
}

const gosper: Array<[number, number]> = [
    [5,1],[5,2],[6,1],[6,2],
    [5,11],[6,11],[7,11],
    [4,12],[3,13],[3,14],
    [8,12],[9,13],[9,14],
    [6,15],
    [4,16],[5,17],[6,17],[7,17],[6,18],
    [8,16],
    [3,21],[4,21],[5,21],
    [3,22],[4,22],[5,22],
    [2,23],[6,23],
    [1,25],[2,25],[6,25],[7,25],
    [3,35],[4,35],[3,36],[4,36],
];

for (const [x, y] of gosper) {
    table[x][y] = "live";
}

setInterval(() => {
    nextGen();
    console.clear();
    printTable(table);
}, 500);

