const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log(
    'Please provide the password as an argument node mongo.js <password>'
  )
  process.exit(1)
}

if (process.argv.length >= 3) {
  const password = process.argv[2]
  const _name = process.argv[3]
  const _number = process.argv[4]

  const url = `mongodb+srv://dbMaster:${password}@cluster0.nori7.mongodb.net/phonebook-app?retryWrites=true&w=majority`

  mongoose.connect(url)

  const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  })

  const Person = mongoose.model('Person', personSchema)

  if (process.argv.length > 3) {
    const person = new Person({
      name: _name,
      number: _number,
    })

    person.save().then((result) => {
      console.log(`added ${result.name} number ${result.number} to phonebook`)
      mongoose.connection.close()
    })
  } else if (process.argv.length === 3) {
    Person.find({}).then((result) => {
      console.log('phonebook:')
      result.forEach((person) => {
        console.log(`${person.name} ${person.number}`)
      })
      mongoose.connection.close()
    })
  } else {
    console.log('Name and phonenumber are required fields')
    process.exit(1)
  }
}
