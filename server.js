const express = require('express');
const session = require('express-session');
const fs = require('fs');
const path = require('path');

const app = express();


app.set('view engine', 'ejs');
app.use(express.static('public')); 


app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));


app.use(express.urlencoded({ extended: true }));


const loginFilePath = path.join(__dirname, 'logins.txt');
const petInfoFilePath = path.join(__dirname, 'pets.txt');


app.get('/', (req, res) => {
  res.render('home');
});

app.get('/findDogCat', (req, res) => {
  res.render('findDogCat');
});

app.get('/dogCare', (req, res) => {
  res.render('dogCare');
});

app.get('/catCare', (req, res) => {
  res.render('catCare');
});

app.get('/createAccount', (req, res) => {
  res.render('createAccount');
});

app.post('/createAccount', (req, res) => {
  const { username, password } = req.body;
  const usernameRegex = /^[a-zA-Z0-9]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/;

  if (!usernameRegex.test(username) || !passwordRegex.test(password)) {
    return res.render('createAccount', { message: 'Invalid username or password format.' });
  }

  fs.readFile(loginFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.render('createAccount', { message: 'Error reading login file.' });
    }

    const logins = data.split('\n').filter(line => line.trim() !== '');
    const usernames = logins.map(login => login.split(':')[0]);

    if (usernames.includes(username)) {
      return res.render('createAccount', { message: 'Username already exists.' });
    }

    const newLogin = `${username}:${password}`;
    fs.appendFile(loginFilePath, `${newLogin}\n`, (err) => {
      if (err) {
        return res.render('createAccount', { message: 'Error writing to login file.' });
      }
      res.render('createAccount', { message: 'Account created successfully. You can now log in.' });
    });
  });
});

app.get('/petGiveAway', (req, res) => {
  if (req.session.loggedIn) {
    res.render('petGiveAwayForm'); 
  } else {
    res.render('petGiveAway');
  }
});

app.post('/petGiveAway', (req, res) => {
  const { username, password } = req.body;

  fs.readFile(loginFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.render('petGiveAway', { message: 'Error reading login file.' });
    }

    const logins = data.split('\n').filter(line => line.trim() !== '');
    const loginPair = `${username}:${password}`;

    if (logins.includes(loginPair)) {
      req.session.loggedIn = true;
      req.session.username = username;
      res.render('petGiveAwayForm'); 
    } else {
      res.render('petGiveAway', { message: 'Invalid username or password.' });
    }
  });
});

app.post('/submitPetDetails', (req, res) => {
  if (!req.session.loggedIn) {
    return res.render('petGiveAway', { message: 'You must be logged in to submit pet details.' });
  }

  const {
    animalType, breedDogCat, age, typeGender,
    alongDog, alongCat, alongChildren, aspirations,
    name1, name2, emailOwner
  } = req.body;
  const username = req.session.username;

  fs.readFile(petInfoFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.render('petGiveAwayForm', { message: 'Error reading pet info file.' });
    }

    const pets = data.split('\n').filter(line => line.trim() !== '');
    const newPetId = pets.length + 1;
    const newPetInfo = `${newPetId}:${username}:${animalType}:${breedDogCat}:${age}:${typeGender}:${alongDog}:${alongCat}:${alongChildren}:${aspirations}:${name1}:${name2}:${emailOwner}`;

    fs.appendFile(petInfoFilePath, `${newPetInfo}\n`, (err) => {
      if (err) {
        return res.render('petGiveAwayForm', { message: 'Error writing to pet info file.' });
      }
      res.render('petGiveAwayForm', { message: 'Pet details submitted successfully.' });
    });
  });
});

app.post('/availablePets', (req, res) => {
  const { animal, dogCatBreed, age2, genderType, getAlongDog, getAlongCat, getAlongChildren } = req.body;

  console.log('Form Data:', req.body); 

  fs.readFile(petInfoFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading pet info file:', err);
      return res.render('findDogCat', { message: 'Error reading pet info file.' });
    }

    const pets = data.split('\n').filter(line => line.trim() !== '').map(line => {
      const [id, username, type, breedDogCat, age, typeGender, alongDog, alongCat, alongChildren, aspirations, name1, name2, emailOwner] = line.split(':');
      return { id, username, animalType: type, breedDogCat, age, typeGender, alongDog, alongCat, alongChildren, aspirations, name1, name2, emailOwner };
    });

    console.log('Pets Data:', pets); 

    const breedCriteria = Array.isArray(dogCatBreed) ? dogCatBreed.includes("dosen't matter") : dogCatBreed === "dosen't matter" || dogCatBreed === '';

    const matchedPets = pets.filter(pet => 
      pet.animalType === animal && 
      (breedCriteria || pet.breedDogCat === dogCatBreed) &&
      (age2 === 'Doesn\'t matter' || pet.age === age2) &&
      (genderType === 'any' || genderType === '' || pet.typeGender === genderType) &&
      (!getAlongDog || pet.alongDog === getAlongDog) &&
      (!getAlongCat || pet.alongCat === getAlongCat) &&
      (!getAlongChildren || pet.alongChildren === getAlongChildren)
    );

    console.log('Matched Pets:', matchedPets); 

    if (matchedPets.length > 0) {
      res.render('availablePets', { pets: matchedPets });
    } else {
      res.render('availablePets', { pets: [], message: 'No pets found matching your criteria.' });
    }
  });
});




app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect('/');
    }
    res.render('LogOut', { message: 'You have been logged out successfully.' });
  });
});



app.get('/contactUs', (req, res) => {
  res.render('contactUs');
});

app.get('/privacyDisclaimer', (req, res) => {
  res.render('privacyDisclaimer');
});

app.get('/imageReferences', (req, res) => {
  res.render('imageReferences');
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
