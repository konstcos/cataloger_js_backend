const FileBrowserRepository = require('@src/domains/files/repository/fileBrowserRepository');

class FileBrowserUseCase {
    constructor() {
        this.fileBrowserRepository = new FileBrowserRepository();
    }

    async dirList(path) {
        return await this.fileBrowserRepository.getFiles(path);
    }

    async readImage(path) {
        return await this.fileBrowserRepository.readImage(path);
    }
}

module.exports = FileBrowserUseCase;
