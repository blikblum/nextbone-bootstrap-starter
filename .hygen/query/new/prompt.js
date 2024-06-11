module.exports = {
  prompt: ({ prompter, args }) => {
    if (typeof args.collection === 'string') {
      return Promise.resolve({ allow: true })
    }
    return prompter.prompt([
      {
        type: 'input',
        name: 'collection',
        message: 'Firestore collection name:',
      },
    ])
  },
}
