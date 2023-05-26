function getLocalStorage() {
  const accessToken = localStorage.getItem("accessToken");
  const userName = localStorage.getItem("userName");
  return { accessToken, userName };
}

export default getLocalStorage;
