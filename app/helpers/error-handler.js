module.exports = (err) => {
  const errorKeys = Object.keys(err.errors);

  const errors = errorKeys.map((key) => {
    return err.errors[key].message;
  });

  return errors;
}
