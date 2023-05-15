function getAuth() {
  if (localStorage.getItem("accessToken") === null) {
    return false;
  }
  return true;
}

export default getAuth;
