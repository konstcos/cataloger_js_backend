const fs = require('fs').promises;
const os = require("os");
const path = require('path');
const FileEntityDTO = require('@src/domains/files/entity/dto/fileEntityDTO');
const FilesAggregate = require('@src/domains/files/aggregate/filesAggregate');

class FileBrowserRepository {

    async getFiles(dir = '.') {
        if (dir === '~' || dir === '~/') {
            dir = os.homedir();
        }

        try {
            const files = await fs.readdir(dir);

            const currentDir = this.extractDirFromPath(dir);
            const filesAggregate = new FilesAggregate(
                new FileEntityDTO(
                    currentDir.dir,
                    currentDir.path,
                    true
                )
            );

            await Promise.all(
                files.map(async (file) => {
                    const fullPath = path.join(dir, file);
                    const stats = await fs.stat(fullPath);
                    const dto = new FileEntityDTO(
                        file,
                        dir,
                        stats.isDirectory()
                    );
                    filesAggregate.add(dto);
                })
            );

            return filesAggregate;
        } catch (error) {
            console.log('An error occurred', error);
            if (error.code === 'ENOENT') {
                throw new Error('Directory not found');
            } else {
                throw error;
            }
        }
    }

    async readImage(path) {
        try {
            // todo добавить возврат mime-type
            return await fs.readFile(path);
        } catch (error) {
            console.log('An error occurred', error);
            if (error.code === 'ENOENT') {
                throw new Error('File not found');
            } else if (error.code === 'EACCES') {
                throw new Error('Access denied');
            } else if (error.code === 'EMFILE') {
                throw new Error('To many opened files in the system');
            } else if (error.code === 'EBUSY') {
                throw new Error('File is busy');
            } else {
                throw new Error('Internal Server Error');
            }
        }
    }

    extractDirFromPath(fullPath) {
        const parts = fullPath.split('/').filter(Boolean);
        const dir = parts.pop();
        const path = '/' + parts.join('/');

        return {
            dir,
            path
        };
    }
}

module.exports = FileBrowserRepository;
