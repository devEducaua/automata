type Cell = "1" | "0"

const generateFirstRow = (rowLength: number): Cell[] => {
    const row: Cell[] = [];

    for (let i = 0; i < rowLength; i++) {
        const rd: number = Math.floor(Math.random() * 2);

        let char: Cell = "0";
        if (rd == 0) char = "0"; 
        if (rd == 1) char = "1"; 

        row.push(char);
    }

    return row;
}

const transform = (cell: Cell): string => {
    if (cell == "1") return "*";
    return " ";
}

const printRow = (row: Cell[]) => {
    process.stdout.write("|");
    for (let i = 0; i < row.length; i++) {
        process.stdout.write(transform(row[i]));
    }
    process.stdout.write("|");
    process.stdout.write("\n");
}

const verifyPattern = (prev: Cell, current: Cell, next: Cell): Cell | null => {
    if (prev == "0" && current == "0" && next == "0") return "0";
    else if (prev == "0" && current == "0" && next == "1") return "1";
    else if (prev == "0" && current == "1" && next == "0") return "1";
    else if (prev == "0" && current == "1" && next == "1") return "1";
    else if (prev == "1" && current == "0" && next == "0") return "0";
    else if (prev == "1" && current == "0" && next == "1") return "1";
    else if (prev == "1" && current == "1" && next == "0") return "1";
    else if (prev == "1" && current == "1" && next == "1") return "0";
    return null;
}

const nextRow = (prevRow: Cell[]) => {
    const nextRow: Cell[] = [];

    nextRow.push("0");
    for (let i = 1; i < row.length - 1; i++) {
        const cellValue = verifyPattern(prevRow[i-1], prevRow[i], prevRow[i+1]);
        if (cellValue == null) throw new Error(`could not read cell: ${prevRow}`);
        nextRow.push(cellValue);
    }
    nextRow.push("0");

    return nextRow;
}

const rowLength = 60;
const iterations = 30;
let row = generateFirstRow(rowLength);

for (let i = 0; i < iterations; i++) {
    printRow(row);
    row = nextRow(row);
}

