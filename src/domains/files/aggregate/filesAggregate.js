const FileEntity = require('@src/domains/files/entity/fileEntity');

class FilesAggregate {

    currentFolder;
    contents = [];

    constructor(fileEntityDTO) {
        this.currentFolder = new FileEntity(fileEntityDTO);
    }

    add(fileEntityDTO) {
        this.contents.push(
            new FileEntity(fileEntityDTO)
        )
    }

    serialize() {
        const serializedData = {
            currentFolder: this.currentFolder.serialize(),
            contents: [],
        };

        for (const item of this.contents) {
            serializedData.contents.push(
                item.serialize()
            )
        }

        return serializedData;
    }
}

module.exports = FilesAggregate;
