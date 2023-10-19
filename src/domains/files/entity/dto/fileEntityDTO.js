class FileEntityDTO {
    id = null;
    name;
    path;
    isDir = false;
    extension = '';
    size = 0;
    creationDate = '';
    modificationDate = '';

    constructor(name, path, isDir = false) {
        this.name = name;
        this.path = path;
        this.isDir = isDir;
    }
}

module.exports = FileEntityDTO;
