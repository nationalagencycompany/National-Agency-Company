document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("login");
  const errorMsg = document.getElementById("error-msg");
  const accountInfo = document.getElementById("account-info");

  loginBtn.addEventListener("click", () => {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    errorMsg.textContent = "";
    accountInfo.innerHTML = "";

    fetch("nbadatabase.json")
      .then(res => res.json())
      .then(data => {
        const user = data.users.find(u => u.username === username && u.password === password);

        if (user) {
          accountInfo.innerHTML = `
            <p>Account Holder: ${user.account.accountHolder}</p>
            <p>Account Number: ${user.account.accountNumber}</p>
            <p>Balance: £${user.account.balance}</p>
            <p>Account Type: ${user.account.accountType}</p>
          `;
        } else {
          errorMsg.textContent = "Invalid username or password";
        }
      })
      .catch(err => {
        errorMsg.textContent = "Error loading data: " + err;
        console.error(err);
      });
  });
});
