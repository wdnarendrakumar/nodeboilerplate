let authRoute = require('./authRoute')
let userRoute = require('./userRoute')
let docsRoute = require('./docsRoute')
let router = require('express').Router()


let defaultRoute = [
    {
        path: '/auth',
        route: authRoute
    },
    {
        path: '/user',
        route: userRoute
    }
]


let devRoute = [
    {
        path: '/docs',
        route: docsRoute
    }
]

defaultRoute.forEach(route => {
    router.use(route.path, route.route)
})

if (process.env.NODEENV === 'developement') {
    devRoute.forEach(route => {
        router.use(route.path, route.route)
    })
}

module.exports = router