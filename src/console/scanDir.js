const FileBrowserRepository = require('@src/domains/files/repository/fileBrowserRepository');

class ScanDir {
    static command = 'sdir';

    async run(dir) {

        dir = dir ? dir : '.';

        const repository = new FileBrowserRepository();

        try {
            const result = await repository.getFiles(dir);
            console.log('result', result);
        } catch (error) {
            throw new Error('error' + error);
        }
    }
}

module.exports = ScanDir;
