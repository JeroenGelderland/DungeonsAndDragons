export default (req) => {
    UPLOAD.single('Appearance')(req, res, (req, res) => {
        req.body.Appearance = req.file.filename

        DATABASE.AddPlayer(new Player(req.body))
    })
}