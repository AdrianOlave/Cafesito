class HomeController {
    home(req, res) {
        res.render('index')
    }
}

module.exports = new HomeController