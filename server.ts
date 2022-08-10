

import * as express from 'express';
import {Application} from "express";
import {getAllCourses} from './server/get-courses.route';
import {saveCourse} from './server/save-course.route';
import { heroes, tests} from './server/heros.route';
import { searchHeroes} from './server/hero-search.route';

const bodyParser = require('body-parser');
require('cors')
const app: Application = express();

app.use(bodyParser.json());

app.route('/api/courses').get(getAllCourses);

app.route('/api/courses/:id').put(saveCourse);

app.route('/boruto/heroes').get(heroes)

app.route('/boruto/heroes/search').get(searchHeroes)
app.route('/photos').get(tests)


app.use('/images', express.static('./server/images'));

const httpServer = app.listen(9000, () => {
    console.log("HTTP REST API Server running at http://localhost:" + httpServer.address().port);
});



