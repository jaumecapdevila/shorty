class AlreadyExistentGroupException {
  constructor(error) {
    this.error = error;
  }

  getMessage() {
    return this.error;
  }
}

export default AlreadyExistentGroupException;