// https://stackoverflow.com/questions/9768444/possible-eventemitter-memory-leak-detected

if (!process.env.LISTENING_TO_UNHANDLED_REJECTION) {
  process.on('unhandledRejection', error => {
    // eslint-disable-next-line no-console
    console.error('[DEBOX] unhandled Promise Rejection:', error.stack || error)
  })
  process.env.LISTENING_TO_UNHANDLED_REJECTION = true
}
