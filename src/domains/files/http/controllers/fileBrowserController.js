const FileBrowserUseCase = require('@src/domains/files/usecase/fileBrowserUseCase');


class FileBrowserController {
    async dirList(req, res) {
        const dir = req.body.dir
        const useCase = new FileBrowserUseCase();

        try {
            const result = await useCase.dirList(dir);
            res.status(200).send({
                files: result.serialize(),
            });
        } catch (error) {
            res.status(500).send({
                error: "Server error",
                message: "Error receiving files",
            })
        }
    }

    async image(req, res) {
        const imgPath = req.query.path;
        const useCase = new FileBrowserUseCase();
        try {
            const result = await useCase.readImage(imgPath);
            res.writeHead(200, {
                'Content-Type': 'image/jpeg'
            });
            res.end(result)
        } catch (error) {
            // todo добавить обработку других статусов ошибок
            res.status(500).send({
                error: "new Server error",
                message: "new Error receiving files",
            })
        }

    }
}

module.exports = FileBrowserController;
