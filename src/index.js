const express = require('express');
const http = require('http');
const initializeDb = require('./db');
const bodyParser = require('body-parser');

const Member = require('./models/index').Member;
const Relative = require('./models/index').Relative;
const sequelize = require('./models/index').sequelize;


const app = express();

const port = 3000;

app.server = http.createServer(app);

app.use(bodyParser.json({
}));
app.use(bodyParser.urlencoded({
  extended: false
}));



initializeDb(db => {
  app.listen(port, () => console.log(`Listening on port ${port}!`));



// crud
  app.get('/', async (req, res) => {
    try {
      const members = await Member.findAll({
        include: [
          {
            model: Relative,
            as: 'relatives'
          }
        ]
      });
      return res.json(members);
    } catch (e) {

      res.sendStatus(500);
    }
  });

  app.get('/:id', async (req, res) => {
    try {
      const member = await Member.findOne({
        where: {
          id: req.params.id
        },
        include: [
          {
            model: Relative,
            as: 'relatives'
          }
        ]
      });
      return res.json(member);
    } catch (e) {
      res.sendStatus(500);
    }
  });

  app.post('/', async (req, res, next) => {
    try {
      await sequelize.transaction(async t => {
        const member = await Member.create(req.body, {transaction: t});
        await Relative.create({...req.body, memberId: member.id, relativeId: req.body.relativeId}, {transaction: t});
      });
      res.sendStatus(200);
    } catch (e) {

      res.sendStatus(500);
    }
  });

  app.put('/:id', async (req, res) => {
    try {
      const member = await Member.findOne({
        where: {
          id: req.params.id
        },
        include: [
          {
            model: Member,

          }
        ]
      });
      if (member) {
        const relativeId = req.body;
        delete req.body.relativeId;
        await Member.update({...req.body, relatives: [...member.relatives.map(relative => relative.id), relativeId]});
        res.sendStatus(200);
      } else {
        res.sendStatus(404);
      }
    } catch (e) {

      res.sendStatus(500);
    }
  });

  app.delete('/:id', async (req, res) => {
    try {


      await Member.delete({
        where: {
          id: req.params.id
        }
      });


      res.sendStatus(200);
    } catch (e) {
      res.sendStatus(500);
    }
  });
});



