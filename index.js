// dependencias
const express = require('express');
const mongoose = require('mongoose');

// config
const port = process.env.PORT        || 3000;
const db   = process.env.MONGODB_URI || 'mongodb://localhost/trivia';

// objeto app
const app = express();

// conectarse a la base de datos
mongoose.set('useFindAndModify', false);
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log(`DB connected @ ${db}`);
  })
.catch(err => console.error(`Connection error ${err}`));

// schema y modelo de pregunta
const QuestionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  answers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Answer' }]
});

const Question = mongoose.model('Question', QuestionSchema);

const AnswerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  isRight: { type: Boolean, default: false },
  question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' }
});

const Answer = mongoose.model('Answer', AnswerSchema);

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// config de vistas
app.set('view engine', 'pug');
app.set('views', './views');

// rutas
app.post('/question', (req, res) => {
  let question = new Question({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.question
  });
  let answerA = new Answer({
    title: req.body.answerA,
    isRight: req.body.checkboxA,
    question: question._id
  });
  let answerB = new Answer({
    title: req.body.answerB,
    isRight: req.body.checkboxB,
    question: question._id
  });
  let answerC = new Answer({
    title: req.body.answerC,
    isRight: req.body.checkboxC,
    question: question._id
  });
  let answerD = new Answer({
    title: req.body.answerD,
    isRight: req.body.checkboxD,
    question: question._id
  });
  question.answers.push(answerA);
  question.answers.push(answerB);
  question.answers.push(answerC);
  question.answers.push(answerD);
  question.save(err => {
    answerA.save();
    answerB.save();
    answerC.save();
    answerD.save();
    res.redirect('/');
  });
});

app.get('/borrar', (req, res) => {
	Question.remove({}, function(err) { 
   console.log('collection removed') 
   res.redirect('/');
});
});

app.get('/', (req, res) => {
  Question.find().populate('answers').exec((err, questions) => {
	//let questions = [{"answers":[{"isRight":false,"_id":"5da52ce38207400017ab8c77","title":"6","question":"5da52ce28207400017ab8c75","__v":0},{"isRight":false,"_id":"5da52ce38207400017ab8c78","title":"3","question":"5da52ce28207400017ab8c75","__v":0},{"isRight":true,"_id":"5da52ce38207400017ab8c79","title":"4","question":"5da52ce28207400017ab8c75","__v":0},{"isRight":false,"_id":"5da52ce38207400017ab8c7a","title":"97","question":"5da52ce28207400017ab8c75","__v":0}],"_id":"5da52ce28207400017ab8c75","title":"2 + 2 = ?","__v":0},{"answers":[{"isRight":false,"_id":"5da5f7e3471942001772639b","title":"18","question":"5da5f7e34719420017726399","__v":0},{"isRight":false,"_id":"5da5f7e3471942001772639c","title":"20","question":"5da5f7e34719420017726399","__v":0},{"isRight":false,"_id":"5da5f7e3471942001772639d","title":"17","question":"5da5f7e34719420017726399","__v":0},{"isRight":false,"_id":"5da5f7e3471942001772639e","title":"1000000","question":"5da5f7e34719420017726399","__v":0}],"_id":"5da5f7e34719420017726399","title":"9+9","__v":0},{"answers":[{"isRight":true,"_id":"5da5f7e647194200177263a5","title":"18","question":"5da5f7e647194200177263a3","__v":0},{"isRight":false,"_id":"5da5f7e647194200177263a6","title":"20","question":"5da5f7e647194200177263a3","__v":0},{"isRight":false,"_id":"5da5f7e647194200177263a7","title":"17","question":"5da5f7e647194200177263a3","__v":0},{"isRight":false,"_id":"5da5f7e647194200177263a8","title":"1000000","question":"5da5f7e647194200177263a3","__v":0}],"_id":"5da5f7e647194200177263a3","title":"9+9","__v":0},{"answers":[{"isRight":true,"_id":"5da5f8d147194200177263b9","title":"boca","question":"5da5f8d147194200177263b7","__v":0},{"isRight":false,"_id":"5da5f8d147194200177263ba","title":"riber","question":"5da5f8d147194200177263b7","__v":0},{"isRight":false,"_id":"5da5f8d147194200177263bb","title":"la de castro","question":"5da5f8d147194200177263b7","__v":0},{"isRight":false,"_id":"5da5f8d147194200177263bc","title":"maradona","question":"5da5f8d147194200177263b7","__v":0}],"_id":"5da5f8d147194200177263b7","title":"quien es mas grande?","__v":0},{"answers":[{"isRight":false,"_id":"5da5f99b47194200177263c3","title":"Si","question":"5da5f99b47194200177263c1","__v":0},{"isRight":false,"_id":"5da5f99b47194200177263c4","title":"talvez","question":"5da5f99b47194200177263c1","__v":0}],"_id":"5da5f99b47194200177263c1","title":"boquita el mas grande?","__v":0},{"answers":[{"isRight":false,"_id":"5dae54557d32ed0017188f62","title":"damwon","question":"5dae54557d32ed0017188f60","__v":0},{"isRight":false,"_id":"5dae54557d32ed0017188f63","title":"skt","question":"5dae54557d32ed0017188f60","__v":0},{"isRight":false,"_id":"5dae54557d32ed0017188f64","title":"phoenix","question":"5dae54557d32ed0017188f60","__v":0},{"isRight":false,"_id":"5dae54557d32ed0017188f65","title":"fnatic","question":"5dae54557d32ed0017188f60","__v":0}],"_id":"5dae54557d32ed0017188f60","title":"quien va a ganar el worlds 2019","__v":0},{"answers":[{"isRight":false,"_id":"5dae57ec7d32ed0017188f76","title":"nO","question":"5dae57ec7d32ed0017188f74","__v":0},{"isRight":false,"_id":"5dae57ec7d32ed0017188f77","title":"CApaz xd ","question":"5dae57ec7d32ed0017188f74","__v":0},{"isRight":true,"_id":"5dae57ec7d32ed0017188f78","title":"se","question":"5dae57ec7d32ed0017188f74","__v":0},{"isRight":false,"_id":"5dae57ec7d32ed0017188f79","title":"No bien escrito","question":"5dae57ec7d32ed0017188f74","__v":0}],"_id":"5dae57ec7d32ed0017188f74","title":"Franco es gay?","__v":0},{"answers":[{"isRight":false,"_id":"5dae58b57d32ed0017188f8a","title":"Si","question":"5dae58b57d32ed0017188f88","__v":0},{"isRight":false,"_id":"5dae58b57d32ed0017188f8b","title":"Si","question":"5dae58b57d32ed0017188f88","__v":0},{"isRight":false,"_id":"5dae58b57d32ed0017188f8c","title":"Si","question":"5dae58b57d32ed0017188f88","__v":0},{"isRight":false,"_id":"5dae58b57d32ed0017188f8d","title":"Si","question":"5dae58b57d32ed0017188f88","__v":0}],"_id":"5dae58b57d32ed0017188f88","title":"Mamani gay","__v":0},{"answers":[{"isRight":false,"_id":"5dae597b7d32ed0017188f94","title":"Uva","question":"5dae597b7d32ed0017188f92","__v":0},{"isRight":false,"_id":"5dae597b7d32ed0017188f95","title":"Naranaja","question":"5dae597b7d32ed0017188f92","__v":0},{"isRight":true,"_id":"5dae597b7d32ed0017188f96","title":"Coca","question":"5dae597b7d32ed0017188f92","__v":0},{"isRight":false,"_id":"5dae597b7d32ed0017188f97","title":"Manzana","question":"5dae597b7d32ed0017188f92","__v":0}],"_id":"5dae597b7d32ed0017188f92","title":"¡Cual manaos es mejor?","__v":0},{"answers":[{"isRight":false,"_id":"5dae5b5c7d32ed0017188f9e","title":"1","question":"5dae5b5c7d32ed0017188f9c","__v":0},{"isRight":true,"_id":"5dae5b5c7d32ed0017188f9f","title":"20","question":"5dae5b5c7d32ed0017188f9c","__v":0},{"isRight":false,"_id":"5dae5b5c7d32ed0017188fa0","title":"3","question":"5dae5b5c7d32ed0017188f9c","__v":0},{"isRight":false,"_id":"5dae5b5c7d32ed0017188fa1","title":"111","question":"5dae5b5c7d32ed0017188f9c","__v":0}],"_id":"5dae5b5c7d32ed0017188f9c","title":"10+10","__v":0},{"answers":[{"isRight":true,"_id":"5db71d89f979200017376d5a","title":"q tAK","question":"5db71d89f979200017376d58","__v":0},{"isRight":false,"_id":"5db71d89f979200017376d5b","title":"FFGGRRG","question":"5db71d89f979200017376d58","__v":0},{"isRight":false,"_id":"5db71d89f979200017376d5c","title":"HJJKTG","question":"5db71d89f979200017376d58","__v":0},{"isRight":false,"_id":"5db71d89f979200017376d5d","title":"NBGGG","question":"5db71d89f979200017376d58","__v":0}],"_id":"5db71d89f979200017376d58","title":"hola","__v":0},{"answers":[{"isRight":true,"_id":"5db71dbbf979200017376d64","title":"q tAK","question":"5db71dbbf979200017376d62","__v":0},{"isRight":false,"_id":"5db71dbbf979200017376d65","title":"FFGGRRG","question":"5db71dbbf979200017376d62","__v":0},{"isRight":false,"_id":"5db71dbbf979200017376d66","title":"HJJKTG","question":"5db71dbbf979200017376d62","__v":0},{"isRight":false,"_id":"5db71dbbf979200017376d67","title":"NBGGG","question":"5db71dbbf979200017376d62","__v":0}],"_id":"5db71dbbf979200017376d62","title":"hola","__v":0},{"answers":[{"isRight":false,"_id":"5db72530f979200017376d6e","title":"Alberto","question":"5db72530f979200017376d6c","__v":0},{"isRight":false,"_id":"5db72530f979200017376d6f","title":"Alberto","question":"5db72530f979200017376d6c","__v":0},{"isRight":false,"_id":"5db72530f979200017376d70","title":"Alberto ","question":"5db72530f979200017376d6c","__v":0},{"isRight":false,"_id":"5db72530f979200017376d71","title":"Alberto","question":"5db72530f979200017376d6c","__v":0}],"_id":"5db72530f979200017376d6c","title":"Quien gana las elecciones?","__v":0},{"answers":[{"isRight":false,"_id":"5db725dbf979200017376d78","title":"1","question":"5db725dbf979200017376d76","__v":0},{"isRight":false,"_id":"5db725dbf979200017376d79","title":"1/0","question":"5db725dbf979200017376d76","__v":0},{"isRight":false,"_id":"5db725dbf979200017376d7a","title":"2","question":"5db725dbf979200017376d76","__v":0},{"isRight":true,"_id":"5db725dbf979200017376d7b","title":"0","question":"5db725dbf979200017376d76","__v":0}],"_id":"5db725dbf979200017376d76","title":"Cual es el resultado de un determinante de todos 1s (unos)?","__v":0},{"answers":[{"isRight":false,"_id":"5dc07fb1f75c7000170673b9","title":"Un Jugador de futbol","question":"5dc07fb1f75c7000170673b7","__v":0},{"isRight":true,"_id":"5dc07fb1f75c7000170673ba","title":"Un jugador de videojuegos","question":"5dc07fb1f75c7000170673b7","__v":0},{"isRight":false,"_id":"5dc07fb1f75c7000170673bb","title":"Un Programador ","question":"5dc07fb1f75c7000170673b7","__v":0},{"isRight":false,"_id":"5dc07fb1f75c7000170673bc","title":"Un rapero","question":"5dc07fb1f75c7000170673b7","__v":0}],"_id":"5dc07fb1f75c7000170673b7","title":"¿Quién es Faker?","__v":0},{"answers":[],"_id":"5dc454d329835a00174c36e8","title":"hola petes","__v":0},{"answers":[{"isRight":false,"_id":"5dc6f9ab6ec7ab001738343e","title":"sdfg","question":"5dc6f9ab6ec7ab001738343c","__v":0},{"isRight":false,"_id":"5dc6f9ab6ec7ab001738343f","title":"sdfg","question":"5dc6f9ab6ec7ab001738343c","__v":0},{"isRight":false,"_id":"5dc6f9ab6ec7ab0017383440","title":"sfd","question":"5dc6f9ab6ec7ab001738343c","__v":0},{"isRight":true,"_id":"5dc6f9ab6ec7ab0017383441","title":"fddd","question":"5dc6f9ab6ec7ab001738343c","__v":0}],"_id":"5dc6f9ab6ec7ab001738343c","title":"dffasd","__v":0},{"answers":[{"isRight":false,"_id":"5dc9922f2d739000171447de","title":"BUENARDOO","question":"5dc9922f2d739000171447dc","__v":0},{"isRight":true,"_id":"5dc9922f2d739000171447df","title":"RESPETO","question":"5dc9922f2d739000171447dc","__v":0},{"isRight":false,"_id":"5dc9922f2d739000171447e0","title":"BUE-NAR-DO","question":"5dc9922f2d739000171447dc","__v":0},{"isRight":false,"_id":"5dc9922f2d739000171447e1","title":"RES-PETO","question":"5dc9922f2d739000171447dc","__v":0}],"_id":"5dc9922f2d739000171447dc","title":"buenardo?","__v":0}]; 
    res.render('index', { questions: questions });
  });
});

// para testear nomas
app.get('/api/questions', (req, res) => {
  Question.find().populate('answers').exec((err, questions) => {
    res.json(questions);
  });
});

// listen
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
