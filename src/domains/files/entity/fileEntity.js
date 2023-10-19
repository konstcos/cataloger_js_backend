
class FileEntity {

    id = null;
    name;
    path;
    isDir;
    extension;
    size;
    creationDate;
    modificationDate;
    isImage;

    imagesExtensions = [
        'jpg', 'jpeg', 'png',
    ];

    constructor(dto) {
        this.id = dto.id;
        this.name = dto.name;
        this.path = dto.path;
        this.isDir = dto.isDir;
        this.extension = dto.extension;
        this.size = dto.size;
        this.creationDate = dto.creationDate;
        this.modificationDate = dto.modificationDate;

        if (this.extension.trim().length === 0) {
            this.extension = this.getFileExtension();
        }

        this.checkIsImage();
    }

    /**
     * Получение расширения файла (если есть)
     *
     * @returns {string}
     */
    getFileExtension() {
        // выходим если имя не заданно
        if (!this.name || this.name.trim().length === 0) {
            return '';
        }

        // выходим если элемент является папкой (у него нет разрешения)
        if (this.isDir) {
            return '';
        }

        // если скрытый файл и в файле нет других точек
        if (this.name.charAt(0) === '.' && !this.name.includes('.', 1)) {
            return '';
        }

        const nameParts = this.name.split('.');
        return nameParts.length >1 ? nameParts.pop() : '';
    }

    checkIsImage() {
        this.isImage = false;

        if (this.isDir) {
            return;
        }

        if (!this.extension || this.extension.length === 0) {
            return;
        }

        if (this.imagesExtensions.includes(this.extension)) {
            this.isImage = true;
        }
    }

    serialize() {
        return {
            id: this.id,
            name: this.name,
            path: this.path,
            isDir: this.isDir,
            extension: this.extension,
            size: this.size,
            creationDate: this.creationDate,
            modificationDate: this.modificationDate,
            isImage: this.isImage,
        };
    }
}

module.exports = FileEntity;
