const fsp = require('fs').promises;
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

class Json2csv {

    constructor(delimiter) {
        this.delimiter = delimiter || ',';
    }

    async toCSV(jsonFilePath, outputPath, filteredFields) {
        try {

            const data = await fsp.readFile(jsonFilePath, 'utf8');
            const jsonArray = JSON.parse(data);

            const csv = this.#generateCSVContent(jsonArray, filteredFields);

            await fsp.writeFile(outputPath, csv, 'utf8');

            console.log('CSV created ');

        } catch (err) {

            console.log(err);
        }
    }

    #generateCSVContent(data, filteredFields) {
        const headers = filteredFields || Object.keys(data[0]);
        const csv = [headers.join(this.delimiter)];

        for (const row of data) {
            const values = headers.map(h => {
                let value = row[h];

                value = String(value).replace(/"/g, '""');

                if (value.includes(',') || value.includes(';')
                    || value.includes('"') || value.includes('\n')) {

                    value = `"${value}"`;
                }
                return value;
            });
            csv.push(values.join(this.delimiter));
        }

        return csv.join('\n');
    }

}

class Archiver {

    constructor(algorithm) {
        this.algorithm = algorithm || 'gzip';
    }

    archive(pathToFile, outputPath) {

        return new Promise((resolve) => {
            const source = fs.createReadStream(pathToFile);
            const destination = fs.createWriteStream(outputPath);
            const algorithm = this.algorithm === 'gzip'
                ? zlib.createGzip()
                : zlib.createDeflate();

            source.pipe(algorithm).pipe(destination);

            destination.on('finish', () => {
                console.log('Archive created');
                resolve();
            });
        });
    }

    unArchive(pathToFile, outputPath) {
        return new Promise((resolve) => {
            const source = fs.createReadStream(pathToFile);
            const destination = fs.createWriteStream(outputPath);
            const algorithm = this.algorithm === 'gzip'
                ? zlib.createGunzip()
                : zlib.createInflate();

            source.pipe(algorithm).pipe(destination);

            destination.on('finish', () => {
                console.log('Archive unarchived');
                resolve();
            });
        });
    }
}

async function main() {

    const converter = new Json2csv(';');

    const archiverGzip = new Archiver();
    const archiverDeflate = new Archiver('Deflate');

    const jsonPath = './data/comments.json';
    const filteredFields = ['postId', 'name', 'body'];

    const filePath = './data/output.csv';

    const archPathGz = './data/output.gz';
    const archPathDef = './data/output.deflate';
    const filePathDef = './data/outputdef.csv';
    const filePathGz = './data/outputgz.csv';

    await converter.toCSV(jsonPath, filePath, filteredFields);

    await archiverGzip.archive(filePath, archPathGz);
    await archiverGzip.unArchive(archPathGz, filePathGz);

    await archiverDeflate.archive(filePath, archPathDef);
    await archiverDeflate.unArchive(archPathDef, filePathDef);
}

main();
